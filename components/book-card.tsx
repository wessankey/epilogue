import type { Book } from "@/lib/books-data";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="group flex flex-col gap-3 rounded-xl border-3 border-foreground bg-card p-5 shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-serif text-xl leading-snug text-card-foreground">
            {book.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {book.author} &middot; {book.year}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {book.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border-2 border-foreground bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {book.description}
      </p>
    </div>
  );
}
