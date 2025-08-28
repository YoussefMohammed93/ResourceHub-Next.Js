import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { downloadUrl, taskId } = await request.json();

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required to download file' },
        { status: 400 }
      );
    }

    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Extract the token
    const token = authHeader.substring(7);

    // Get backend URL
    const backendUrl = process.env.NEXT_PUBLIC_PRODUCTION_API_URL || 
                      process.env.NEXT_PUBLIC_API_URL || 
                      'https://stockaty.virs.tech';

    // Get task status and download URL from backend
    const taskResponse = await fetch(`${backendUrl}/v1/download/tasks?task_id=${encodeURIComponent(taskId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Access-Token': token,
      },
    });

    if (!taskResponse.ok) {
      const errorData = await taskResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to get download task' },
        { status: taskResponse.status }
      );
    }

    const taskData = await taskResponse.json();

    if (!taskData.success || !taskData.data || taskData.data.length === 0) {
      return NextResponse.json(
        { error: 'Download task not found' },
        { status: 404 }
      );
    }

    const task = taskData.data[0];

    // Check if task is completed and has download URL
    if (task.progress?.status !== 'completed' || !task.download?.downloadUrl) {
      return NextResponse.json(
        { error: 'Download not ready yet. Please wait for the task to complete.' },
        { status: 202 } // Accepted but not ready
      );
    }

    // Fetch the actual file from the download URL
    const fileResponse = await fetch(task.download.downloadUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'ResourceHub-Downloader/1.0',
      },
    });

    if (!fileResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch file from download URL' },
        { status: 500 }
      );
    }

    // Get file info
    const contentType = fileResponse.headers.get('content-type') || 'application/octet-stream';
    const contentLength = fileResponse.headers.get('content-length');
    const contentDisposition = fileResponse.headers.get('content-disposition');

    // Use filename from task or extract from various sources
    let filename = task.download?.filename || 'download';
    
    if (!filename || filename === 'download') {
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      } else if (downloadUrl) {
        // Try to extract from original URL
        try {
          const urlPath = new URL(downloadUrl).pathname;
          const urlFilename = urlPath.split('/').pop();
          if (urlFilename && urlFilename.includes('.')) {
            filename = decodeURIComponent(urlFilename);
          }
        } catch {
          // Use default filename
        }
      }
    }

    // Create response with proper headers for download
    const response = new NextResponse(fileResponse.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        ...(contentLength && { 'Content-Length': contentLength }),
        'Cache-Control': 'no-cache',
      },
    });

    return response;
  } catch (error) {
    console.error('Download API error:', error);
    return NextResponse.json(
      { error: 'Internal server error during download' },
      { status: 500 }
    );
  }
}
