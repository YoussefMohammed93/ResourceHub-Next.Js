import {
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25"></div>
      <div className="container mx-auto max-w-7xl px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-primary-foreground rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-background">
                  ResourceHub
                </span>
              </div>
              <p className="text-background/80 leading-relaxed text-sm lg:text-base">
                Your ultimate destination for premium creative resources. Access
                millions of high-quality images, vectors, and videos from top
                platforms worldwide.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-background/80 text-sm">
                  support@resourcehub.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-background/80 text-sm">
                  123 Creative Street, Design City
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-background">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Categories", href: "/categories" },
                { name: "Pricing", href: "/pricing" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/80 hover:text-primary transition-colors text-sm lg:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-background">Resources</h3>
            <ul className="space-y-3">
              {[
                { name: "Stock Photos", href: "/search?q=photos" },
                { name: "Vectors", href: "/search?q=vectors" },
                { name: "Illustrations", href: "/search?q=illustrations" },
                { name: "Videos", href: "/search?q=videos" },
                { name: "Templates", href: "/search?q=templates" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/80 hover:text-primary transition-colors text-sm lg:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-background">
              Support & Legal
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Help Center", href: "/help" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Cookie Policy", href: "/cookies" },
                { name: "Refund Policy", href: "/refund" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/80 hover:text-primary transition-colors text-sm lg:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-background/80 text-sm font-medium">
                Follow us:
              </span>
              <div className="flex items-center space-x-3">
                {[
                  {
                    icon: Facebook,
                    href: "https://facebook.com",
                    label: "Facebook",
                  },
                  {
                    icon: Twitter,
                    href: "https://twitter.com",
                    label: "Twitter",
                  },
                  {
                    icon: Instagram,
                    href: "https://instagram.com",
                    label: "Instagram",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    icon: Github,
                    href: "https://github.com",
                    label: "GitHub",
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-background/10 hover:bg-primary/20 border border-background/20 hover:border-primary/30 rounded-lg flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 text-background/80 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 text-background/60 text-sm">
              <span>©{new Date().getFullYear()} ResourceHub. Made with</span>
              <Heart className="w-4 h-4 text-primary fill-current" />
              <span>by our team.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
