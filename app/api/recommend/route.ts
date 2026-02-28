import { generateText, Output } from "ai";
import { z } from "zod";

export const maxDuration = 30;

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

export async function POST(req: Request) {
  const { book } = await req.json();

  const result = await generateText({
    model: "openai/gpt-5-mini",
    prompt: `You are an expert book recommender. The user loved reading "${book}". 
Suggest 6 books they would likely enjoy next. 
Choose a diverse set of recommendations that share thematic, stylistic, or tonal qualities with the input book.
Focus on well-regarded books across different eras and subgenres.`,
    output: Output.object({
      schema: recommendationSchema,
    }),
  });

  console.log("LOG:result:", result);

  return Response.json(result.output.recommendations);
}
