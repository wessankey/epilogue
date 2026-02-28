import { BookOpen } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t-3 border-foreground bg-muted">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-foreground" />
          <span className="font-serif text-foreground">Epilogue</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Powered by AI. Built for readers.
        </p>
      </div>
    </footer>
  );
}
