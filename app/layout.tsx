import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LN247 What's On",
  description:
    "A live \"what's on now\" schedule and player concept for LN247 Television.",
};

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@ln247_news" },
  { label: "Facebook", href: "https://www.facebook.com/ln247.news" },
  { label: "X", href: "https://www.x.com/ln24_7" },
  { label: "Instagram", href: "https://www.instagram.com/ln24_7" },
  { label: "TikTok", href: "https://www.tiktok.com/@ln247news" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <header className="bg-brand-navy-dark">
          <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-3.5 sm:px-6">
            <a href="https://ln247.news/" target="_blank" rel="noopener noreferrer" className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white">
                LN<span className="text-brand-red">247</span>
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-widest text-white/50 sm:inline">
                What&apos;s On
              </span>
            </a>
            <span className="text-[11px] italic text-white/50 sm:text-xs">
              Where The Story Goes, We Go
            </span>
          </div>
        </header>

        {children}

        <footer className="mt-auto border-t border-black/5 bg-card">
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 py-6 sm:px-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-brand-muted hover:text-brand-navy"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-[11px] leading-relaxed text-brand-muted">
              Unofficial portfolio demo built against LN247&apos;s public
              site. Schedule times and stream are placeholders — see the
              project README for details. Not affiliated with or endorsed by
              LN247 Television.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
