import { featuredBooks } from "@/lib/books-data";
import { BookCard } from "@/components/book-card";

export function FeaturedBooks() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="font-serif text-3xl text-foreground">Featured Titles</h2>
        <div className="h-0.5 flex-1 bg-foreground" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredBooks.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </section>
  );
}
