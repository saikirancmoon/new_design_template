import { promises as fs } from "fs";
import path from "path";
import type { KnowledgeChunk } from "./types";

const KNOWLEDGE_DIR = path.join(process.cwd(), "knowledge");
const CHUNK_SIZE = 850;
const CHUNK_OVERLAP = 120;
const MAX_CHUNKS = 5;

const STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "can",
  "for",
  "from",
  "have",
  "how",
  "into",
  "more",
  "school",
  "sri",
  "chaitanya",
  "that",
  "the",
  "this",
  "what",
  "when",
  "where",
  "which",
  "with",
]);

let cachedChunks: KnowledgeChunk[] | null = null;

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function chunkText(source: string, content: string) {
  const normalized = content.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  const chunks: KnowledgeChunk[] = [];

  for (let start = 0; start < normalized.length; start += CHUNK_SIZE - CHUNK_OVERLAP) {
    const chunk = normalized.slice(start, start + CHUNK_SIZE).trim();
    if (!chunk) continue;
    chunks.push({
      id: `${source}-${chunks.length + 1}`,
      source,
      content: chunk,
      score: 0,
    });
  }

  return chunks;
}

export async function loadKnowledgeChunks() {
  if (cachedChunks) return cachedChunks;

  const entries = await fs.readdir(KNOWLEDGE_DIR, { withFileTypes: true });
  const textFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".txt"));

  const chunks = await Promise.all(
    textFiles.map(async (entry) => {
      const filePath = path.join(KNOWLEDGE_DIR, entry.name);
      const content = await fs.readFile(filePath, "utf8");
      return chunkText(entry.name, content);
    }),
  );

  cachedChunks = chunks.flat();
  return cachedChunks;
}

export async function retrieveKnowledge(query: string) {
  const queryTokens = tokenize(query);
  if (!queryTokens.length) return [];

  const chunks = await loadKnowledgeChunks();
  const scored = chunks
    .map((chunk) => {
      const contentTokens = tokenize(chunk.content);
      const contentTokenSet = new Set(contentTokens);
      const exactSourceBoost = query.toLowerCase().includes(chunk.source.replace(".txt", "").replace("-", " ")) ? 4 : 0;
      const overlapScore = queryTokens.reduce((score, token) => score + (contentTokenSet.has(token) ? 2 : 0), 0);
      const partialScore = queryTokens.reduce(
        (score, token) => score + (chunk.content.toLowerCase().includes(token) ? 0.5 : 0),
        0,
      );

      return {
        ...chunk,
        score: overlapScore + partialScore + exactSourceBoost,
      };
    })
    .filter((chunk) => chunk.score >= 1.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CHUNKS);

  return scored;
}

export function formatKnowledgeContext(chunks: KnowledgeChunk[]) {
  return chunks
    .map((chunk, index) => `[${index + 1}] Source: ${chunk.source}\n${chunk.content}`)
    .join("\n\n");
}

