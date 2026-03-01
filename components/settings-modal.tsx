"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export interface SearchSettings {
  bookAge: "new" | "classic" | "any";
  genre: "fiction" | "nonfiction" | "any";
  similarity: number; // 1–5
}

export const defaultSettings: SearchSettings = {
  bookAge: "any",
  genre: "any",
  similarity: 3,
};

const similarityLabels: Record<number, string> = {
  1: "Explore widely",
  2: "Loosely similar",
  3: "Moderately similar",
  4: "Closely similar",
  5: "Nearly identical",
};

interface ToggleGroupProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: ToggleGroupProps<T>) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`flex-1 rounded-lg border-2 border-foreground px-3 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
            value === opt.value
              ? "bg-foreground text-background shadow-none translate-y-0"
              : "bg-background text-foreground shadow-[2px_2px_0_0_var(--foreground)] hover:shadow-[3px_3px_0_0_var(--foreground)]"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

interface SettingsModalProps {
  open: boolean;
  settings: SearchSettings;
  onChange: (settings: SearchSettings) => void;
  onClose: () => void;
}

export function SettingsModal({
  open,
  settings,
  onChange,
  onClose,
}: SettingsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  // Close on backdrop click
  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      onClose={onClose}
      className="m-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border-3 border-foreground bg-background p-0 shadow-[8px_8px_0_0_var(--foreground)] backdrop:bg-foreground/20 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">
            Search Settings
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-foreground bg-background text-foreground shadow-[2px_2px_0_0_var(--foreground)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--foreground)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Book Age */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Publication Era
          </label>
          <p className="text-xs text-muted-foreground">
            Limit recommendations to newer or older books.
          </p>
          <ToggleGroup
            options={[
              { value: "new", label: "Recent (≤30 yrs)" },
              { value: "any", label: "Any era" },
              { value: "classic", label: "Classic (30+ yrs)" },
            ]}
            value={settings.bookAge}
            onChange={(v) => onChange({ ...settings, bookAge: v })}
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Genre
          </label>
          <p className="text-xs text-muted-foreground">
            Filter recommendations by fiction or nonfiction.
          </p>
          <ToggleGroup
            options={[
              { value: "fiction", label: "Fiction" },
              { value: "any", label: "Any" },
              { value: "nonfiction", label: "Nonfiction" },
            ]}
            value={settings.genre}
            onChange={(v) => onChange({ ...settings, genre: v })}
          />
        </div>

        {/* Similarity */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Similarity
          </label>
          <p className="text-xs text-muted-foreground">
            How closely should recommendations match your book?
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={settings.similarity}
              onChange={(e) =>
                onChange({ ...settings, similarity: Number(e.target.value) })
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-foreground"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Explore widely
              </span>
              <span className="rounded-full border-2 border-foreground bg-secondary px-3 py-0.5 text-xs font-bold text-secondary-foreground">
                {similarityLabels[settings.similarity]}
              </span>
              <span className="text-xs text-muted-foreground">
                Nearly identical
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t-2 border-foreground/10 pt-2">
          <button
            type="button"
            onClick={() => onChange(defaultSettings)}
            className="flex-1 rounded-xl border-2 border-foreground bg-background px-4 py-2.5 text-sm font-bold text-foreground shadow-[2px_2px_0_0_var(--foreground)] transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_var(--foreground)]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-foreground bg-foreground px-4 py-2.5 text-sm font-bold text-background transition-all hover:-translate-y-0.5"
          >
            Apply
          </button>
        </div>
      </div>
    </dialog>
  );
}
