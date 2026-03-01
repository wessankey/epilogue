"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { suggestions } from "@/lib/books-data";
import {
  SettingsModal,
  defaultSettings,
  type SearchSettings,
} from "@/components/settings-modal";

function isCustomized(settings: SearchSettings) {
  return (
    settings.bookAge !== defaultSettings.bookAge ||
    settings.genre !== defaultSettings.genre ||
    settings.similarity !== defaultSettings.similarity
  );
}

export function BookSearch() {
  const [query, setQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<SearchSettings>(defaultSettings);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams({
        book: query.trim(),
        age: settings.bookAge,
        genre: settings.genre,
        similarity: String(settings.similarity),
      });
      router.push(`/recommendations?${params.toString()}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
  };

  const customized = isCustomized(settings);

  return (
    <section className="flex flex-col items-center gap-8 px-6 py-16 md:py-24">
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="font-serif text-5xl leading-tight text-foreground md:text-6xl lg:text-7xl text-balance">
          What should you read next?
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
          Enter a book you love and we will find your next favorite read.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="e.g. The Great Gatsby"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 w-full rounded-xl border-3 border-foreground bg-card pl-12 pr-4 text-lg font-medium text-card-foreground shadow-[4px_4px_0_0_var(--foreground)] outline-none transition-all placeholder:text-muted-foreground focus:shadow-[6px_6px_0_0_var(--foreground)] focus:-translate-x-0.5 focus:-translate-y-0.5"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              title="Search settings"
              className={`relative flex h-14 w-14 items-center justify-center rounded-xl border-3 border-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--foreground)] cursor-pointer ${
                customized
                  ? "bg-foreground text-background"
                  : "bg-card text-foreground"
              }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
              {customized && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-secondary border-2 border-foreground" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-xl border-3 border-foreground bg-secondary px-6 text-lg font-bold text-secondary-foreground shadow-[4px_4px_0_0_var(--foreground)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--foreground)] active:translate-y-0 active:shadow-[2px_2px_0_0_var(--foreground)] cursor-pointer"
          >
            Recommend
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-2 items-center">
        <span className="text-sm text-muted-foreground font-bold">Try:</span>
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            className="rounded-full border-2 border-foreground bg-background px-3 py-1 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary hover:shadow-[2px_2px_0_0_var(--foreground)]"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <SettingsModal
        open={settingsOpen}
        settings={settings}
        onChange={setSettings}
        onClose={() => setSettingsOpen(false)}
      />
    </section>
  );
}
