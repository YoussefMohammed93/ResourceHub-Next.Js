import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="p-10">
      <Button size="lg" variant="default">
        <Link href="/dashboard" className="text-base">
          Dashboard
        </Link>
      </Button>
    </main>
  );
}
