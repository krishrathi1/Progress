import { NextRequest, NextResponse } from "next/server";

const CODOLIO_SHEET_API =
  "https://node.codolio.com/api/question-tracker/v2/sheet/get-sheet-data-by-slug/strivers-a2z-dsa-sheet";

type Mapping = {
  title?: string;
  topic?: string;
  questionId?: {
    name?: string;
    problemUrl?: string;
  };
};

function normalize(value = "") {
  return value
    .toLowerCase()
    .replace(/linkedlist/g, "linked list")
    .replace(/binary tree/g, "tree")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|a|an|problem|algorithm|using|find|of|in|to|and|or|introduction)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stepNumber(value = "") {
  return value.match(/step\s*(\d+)/i)?.[1] ?? "";
}

function similarity(left: string, right: string) {
  const a = normalize(left);
  const b = normalize(right);
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.92;

  const aTokens = new Set(a.split(" "));
  const bTokens = new Set(b.split(" "));
  const common = [...aTokens].filter((token) => bTokens.has(token)).length;
  const tokenScore = (2 * common) / (aTokens.size + bTokens.size);

  const bigrams = (text: string) => {
    const result = new Set<string>();
    for (let index = 0; index < text.length - 1; index++) result.add(text.slice(index, index + 2));
    return result;
  };
  const aPairs = bigrams(a);
  const bPairs = bigrams(b);
  const pairCommon = [...aPairs].filter((pair) => bPairs.has(pair)).length;
  const pairScore = aPairs.size + bPairs.size ? (2 * pairCommon) / (aPairs.size + bPairs.size) : 0;
  return tokenScore * 0.7 + pairScore * 0.3;
}

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title")?.trim();
  const section = request.nextUrl.searchParams.get("section")?.trim() ?? "";
  if (!title) return NextResponse.json({ error: "Question title is required." }, { status: 400 });

  try {
    const response = await fetch(CODOLIO_SHEET_API, { next: { revalidate: 86_400 } });
    if (!response.ok) throw new Error(`Codolio returned ${response.status}`);
    const payload = await response.json();
    const mappings: Mapping[] = payload?.data?.mappings ?? [];
    const step = stepNumber(section);
    const candidates = mappings.filter(
      (mapping) =>
        mapping.questionId?.problemUrl &&
        (!step || stepNumber(mapping.topic) === step),
    );

    const ranked = candidates
      .map((mapping) => ({
        mapping,
        score: Math.max(
          similarity(title, mapping.title ?? ""),
          similarity(title, mapping.questionId?.name ?? ""),
        ),
      }))
      .sort((a, b) => b.score - a.score);
    const match = ranked[0];
    const url = match?.mapping.questionId?.problemUrl;

    if (!url || match.score < 0.34 || !/^https?:\/\//i.test(url)) {
      return NextResponse.redirect(
        new URL("https://codolio.com/question-tracker/sheet/strivers-a2z-dsa-sheet"),
      );
    }

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("DSA resource lookup failed:", error);
    return NextResponse.redirect(
      new URL("https://codolio.com/question-tracker/sheet/strivers-a2z-dsa-sheet"),
    );
  }
}
