"use server";

import { openai } from "@ai-sdk/openai";
import { generateText, Output } from "ai";
import { z } from "zod";
import mockRecommendations from "../api/recommend/mock.json";

const recommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string().describe("Title of the recommended book."),
      author: z.string().describe("Author of the recommended book."),
      year: z.number().describe("Publication year."),
      tags: z
        .array(z.string())
        .describe("2-4 genre or thematic tags for this book."),
      description: z
        .string()
        .describe(
          "A compelling 1-2 sentence description of why the reader would enjoy this book, based on their input.",
        ),
      reason: z
        .string()
        .describe(
          "A short sentence explaining why this book is similar to the one the user liked.",
        ),
    }),
  ),
});

function buildPrompt(
  book: string,
  age: string,
  genre: string,
  similarity: number,
): string {
  const ageConstraint =
    age === "new"
      ? "Only recommend books published within the last 30 years."
      : age === "classic"
        ? "Only recommend books published more than 30 years ago."
        : "";

  const genreConstraint =
    genre === "fiction"
      ? "Only recommend fiction books."
      : genre === "nonfiction"
        ? "Only recommend nonfiction books."
        : "";

  const similarityGuidance =
    similarity <= 2
      ? "Feel free to explore widely — recommend books that share loose thematic or tonal qualities but may be quite different in style, setting, or genre."
      : similarity === 3
        ? "Recommend books that share notable thematic, stylistic, or tonal qualities with the input book."
        : similarity === 4
          ? "Stick closely to the input book's themes, style, and tone. Recommendations should feel like natural next reads for fans of this specific book."
          : "Recommend books that are very tightly similar to the input book — same genre, similar themes, comparable writing style. Fans should feel the recommendations are nearly identical in spirit.";

  const constraints = [ageConstraint, genreConstraint]
    .filter(Boolean)
    .join(" ");

  return `You are an expert book recommender. The user loved reading "${book}".
Suggest 6 books they would likely enjoy next.
${similarityGuidance}
${constraints}
Focus on well-regarded books. Do not re-suggest the input book itself.`.trim();
}

export async function getRecommendations(
  book: string,
  age: string = "any",
  genre: string = "any",
  similarity: number = 3,
) {
  if (process.env.USE_MOCK_DATA === "true") {
    return mockRecommendations;
  }

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: buildPrompt(book, age, genre, similarity),
    output: Output.object({
      schema: recommendationSchema,
    }),
  });

  return result.output.recommendations;
}
