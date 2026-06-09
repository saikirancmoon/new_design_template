import type { ChatCategory } from "./types";

const MAX_INPUT_LENGTH = 1200;

const SCHOOL_TERMS = [
  "sri chaitanya",
  "chaitanya",
  "admission",
  "admissions",
  "course",
  "courses",
  "academic",
  "academics",
  "curriculum",
  "campus",
  "campuses",
  "branch",
  "branches",
  "fee",
  "fees",
  "scholarship",
  "scholarships",
  "facility",
  "facilities",
  "hostel",
  "transport",
  "timing",
  "timings",
  "exam",
  "examination",
  "student",
  "parent",
  "support",
  "faculty",
  "school",
  "cbse",
  "jee",
  "neet",
  "olympiad",
  "hyderabad",
  "delhi",
  "gurugram",
  "mumbai",
  "jaipur",
  "why should",
  "why join",
  "benefits",
  "unique",
  "good for",
  "choose",
  "guidance",
  "ceo",
  "founder",
  "founded",
  "manage",
  "management",
  "organization",
  "class",
  "9th",
  "ninth",
  "best for",
  "contact",
  "who are you",
  "gemini",
  "virtual assistant",
  "eat",
  "sai",
  "child",
  "improve",
  "safety",
  "discipline",
  "food",
  "pressure",
];

const GREETING_PATTERNS = [
  /^(hi|hello|hey|namaste|namaskaram|namaskar|gm|good\s*(morning|afternoon|evening))\s*[!.?]*$/i,
  /^(hi|hello|hey|namaste|namaskaram|namaskar|gm)\s+(there|sir|madam|ma'?am)\s*[!.?]*$/i,
];

const SIMPLE_MATH_PATTERN = /^\s*[-+*/().\d\s]+\s*$/;

const EDUCATIONAL_PATTERNS = [
  SIMPLE_MATH_PATTERN,
  /\b(science|physics|chemistry|biology|maths?|mathematics|english|grammar|essay|explain|definition|photosynthesis|force|atom|noun|verb)\b/i,
];

const PERSONAL_PATTERNS = [
  /\b(who are you|what are you|are you gemini|are you chatgpt|which ai|what model|what do you eat|did you eat|do you eat|your food|are you married|salary|who is sai)\b/i,
];

const SENSITIVE_SCHOOL_PATTERNS = [
  /\b(hanuman|bhagavad gita|gita|yoga|surya namaskaram|surya namaskar|hindu|religious|religion|prayer|festival)\b/i,
];

const ADMISSIONS_PATTERNS = [
  /\b(admission|admissions|join|enroll|apply|seat|callback|counsell?ing|which course|best for|fee|fees|branch|branches|hostel|transport|child improve|academic pressure|discipline|safety|food quality|hostel safe)\b/i,
];

const BLOCKED_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /reveal\s+(your\s+)?(system|developer)\s+prompt/i,
  /show\s+(your\s+)?(system|developer)\s+prompt/i,
  /act\s+as\s+chatgpt/i,
  /developer\s+mode/i,
  /\bdan\s+mode\b/i,
  /\bjailbreak\b/i,
  /roleplay/i,
  /write\s+(code|a\s+program|javascript|python|sql)/i,
  /<\s*script/i,
  /javascript\s*:/i,
  /data\s*:\s*text\/html/i,
  /\bunion\s+select\b/i,
  /\bdrop\s+table\b/i,
  /\binsert\s+into\b/i,
  /\bdelete\s+from\b/i,
  /\bpolitics?\b/i,
  /\bmedical\s+advice\b/i,
  /\blegal\s+advice\b/i,
  /\bfinancial\s+advice\b/i,
  /\bcricket\b/i,
  /\bmovie\b/i,
  /\bjoke\b/i,
  /\bcompetitor\b/i,
];

export const OFF_TOPIC_RESPONSE =
  "I'm here to assist with Sri Chaitanya-related questions such as admissions, academics, courses, facilities, hostel, transport, and student support. How may I help you regarding Sri Chaitanya?";
