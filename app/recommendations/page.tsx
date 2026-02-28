"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, BookOpen, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface Recommendation {
  title: string;
  author: string;
  year: number;
  tags: string[];
  description: string;
  reason: string;
}

function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="group flex flex-col gap-3 rounded-xl border-3 border-foreground bg-card p-5 shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]">
      <div>
        <h3 className="font-serif text-xl leading-snug text-card-foreground">
          {rec.title}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {rec.author} &middot; {rec.year}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {rec.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border-2 border-foreground bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {rec.description}
      </p>

      <div className="mt-auto flex items-start gap-2 rounded-lg border-2 border-foreground/20 bg-muted p-3">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          {rec.reason}
        </p>
      </div>
    </div>
  );
}

function RecommendationsContent() {
  const searchParams = useSearchParams();
  const book = searchParams.get("book");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async (bookTitle: string) => {
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ book: bookTitle }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        try {
          const parsed = JSON.parse(accumulated);
          if (parsed?.recommendations) {
            setRecommendations(parsed.recommendations);
          }
        } catch {
          // Partial JSON, keep accumulating
        }
      }

      // Final parse
      try {
        const parsed = JSON.parse(accumulated);
        if (parsed?.recommendations) {
          setRecommendations(parsed.recommendations);
        }
      } catch {
        throw new Error("Failed to parse recommendations");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (book) {
      fetchRecommendations(book);
    }
  }, [book, fetchRecommendations]);

  if (!book) {
    return (
      <div className="flex flex-col items-center gap-6 px-6 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl border-3 border-foreground bg-secondary shadow-[4px_4px_0_0_var(--foreground)]">
          <BookOpen className="h-8 w-8 text-foreground" />
        </div>
        <div>
          <h2 className="font-serif text-3xl text-foreground">
            No book selected
          </h2>
          <p className="mt-2 text-muted-foreground">
            Head back to the homepage and enter a book to get started.
          </p>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border-3 border-foreground bg-secondary px-6 py-3 font-bold text-secondary-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-4">
        <Link
          href="/"
          className="flex w-fit items-center gap-2 rounded-full border-2 border-foreground bg-background px-4 py-1.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--foreground)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Because you liked
          </p>
          <h1 className="font-serif text-4xl text-foreground md:text-5xl text-balance">
            {book}
          </h1>
        </div>
      </div>

      {loading && recommendations.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border-3 border-foreground bg-secondary shadow-[4px_4px_0_0_var(--foreground)]">
            <Loader2 className="h-8 w-8 animate-spin text-foreground" />
          </div>
          <p className="font-serif text-xl text-foreground">
            Finding your next read...
          </p>
          <p className="text-sm text-muted-foreground">
            Our AI is curating personalized recommendations
          </p>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center gap-4 py-24">
          <div className="rounded-xl border-3 border-destructive bg-card p-6 shadow-[4px_4px_0_0_var(--destructive)]">
            <p className="font-bold text-destructive">Something went wrong</p>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          </div>
          <button
            onClick={() => fetchRecommendations(book)}
            className="rounded-xl border-3 border-foreground bg-secondary px-6 py-3 font-bold text-secondary-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)]"
          >
            Try Again
          </button>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec, index) => (
            <RecommendationCard key={`${rec.title}-${index}`} rec={rec} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RecommendationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex flex-col items-center gap-4 py-24">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border-3 border-foreground bg-secondary shadow-[4px_4px_0_0_var(--foreground)]">
                <Loader2 className="h-8 w-8 animate-spin text-foreground" />
              </div>
              <p className="font-serif text-xl text-foreground">Loading...</p>
            </div>
          }
        >
          <RecommendationsContent />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
