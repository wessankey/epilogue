import Link from "next/link";
import { BookOpen } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b-3 border-foreground bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground bg-secondary">
            <BookOpen className="h-5 w-5 text-foreground" />
          </div>
          <span className="font-serif text-2xl text-foreground">Epilogue</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="rounded-full border-2 border-foreground bg-background px-4 py-1.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--foreground)]"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