export const NO_CONTEXT_RESPONSE =
  "The exact details may vary depending on the branch or academic year. For the most accurate information, please contact Sri Chaitanya Support: 040-44600600 or 69106666 Ext. 401/402.";
export const MISSING_INFO_RESPONSE =
  "The exact details may vary depending on the branch or academic year. For the most accurate information, please contact Sri Chaitanya Support: 040-44600600 or 69106666 Ext. 401/402.";

export function classifyMessage(input: string): ChatCategory {
  const lowerInput = input.toLowerCase();

  if (ADMISSIONS_PATTERNS.some((pattern) => pattern.test(lowerInput))) return "admissions_guidance";
  if (SENSITIVE_SCHOOL_PATTERNS.some((pattern) => pattern.test(lowerInput))) return "sensitive_topic";
  if (PERSONAL_PATTERNS.some((pattern) => pattern.test(lowerInput))) return "personal_conversation";
  if (EDUCATIONAL_PATTERNS.some((pattern) => pattern.test(input))) return "educational_question";
  if (SCHOOL_TERMS.some((term) => lowerInput.includes(term)) || GREETING_PATTERNS.some((pattern) => pattern.test(input))) {
    return "school_information";
  }

  return "off_topic";
}

export function getCounselorQuickResponse(input: string) {
  const lowerInput = input.toLowerCase();

  if (GREETING_PATTERNS.some((pattern) => pattern.test(input))) {
    if (/namaskaram|namaskar/i.test(input)) {
      return "Namaskaram! Welcome to Sri Chaitanya. How can I assist you today?";
    }
    if (/gm|good\s*morning/i.test(input)) {
      return "Good morning! Welcome to Sri Chaitanya. How may I help you today?";
    }
    return "Hello! Welcome to Sri Chaitanya. I can help with admissions, academics, courses, branches, facilities, hostel, transport, and student support.";
  }

  if (/\b(who are you|what are you)\b/i.test(lowerInput)) {
    return "I'm the Sri Chaitanya AI Assistant. I help students, parents, and teachers with admissions, courses, branches, hostel facilities, transport, academic programs, and general school guidance.";
  }

  if (/\b(are you gemini|are you chatgpt|which ai|what model)\b/i.test(lowerInput)) {
    return "I'm Sri Chaitanya's AI-powered virtual assistant, designed to help with school-related information and guidance.";
  }

  if (/\b(what do you eat|did you eat|do you eat|your food)\b/i.test(lowerInput)) {
    return "I'm a virtual assistant, so I don't eat food. :)\n\nI'm here to help students, parents, and teachers with Sri Chaitanya admissions, academics, hostel facilities, branches, and student support.";
  }

  if (/^who\s+is\s+sai\b/i.test(lowerInput)) {
    return "Could you please provide more context? Are you referring to a student, teacher, branch representative, or someone associated with Sri Chaitanya?";
  }

  if (/\b(are you married|what'?s your salary|salary)\b/i.test(lowerInput)) {
    if (/married/i.test(lowerInput)) {
      return "I'm a virtual assistant, so I don't have a personal life or marriage. I'm here to help with Sri Chaitanya admissions, academics, hostel facilities, branches, and student support.";
    }
    return "I'm a virtual assistant, so I don't have a salary. I'm here to help with Sri Chaitanya admissions, academics, hostel facilities, branches, and student support.";
  }

  if (SENSITIVE_SCHOOL_PATTERNS.some((pattern) => pattern.test(lowerInput))) {
    if (/bhagavad gita|gita/i.test(lowerInput)) {
      return [
        "The Bhagavad Gita is a respected spiritual text from Indian tradition, often discussed for values such as discipline, duty, focus, and self-reflection.",
        "Sri Chaitanya respects students and families from all backgrounds. Any campus-specific cultural or value-based activities may vary by branch and school policy.",
      ].join("\n\n");
    }

    if (/hanuman/i.test(lowerInput)) {
      return [
        "Hanuman-related practices are part of the faith and cultural traditions followed by some families.",
        "Sri Chaitanya respects all backgrounds. Campus-specific practices or permissions may vary, so parents can confirm with the preferred branch.",
      ].join("\n\n");
    }

    if (/yoga|surya namaskaram|surya namaskar/i.test(lowerInput)) {
      return [
        "Yoga and Surya Namaskaram are commonly associated with fitness, flexibility, breathing, and discipline.",
        "Campus activities may vary by branch and school policy, while respecting students from different backgrounds.",
      ].join("\n\n");
    }

    return [
      "Sri Chaitanya respects students and families from all backgrounds.",
      "Activities such as yoga, cultural programs, prayers, or festival-related practices may vary by campus and school policy.",
      "For campus-specific guidance, it is best to confirm with the preferred branch.",
    ].join("\n\n");
  }

  if (/\b(is food hygienic|food hygienic|food quality|hostel safe|is hostel safe|will my child improve|academic pressure|discipline|safety)\b/i.test(lowerInput)) {
    return [
      "I understand this is an important concern for parents.",
      "Sri Chaitanya focuses on disciplined routines, student supervision, academic mentoring, and a supportive environment. Hostel, food, and safety practices can vary by campus, so it is wise to visit the branch and speak with the team directly.",
      "What class is your child currently studying in?",
    ].join("\n\n");
  }

  if (/^(branches|branch|campuses|campus|locations|find branch|nearest branch)\s*[?.!]*$/i.test(input)) {
    return "Sri Chaitanya has branches across many cities in India. Could you please share your city or location? I'll help you find the nearest Sri Chaitanya branch.";
  }

  if (/^(contact support|support|phone number|contact|helpdesk)\s*[?.!]*$/i.test(input)) {
    return [
      "For official confirmation, admissions support, or branch-specific help, please contact Sri Chaitanya Support:",
      "Phone: 040-44600600",
      "69106666 Ext. 401/402",
      "Email: support@srichaitanya.net",
    ].join("\n");
  }

  if (/\b(best for|which course|recommend|9th class|class 9|ninth class)\b/i.test(lowerInput)) {
    return [
      "For Class 9, the best pathway depends on the student's goal.",
      "Please share the main focus:",
      "- IIT/JEE foundation",
      "- NEET foundation",
      "- Olympiads",
      "- Strong school academics",
      "- Overall academic excellence",
    ].join("\n");
  }

  if (/\b(available courses|courses|course details|academic programs|programs)\b/i.test(lowerInput)) {
    return [
      "Sri Chaitanya offers academic pathways from pre-primary to high school, with strong focus on structured learning and exam readiness.",
      "Key options include primary and high school programs, IIT-JEE and NEET preparation, Olympiad foundation, ACHARYA, IPL-IC, and long-term JEE/NEET programs.",
      "For the best course recommendation, please share the student's current class and target goal.",
    ].join("\n\n");
  }

  if (/\b(why sri chaitanya|why should i join|benefits of joining|what makes sri chaitanya unique)\b/i.test(lowerInput)) {
    return [
      "Sri Chaitanya is known for academic excellence, structured learning, experienced faculty, and strong preparation for IIT-JEE, NEET, Olympiads, and school academics.",
      "It also focuses on mentoring, regular assessment, student support, and a performance-oriented environment that helps students build confidence and consistency.",
    ].join("\n\n");
  }

  if (/\b(who is .*ceo|ceo|founder|founded|who manages|management|organization head)\b/i.test(lowerInput)) {
    return [
      "For leadership or management details, I can help only with publicly verified Sri Chaitanya information.",
      "For official confirmation, please contact Sri Chaitanya Support:",
      "Phone: 040-44600600",
      "69106666 Ext. 401/402",
      "Email: support@srichaitanya.net",
    ].join("\n");
  }

  if (/^(fee|fees|fee details|hostel fees|admission fee|transport fee|school fee|course fee)\??$/i.test(input)) {
    return [
      "Fee details may vary by branch, class, program, hostel, and transport option.",
      "For official confirmation, please contact Sri Chaitanya Support:",
      "Phone: 040-44600600",
      "69106666 Ext. 401/402",
      "Email: support@srichaitanya.net",
    ].join("\n");
  }

  if (SIMPLE_MATH_PATTERN.test(input) && /[+\-*/]/.test(input)) {
    const result = evaluateSimpleMath(input);
    if (result !== null) {
      return `${input.trim()} = ${result}.\n\nIf you're interested in mathematics learning, Sri Chaitanya offers strong academic programs that help students build analytical and problem-solving skills.`;
    }
  }

  if (/\b(admission process|admissions process|how to apply|join sri chaitanya)\b/i.test(lowerInput)) {
    return [
      "For admissions, parents can submit an enquiry through Sri Chaitanya or contact the preferred branch for guidance on board, class, campus, and program selection.",
      "Admission details may vary by branch and academic year. For accurate support, contact Sri Chaitanya Support: 040-44600600 or 69106666 Ext. 401/402.",
    ].join("\n\n");
  }

  if (/\b(hostel information|hostel facilities|boarding)\b/i.test(lowerInput)) {
    return [
      "Sri Chaitanya residential campuses focus on disciplined study, safety, hygiene, wardens, dining facilities, and a supportive environment for students.",
      "Hostel availability and facilities may vary by campus. For exact details, please contact your preferred Sri Chaitanya branch.",
    ].join("\n\n");
  }

  return "";
}

export function inferSchoolContextFromHistory(history: unknown) {
  if (!Array.isArray(history)) return false;

  return history.slice(-6).some((item) => {
    if (!item || typeof item !== "object" || !("content" in item) || typeof item.content !== "string") return false;
    const content = item.content.toLowerCase();
    return SCHOOL_TERMS.some((term) => content.includes(term)) || GREETING_PATTERNS.some((pattern) => pattern.test(content));
  });
}

export function sanitizeUserInput(input: unknown) {
  if (typeof input !== "string") return "";

  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, MAX_INPUT_LENGTH);
}

