import { SiteHeader } from "@/components/site-header";
import { BookSearch } from "@/components/book-search";
import { FeaturedBooks } from "@/components/featured-books";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <BookSearch />
        <FeaturedBooks />
      </main>
      <SiteFooter />
    </div>
  );
}
