import { retrieveKnowledge } from "@/lib/chatbot/knowledge";
import { classifyMessage, getCounselorQuickResponse, inferSchoolContextFromHistory, sanitizeUserInput, validateUserInput } from "@/lib/chatbot/security";
import { hasConfiguredGeminiKey, streamGeminiAnswer } from "@/lib/chatbot/gemini";
import type { ChatMessage } from "@/lib/chatbot/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip");
  return forwarded || realIp || "local-demo";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function textResponse(message: string, status = 200) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function normalizeHistory(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .slice(-8)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const role = "role" in item ? item.role : "";
      const content = "content" in item ? item.content : "";
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
      return {
        role,
        content: sanitizeUserInput(content),
      };
    })
    .filter((item): item is ChatMessage => Boolean(item?.content));
}

export async function POST(request: Request) {
  try {
    const clientKey = getClientKey(request);
    if (isRateLimited(clientKey)) {
      return textResponse("Please wait a moment before sending another message.", 429);
    }

    const payload = (await request.json()) as { message?: unknown; history?: unknown };
    const message = sanitizeUserInput(payload.message);
    const validation = validateUserInput(message);
    const category = classifyMessage(message);
    const hasSchoolContext = inferSchoolContextFromHistory(payload.history);

    if (!validation.allowed && !hasSchoolContext) {
      return textResponse(validation.message);
    }

    const quickResponse = getCounselorQuickResponse(message);
    if (quickResponse) {
      return textResponse(quickResponse);
    }

    const chunks = await retrieveKnowledge(message);

    if (!hasConfiguredGeminiKey()) {
      return textResponse(
        "Gemini API key is not configured. Please add GEMINI_API_KEY to .env.local and restart the development server.",
      );
    }

    const history = normalizeHistory(payload.history);
    const stream = await streamGeminiAnswer(message, history, chunks, category);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[chatbot]", error);
    if (error instanceof Error && (error.message.includes("RESOURCE_EXHAUSTED") || error.message.includes("quota"))) {
      return textResponse(
        "Gemini quota is unavailable for the configured API key. Please check Google AI Studio billing/usage limits or use another Gemini API key.",
        502,
      );
    }

    if (error instanceof Error && (error.message.includes("NOT_FOUND") || error.message.includes("not found"))) {
      return textResponse(
        "The configured Gemini model is not available for this API key. Please update GEMINI_MODEL or GEMINI_FALLBACK_MODEL in .env.local.",
        502,
      );
    }

    return textResponse("Sorry, the Sri Chaitanya assistant is unavailable right now. Please try again.", 500);
  }
}