export function validateUserInput(input: string) {
  if (!input) {
    return { allowed: false, reason: "empty", message: "Please enter a Sri Chaitanya-related question." };
  }

  if (input.length >= MAX_INPUT_LENGTH) {
    return { allowed: false, reason: "too_long", message: "Please keep your question shorter and related to Sri Chaitanya." };
  }

  const category = classifyMessage(input);

  if (BLOCKED_PATTERNS.some((pattern) => pattern.test(input))) {
    return { allowed: false, reason: "blocked_pattern", message: OFF_TOPIC_RESPONSE };
  }

  const lowerInput = input.toLowerCase();
  const isGreeting = GREETING_PATTERNS.some((pattern) => pattern.test(input));
  if (isGreeting) {
    return { allowed: true, reason: "greeting", message: "" };
  }

  if (SIMPLE_MATH_PATTERN.test(input) && /[+\-*/]/.test(input)) {
    return { allowed: true, reason: "math", message: "" };
  }

  if (category !== "off_topic") {
    return { allowed: true, reason: category, message: "" };
  }

  const appearsSchoolRelated = SCHOOL_TERMS.some((term) => lowerInput.includes(term));

  if (!appearsSchoolRelated) {
    return { allowed: false, reason: "off_topic", message: OFF_TOPIC_RESPONSE };
  }

  return { allowed: true, reason: "allowed", message: "" };
}

function evaluateSimpleMath(input: string) {
  if (!SIMPLE_MATH_PATTERN.test(input)) return null;

  try {
    const value = Function(`"use strict"; return (${input});`)() as unknown;
    if (typeof value !== "number" || !Number.isFinite(value)) return null;
    return Number.isInteger(value) ? String(value) : value.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  } catch {
    return null;
  }
}

export function filterModelOutput(output: string) {
  return output
    .replace(/<\s*script[\s\S]*?>[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\*\*/g, "")
    .replace(/(^|\n)\s*\*\s+/g, "$1- ");
}
