"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const heroBadges = [
  ["All India Ranks", "128+", "Top ranks"],
  ["Scholarships", "12.8Cr", "Mapped"],
  ["Mentor Pulse", "98%", "Plans updated"],
];

const marquee = [
  "Sri Chaitanya Schools",
  "IIT-JEE Advanced",
  "NEET Coaching",
  "Olympiad Foundation",
  "CBSE Curriculum",
  "Academic Excellence",
  "Campus Life",
  "Future Leaders",
];

const stories = [
  {
    eyebrow: "Focus",
    title: "A calm, precise system for ambitious students.",
    text: "Sri Chaitanya blends disciplined classroom learning, exam-focused mentoring, and parent-visible progress into one high-clarity academic experience.",
    image: "/hero-banners/home/3.jpeg",
  },
  {
    eyebrow: "Learn",
    title: "Smart classrooms, mentor loops, and mastery rituals.",
    text: "Students move through concept studios, doubt rooms, test analytics, and weekly reviews that make improvement visible instead of vague.",
    image: "/imageSection/10.jpeg",
  },
  {
    eyebrow: "Grow",
    title: "Beyond marks: confidence, culture, and leadership.",
    text: "Olympiad exposure, cultural programs, sports, research prompts, and communication opportunities help students become future-ready.",
    image: "/blog/3.jpg",
  },
];

const journey = [
  ["01", "Discover", "Find the right campus, board, course pathway, and scholarship route.", "/admission-cities/hyderabad-city.webp"],
  ["02", "Diagnose", "Understand strengths, weak zones, learning pace, and exam temperament.", "/blog/4.jpg"],
  ["03", "Design", "Build a personalized academic routine with mentors and parent check-ins.", "/imageSection/1.webp"],
  ["04", "Practice", "Move through test loops, doubt rooms, revision cycles, and rank strategy.", "/blog/2.png"],
  ["05", "Achieve", "Turn consistent effort into visible academic and personal momentum.", "/imageSection/9.webp"],
];

const results = [
  { rank: "AIR 07", name: "Anika R.", track: "NEET", score: "705/720", image: "/imageSection/9.webp" },
  { rank: "AIR 18", name: "Vihaan K.", track: "JEE", score: "99.92%", image: "/imageSection/12.jfif" },
  { rank: "Gold", name: "Sara M.", track: "Olympiad", score: "National", image: "/imageSection/3.avif" },
];

const programs = [
  { name: "IIT-JEE Apex", label: "Engineering", image: "/hero-banners/home/3.jpeg" },
  { name: "NEET MedPro", label: "Medical", image: "/imageSection/9.webp" },
  { name: "Olympiad Forge", label: "Foundation", image: "/blog/2.png" },
  { name: "Global Scholar", label: "Leadership", image: "/imageSection/11.jpeg" },
];

const campus = [
  {
    title: "Science Labs",
    image: "/blog/4.jpg",
    text: "Hands-on science, robotics thinking, and experiment-led learning make concepts tangible.",
    stats: ["Lab practice", "Inquiry projects", "Olympiad prep"],
    size: "large",
  },
  {
    title: "Academic Expo",
    image: "/blog/1.jpeg",
    text: "Students present models, research ideas, and innovation work in a public achievement culture.",
    stats: ["Team projects", "Faculty juries", "Confidence"],
    size: "wide",
  },
  {
    title: "Mentor Rooms",
    image: "/imageSection/1.webp",
    text: "Teachers translate ambition into routines, doubt clarity, and daily confidence.",
    stats: ["Mentorship", "Doubt rooms"],
    size: "small",
  },
  {
    title: "Sports Spirit",
    image: "/blog/5.webp",
    text: "Athletics and school competitions build resilience, collaboration, and healthy ambition.",
    stats: ["Discipline", "Teamwork"],
    size: "small",
  },
  {
    title: "Cultural Stage",
    image: "/blog/6.avif",
    text: "Cultural events help students develop presence, expression, leadership, and community pride.",
    stats: ["Expression", "Leadership"],
    size: "wide",
  },
];

const legacyStats = [
  ["950+", "Schools", "Academic excellence across India"],
  ["950000+", "Students", "Shaping future achievers"],
  ["55000+", "Staff", "Experienced teaching and support teams"],
  ["41+", "Years", "Trusted educational legacy"],
];

const achievementTimeline = [
  {
    year: "1986",
    label: "Foundation",
    title: "A disciplined academic movement begins.",
    text: "Sri Chaitanya starts with a clear belief: strong routines, expert teaching, and measurable progress can change student outcomes.",
  },
  {
    year: "1998",
    label: "Expansion",
    title: "Structured preparation reaches more cities.",
    text: "The model grows through focused classrooms, exam strategy, parent trust, and repeatable academic systems.",
  },
  {
    year: "2008",
    label: "Competitive edge",
    title: "JEE, NEET, and Olympiad pipelines mature.",
    text: "Students begin moving through deeper test analytics, doubt clarification, and rank-focused preparation cycles.",
  },
  {
    year: "2016",
    label: "Network scale",
    title: "A national learning ecosystem takes shape.",
    text: "Campus strength, faculty depth, and digital learning loops help create a visible all-India academic footprint.",
  },
  {
    year: "2026",
    label: "Today",
    title: "Premium learning, parent clarity, future readiness.",
    text: "The experience now blends mentorship, technology, achievement culture, and holistic student growth.",
  },
];

const admissionCities = [
  {
    city: "Hyderabad",
    image: "/admission-cities/hyderabad-city.webp",
    mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=78.28%2C17.30%2C78.62%2C17.55&layer=mapnik&marker=17.4375%2C78.4483",
    branches: [
      { name: "Sri Chaitanya Ameerpet", area: "Near Metro Station", x: "48%", y: "52%" },
      { name: "Sri Chaitanya Madhapur", area: "Kavuri Hills", x: "28%", y: "44%" },
      { name: "Sri Chaitanya Kukatpally", area: "KPHB Colony", x: "34%", y: "28%" },
    ],
  },
  {
    city: "Delhi",
    image: "/admission-cities/delhi-city.webp",
    mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=77.02%2C28.50%2C77.32%2C28.78&layer=mapnik&marker=28.6139%2C77.2090",
    branches: [
      { name: "Sri Chaitanya Rohini", area: "North Delhi", x: "42%", y: "30%" },
      { name: "Sri Chaitanya Dwarka", area: "West Delhi", x: "30%", y: "58%" },
      { name: "Sri Chaitanya NCR", area: "Central Access", x: "58%", y: "46%" },
    ],
  },
  {
    city: "Gurugram",
    image: "/admission-cities/gurugram-city.webp",
    mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=76.92%2C28.36%2C77.18%2C28.55&layer=mapnik&marker=28.4595%2C77.0266",
    branches: [
      { name: "Sector 14 Campus", area: "Gurugram", x: "46%", y: "48%" },
      { name: "DLF Phase Campus", area: "Learning Hub", x: "62%", y: "36%" },
      { name: "Sohna Road Campus", area: "South Gurugram", x: "40%", y: "68%" },
    ],
  },
  {
    city: "Mumbai",
    image: "/admission-cities/mumbai-city.webp",
    mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=72.75%2C18.88%2C73.05%2C19.25&layer=mapnik&marker=19.0760%2C72.8777",
    branches: [
      { name: "Andheri Campus", area: "West Mumbai", x: "50%", y: "34%" },
      { name: "Powai Campus", area: "Central Mumbai", x: "60%", y: "48%" },
      { name: "Thane Campus", area: "Metro Region", x: "70%", y: "26%" },
    ],
  },
  {
    city: "Jaipur",
    image: "/admission-cities/jaipur-city.webp",
    mapUrl: "https://www.openstreetmap.org/export/embed.html?bbox=75.68%2C26.78%2C75.95%2C27.02&layer=mapnik&marker=26.9124%2C75.7873",
    branches: [
      { name: "Malviya Nagar", area: "Jaipur", x: "58%", y: "54%" },
      { name: "Vaishali Nagar", area: "West Jaipur", x: "34%", y: "42%" },
      { name: "Mansarovar", area: "South Jaipur", x: "48%", y: "70%" },
    ],
  },
];

const branchNetwork = [
  ["Board", "CBSE"],
  ["State", "Telangana"],
  ["City", "Hyderabad"],
  ["Branch", "Ameerpet"],
];

const visualMoments = [
  { title: "Teacher mentoring", image: "/imageSection/1.webp" },
  { title: "Digital learning", image: "/imageSection/11.jpeg" },
  { title: "Award moments", image: "/imageSection/12.jfif" },
  { title: "Leadership programs", image: "/imageSection/4.avif" },
];

const stackStories = [
  {
    label: "Achievements",
    title: "All India rank momentum",
    text: "A disciplined test culture helps students turn preparation into visible results across NEET, JEE, Olympiads, and foundation programs.",
    stat: "128+",
    statLabel: "top rank moments",
    image: "/imageSection/9.webp",
  },
  {
    label: "Faculty",
    title: "Mentors who translate ambition into routine",
    text: "Experienced teachers map concepts, revision loops, doubt rooms, and weekly improvement rituals into a clear path for every learner.",
    stat: "55K+",
    statLabel: "teaching and support staff",
    image: "/imageSection/1.webp",
  },
  {
    label: "Labs",
    title: "Learning spaces built for discovery",
    text: "Science, robotics, digital learning, and inquiry-led classroom moments make concepts tangible before they become exam confidence.",
    stat: "950+",
    statLabel: "campuses across India",
    image: "/blog/4.jpg",
  },
  {
    label: "Results",
    title: "Progress that parents can actually see",
    text: "Mentor reviews, test analytics, parent visibility, and scholarship guidance create a premium academic feedback loop.",
    stat: "95%",
    statLabel: "parent trust signal",
    image: "/imageSection/12.jfif",
  },
  {
    label: "Campus",
    title: "A complete student life ecosystem",
    text: "Clubs, stages, sports, leadership programs, and cultural events help students build confidence beyond the classroom.",
    stat: "41+",
    statLabel: "years of academic legacy",
    image: "/blog/6.avif",
  },
];

const faculty = [
  ["Physics Strategy", "Dr. Kavya Raman", "/imageSection/1.webp"],
  ["Math Rank Systems", "Aarav Mehta", "/imageSection/2.jfif"],
  ["Biology Mastery", "Nisha Varma", "/imageSection/4.avif"],
];

const footerQuickLinks = ["Home", "About Us", "Academics", "Admissions", "Student Life", "Careers", "Contact"];
const footerPrograms = ["CBSE Curriculum", "IIT-JEE Advanced", "NEET Coaching", "Olympiads", "Competitive Exams"];
const footerBranches = [
  ["Madhapur Main Branch", "Kavuri Hills, 0.5 km", "/hero-banners/home/3.jpeg"],
  ["Ameerpet Branch", "Ameerpet, 2.1 km", "/hero-banners/home/5.jpeg"],
  ["Kukatpally Branch", "Kukatpally, 6.3 km", "/hero-banners/home/1.jpeg"],
];
const footerGallery = [
  "/hero-banners/home/2.jpeg",
  "/imageSection/1.webp",
  "/hero-banners/home/3.jpeg",
  "/imageSection/10.jpeg",
  "/imageSection/6.webp",
  "/imageSection/11.jpeg",
  "/imageSection/9.webp",
  "/imageSection/3.avif",
];

const academicMotifs = ["A+", "pi", "01", "DNA", "IIT", "NEET", "CBSE", "100%"];

function MagneticButton({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        ref.current?.style.setProperty("--x", `${event.clientX - rect.left}px`);
        ref.current?.style.setProperty("--y", `${event.clientY - rect.top}px`);
      }}
      className={`magnetic-button relative isolate overflow-hidden rounded-full px-6 py-3.5 text-sm font-black transition duration-300 ${
        dark
          ? "border border-[#0F2744]/10 bg-[#0F2744] text-[#F8F5EE] shadow-[0_20px_60px_rgba(15,39,68,0.24)]"
          : "bg-[#D4A64A] text-[#0F2744] shadow-[0_20px_60px_rgba(212,166,74,0.28)]"
      }`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [count, setCount] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let animationFrame = 0;
    const animate = () => {
      const started = performance.now();
      const duration = 720;
      const tick = (now: number) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.round(value * eased));
        if (progress < 1) animationFrame = requestAnimationFrame(tick);
      };
      setCount(Math.max(1, Math.round(value * 0.18)));
      animationFrame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
          observer.unobserve(node);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [value]);

  return <span ref={ref}>{count.toLocaleString("en-IN")}{suffix}</span>;
}

function CountText({ value }: { value: string }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const numericValue = match ? Number(match[1]) : 0;
  const suffix = match?.[2] ?? "";
  const decimals = match?.[1].includes(".") ? 1 : 0;
  const hasNumericValue = Boolean(match);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [count, setCount] = useState(numericValue);

  useEffect(() => {
    const node = ref.current;
    if (!node || !hasNumericValue) return;

    let animationFrame = 0;
    const animate = () => {
      const started = performance.now();
      const duration = 680;
      const tick = (now: number) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(numericValue * eased);
        if (progress < 1) animationFrame = requestAnimationFrame(tick);
      };
      setCount(numericValue * 0.18);
      animationFrame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
          observer.unobserve(node);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [decimals, hasNumericValue, numericValue]);

  if (!hasNumericValue) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN", {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function Home() {
  const journeyRef = useRef<HTMLElement>(null);
  const journeyViewportRef = useRef<HTMLDivElement>(null);
  const journeyTrackRef = useRef<HTMLDivElement>(null);
  const chronicleRef = useRef<HTMLElement>(null);
  const chronicleWindowRef = useRef<HTMLDivElement>(null);
  const chronicleTrackRef = useRef<HTMLDivElement>(null);
  const campusRef = useRef<HTMLElement>(null);
  const campusWindowRef = useRef<HTMLDivElement>(null);
  const campusTrackRef = useRef<HTMLDivElement>(null);
  const stackingRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState("");
  const [activeCity, setActiveCity] = useState(admissionCities[0].city);

  const filteredResults = useMemo(
    () => results.filter((item) => `${item.rank} ${item.name} ${item.track}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const selectedCity = admissionCities.find((item) => item.city === activeCity) ?? admissionCities[0];

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    async function runAnimations() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [{ gsap }, ScrollTriggerModule, SplitTypeModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("split-type"),
      ]);
      if (cancelled) return;

      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      const SplitType = SplitTypeModule.default;
      gsap.registerPlugin(ScrollTrigger);
      const existingTriggers = new Set(ScrollTrigger.getAll());

      const splits = Array.from(document.querySelectorAll("[data-split]")).map(
        (node) => new SplitType(node as HTMLElement, { types: "words,chars" }),
      );
      const media = gsap.matchMedia();

      gsap.fromTo(".char", { yPercent: 115, opacity: 0, rotateX: -42 }, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.82,
        ease: "power4.out",
        stagger: 0.011,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 34, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(0 0 12% 0 round 28px)", scale: 1.025 }, {
          clipPath: "inset(0 0 0% 0 round 32px)",
          scale: 1,
          duration: 0.82,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 82%", once: true },
        });
      });

      media.add("(min-width: 1024px)", () => {
        const journeySection = journeyRef.current;
        const journeyViewport = journeyViewportRef.current;
        const journeyTrack = journeyTrackRef.current;

        if (journeySection && journeyViewport && journeyTrack) {
          const travel = () => Math.max(0, journeyTrack.scrollWidth - journeyViewport.offsetWidth);

          gsap.to(journeyTrack, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: journeySection,
              pin: true,
              pinSpacing: true,
              scrub: 0.62,
              start: "top top",
              end: () => `+=${travel()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        }

        const chronicleSection = chronicleRef.current;
        const chronicleWindow = chronicleWindowRef.current;
        const chronicleTrack = chronicleTrackRef.current;

        if (chronicleSection && chronicleWindow && chronicleTrack) {
          const chronicleTravel = () => Math.max(0, chronicleTrack.scrollHeight - chronicleWindow.clientHeight);
          const chronicleItems = gsap.utils.toArray<HTMLElement>(".chronicle-item");

          gsap.set(chronicleItems.slice(1), { autoAlpha: 0.48, y: 28, scale: 0.985 });

          const chronicleTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: chronicleSection,
              pin: true,
              pinSpacing: true,
              scrub: 0.68,
              start: "top top",
              end: () => `+=${Math.max(chronicleTravel() * 0.88, window.innerHeight * 0.75)}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          chronicleTimeline.to(chronicleTrack, { y: () => -chronicleTravel(), ease: "none", duration: 1 }, 0);

          chronicleItems.forEach((item, index) => {
            const point = index / Math.max(chronicleItems.length - 1, 1);
            chronicleTimeline.to(item, { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" }, point);
            if (chronicleItems[index - 1]) {
              chronicleTimeline.to(chronicleItems[index - 1], { autoAlpha: 0.62, scale: 0.985, duration: 0.18 }, point);
            }
          });
        }

        const campusSection = campusRef.current;
        const campusWindow = campusWindowRef.current;
        const campusTrack = campusTrackRef.current;

        if (campusSection && campusWindow && campusTrack) {
          const campusTravel = () => Math.max(0, campusTrack.scrollHeight - campusWindow.clientHeight);
          const campusItems = gsap.utils.toArray<HTMLElement>(".campus-node");
          const routeSteps = gsap.utils.toArray<HTMLElement>(".campus-route-step");

          gsap.set(campusItems.slice(1), { autoAlpha: 0.45, y: 26, scale: 0.98 });
          gsap.set(routeSteps.slice(1), { autoAlpha: 0.45 });

          const campusTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: campusSection,
              pin: true,
              pinSpacing: true,
              scrub: 0.72,
              start: "top top",
              end: () => `+=${Math.max(campusTravel() * 0.85, window.innerHeight * 0.85)}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          campusTimeline.to(campusTrack, { y: () => -campusTravel(), ease: "none", duration: 1 }, 0);

          campusItems.forEach((item, index) => {
            campusTimeline.to(item, { autoAlpha: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" }, index / Math.max(campusItems.length - 1, 1));
            if (campusItems[index - 1]) {
              campusTimeline.to(campusItems[index - 1], { autoAlpha: 0.62, scale: 0.985, duration: 0.18, ease: "power2.out" }, index / Math.max(campusItems.length - 1, 1));
            }
          });

          routeSteps.forEach((step, index) => {
            campusTimeline.to(step, { autoAlpha: 1, x: 0, duration: 0.16, ease: "power2.out" }, index / Math.max(routeSteps.length - 1, 1));
            if (routeSteps[index - 1]) {
              campusTimeline.to(routeSteps[index - 1], { autoAlpha: 0.48, duration: 0.16 }, index / Math.max(routeSteps.length - 1, 1));
            }
          });
        }

        const stackingSection = stackingRef.current;

        if (stackingSection) {
          const stackCards = gsap.utils.toArray<HTMLElement>(".stack-card");
          const stackBackground = stackingSection.querySelector(".stacking-bg") as HTMLElement | null;

          if (stackCards.length) {
            gsap.set(stackCards, {
              y: (index) => (index === 0 ? 0 : window.innerHeight * 0.78),
              scale: 1,
              filter: "brightness(1)",
              zIndex: (index) => index + 1,
              transformOrigin: "50% 0%",
            });

            const stackTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: stackingSection,
                pin: true,
                pinSpacing: true,
                scrub: 0.72,
                start: "top top",
                end: () => `+=${Math.max(window.innerHeight * (stackCards.length - 1) * 0.82, window.innerHeight * 2.4)}`,
                invalidateOnRefresh: true,
                anticipatePin: 1,
              },
            });

            if (stackBackground) {
              stackTimeline.to(stackBackground, { yPercent: -10, scale: 1.08, ease: "none", duration: stackCards.length - 1 }, 0);
            }

            stackCards.forEach((card, index) => {
              if (index === 0) return;
              const at = index - 1;
              stackTimeline.to(card, { y: index * 18, duration: 0.78, ease: "power2.out" }, at);
              stackTimeline.to(
                stackCards.slice(0, index),
                {
                  scale: (cardIndex) => Math.max(0.88, 1 - (index - cardIndex) * 0.035),
                  filter: (cardIndex) => `brightness(${Math.max(0.72, 1 - (index - cardIndex) * 0.08)})`,
                  y: (cardIndex) => cardIndex * 18,
                  duration: 0.72,
                  ease: "power2.out",
                },
                at,
              );
            });
          }
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      cleanup = () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (!existingTriggers.has(trigger)) trigger.kill();
        });
        media.revert();
        splits.forEach((split) => split.revert());
      };
    }

    runAnimations().catch(() => undefined);
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <main className="premium-world min-h-screen overflow-x-clip text-[#0F2744]">
      {/* Ambient floating accents rendered from CSS pseudo-elements */}
      <div className="floating-accents pointer-events-none fixed inset-0 z-0">
        {academicMotifs.map((item, index) => (
          <span key={item} className="academic-motif" style={{ "--motif-index": index } as React.CSSProperties}>
            {item}
          </span>
        ))}
      </div>

      <div className="scroll-progress fixed left-0 top-0 z-[100] h-1 w-full origin-left" />
      <div className="premium-loader fixed inset-0 z-[120] grid place-items-center bg-[#0F2744]">
        <div className="text-center">
          <div className="loader-orbit mx-auto grid h-20 w-20 place-items-center rounded-full border border-[#D4A64A]/30">
            <Image src="/logos/logo_transparent_fixed.png" alt="Sri Chaitanya" width={54} height={54} className="rounded-full" priority />
          </div>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.48em] text-[#F8F5EE]/70">Sri Chaitanya</p>
        </div>
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-7">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/16 bg-[#0F2744]/58 px-4 py-3 text-[#F8F5EE] shadow-[0_24px_90px_rgba(15,39,68,0.2)] backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <Image src="/logos/logo_transparent_fixed.png" alt="Sri Chaitanya" width={38} height={38} className="rounded-full" priority />
            <span className="text-sm font-black tracking-[-0.03em]">Sri Chaitanya</span>
          </div>
          <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.2em] text-[#F8F5EE]/64 lg:flex">
            {["Story", "Journey", "Results", "Programs"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#D4A64A]">{item}</a>
            ))}
          </div>
          <MagneticButton>Apply Now</MagneticButton>
        </nav>
      </header>

      {/* Hero */}
      <section className="cinematic-hero relative flex min-h-screen items-center px-5 pb-16 pt-28 text-[#F8F5EE] sm:px-8 lg:px-12">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/hero-banners/home/1.jpeg">
          <source src="/hero-banners/home/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(212,166,74,0.18),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(122,138,90,0.18),transparent_28%),linear-gradient(115deg,rgba(15,39,68,0.78),rgba(15,39,68,0.42),rgba(46,74,61,0.62))]" />
        <div className="particles absolute inset-0" />
        <div className="spotlight absolute inset-0" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.92fr_0.68fr] lg:items-center">
          <div className="max-w-2xl">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex rounded-full border border-[#D4A64A]/35 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#D4A64A] backdrop-blur-xl">
              Premium global education brand
            </motion.p>
            <h1 data-split className="hero-title font-display mt-7 max-w-2xl font-black">
              Shaping bright futures with academic excellence
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#F8F5EE]/76 sm:text-lg">
              A world-class Sri Chaitanya learning ecosystem for ambitious students, built around discipline, mentorship, results, and future-ready confidence.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <MagneticButton>Begin Admission</MagneticButton>
              <MagneticButton dark>Watch Experience</MagneticButton>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
            className="hero-signal-board"
          >
            <div className="signal-wave" />
            <div className="relative">
              <p className="section-kicker">Live success signals</p>
              <h2 className="font-display mt-3 text-2xl font-black leading-none tracking-[-0.052em] text-[#F8F5EE] sm:text-3xl">
                Momentum you can see.
              </h2>
            </div>
            {heroBadges.map(([label, value, text]) => (
              <motion.article
                key={label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={{ x: 8, scale: 1.015 }}
                className="hero-metric hero-signal-card"
              >
                <span className="hero-signal-dot" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64A]">{label}</p>
                  <p className="mt-1 text-2xl font-black tracking-[-0.05em]"><CountText value={value} /></p>
                  <p className="text-xs text-[#F8F5EE]/62">{text}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="marquee-band border-y border-[#0F2744]/8 bg-[#F8F5EE] py-5">
        <div className="marquee-track flex w-max gap-4 whitespace-nowrap">
          {[...marquee, ...marquee].map((item, index) => (
            <span key={`${item}-${index}`} className="rounded-full border border-[#0F2744]/10 bg-white/60 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-[#0F2744]/72 shadow-sm">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Legacy */}
      <section className="legacy-section px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="mx-auto max-w-4xl text-center">
            <p className="section-kicker">An illustrious legacy</p>
            <h2 className="font-display mt-4 font-black leading-none tracking-[-0.055em]">
              Excellence that continues to shape generations.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#0F2744]/64">
              A trusted Sri Chaitanya network built on academic discipline, expert faculty, competitive preparation, and parent confidence.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {legacyStats.map(([value, label, text]) => (
              <motion.article
                key={label}
                data-reveal
                whileHover={{ y: -10 }}
                className="legacy-stat rounded-[30px] border border-[#0F2744]/8 bg-[#F8F4EC]/76 p-7 text-center shadow-[0_24px_80px_rgba(15,39,68,0.08)] backdrop-blur-xl"
              >
                <p className="font-display text-5xl font-black tracking-[-0.07em] text-[#0F2744]"><CountText value={value} /></p>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] text-[#C97B63]">{label}</p>
                <p className="mt-5 text-sm leading-6 text-[#0F2744]/62">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Chronicle Timeline */}
      <section ref={chronicleRef} className="chronicle-section px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <div data-reveal className="lg:sticky lg:top-28">
            <p className="section-kicker">Year-wise achievements</p>
            <h2 className="font-display mt-4 max-w-xl font-black leading-none tracking-[-0.055em]">
              Four decades of progress, told as a living timeline.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#0F2744]/64">
              From a focused academic beginning in 1986 to a national education ecosystem today, every phase adds scale, stronger outcomes, and deeper parent trust.
            </p>
          </div>

          <div ref={chronicleWindowRef} className="chronicle-scroll-window">
            <div ref={chronicleTrackRef} className="chronicle-track">
              {achievementTimeline.map((item, index) => (
                <motion.article
                  key={item.year}
                  data-reveal
                  whileHover={{ x: 10 }}
                  className="chronicle-item"
                >
                  <div className="chronicle-year">
                    <span>{item.year}</span>
                  </div>
                  <div className="chronicle-copy">
                    <p>{item.label}</p>
                    <h3 className="font-display">{item.title}</h3>
                    <span>{item.text}</span>
                  </div>
                  <div className="chronicle-pulse" style={{ animationDelay: `${index * 180}ms` }} />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="editorial-section px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <p className="section-kicker">A new standard for school experience</p>
            <h2 className="font-display max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.06em] sm:text-7xl">
              Less brochure. More institution-grade storytelling.
            </h2>
          </div>

          <div className="mt-20 space-y-24">
            {stories.map((story, index) => (
              <article key={story.title} className={`story-row grid gap-10 lg:grid-cols-2 lg:items-center ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div data-mask className="relative min-h-[380px] overflow-hidden rounded-[28px] shadow-[0_22px_70px_rgba(15,39,68,0.12)]">
                  <Image src={story.image} alt={story.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />
                </div>
                <div data-reveal className="max-w-xl">
                  <p className="section-kicker">{story.eyebrow}</p>
                  <h3 className="font-display mt-5 text-4xl font-black leading-none tracking-[-0.052em] sm:text-6xl">{story.title}</h3>
                  <p className="mt-6 text-lg leading-8 text-[#0F2744]/66">{story.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="results-section px-5 py-24 text-[#F8F5EE] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">Results showcase</p>
              <h2 className="font-display mt-4 max-w-4xl text-5xl font-black leading-none tracking-[-0.06em] sm:text-7xl">
                Achievement with depth, not noise.
              </h2>
            </div>
            <div className="stats-pill grid grid-cols-3 gap-5 rounded-full border border-white/12 bg-white/10 px-6 py-4 backdrop-blur-2xl">
              {[[128, "ranks"], [950, "campuses"], [41, "years"]].map(([value, label]) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-black text-[#D4A64A]"><Counter value={Number(value)} suffix="+" /></p>
                  <p className="text-xs text-[#F8F5EE]/54">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {results.map((item, index) => (
              <motion.article
                key={item.name}
                data-reveal
                whileHover={{ y: -14, rotateX: 6, rotateY: index === 1 ? -7 : 7 }}
                className="tilt-card relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/12 bg-white/8 p-6 shadow-[0_26px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <Image src={item.image} alt={item.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744] via-[#0F2744]/40 to-transparent" />
                <div className="relative mt-60">
                  <p className="font-display text-5xl font-black tracking-[-0.07em] text-[#D4A64A]">{item.rank}</p>
                  <h3 className="font-display mt-4 text-3xl font-black">{item.name}</h3>
                  <p className="mt-2 text-[#F8F5EE]/66">{item.track} - {item.score}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="program-section px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="section-kicker">Academic programs</p>
          <h2 data-reveal className="font-display program-heading mt-4 max-w-4xl font-black leading-none tracking-[-0.06em]">
            Built like pathways, not product boxes.
          </h2>
          <div className="premium-scroll mt-14 flex snap-x gap-5 overflow-x-auto pb-8">
            {programs.map((program) => (
              <motion.article key={program.name} whileHover={{ scale: 1.015 }} className="relative h-[400px] min-w-[78vw] snap-center overflow-hidden rounded-[28px] md:min-w-[360px]">
                <Image src={program.image} alt={program.name} fill sizes="430px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744] via-[#0F2744]/28 to-transparent" />
                <div className="absolute bottom-0 p-7 text-[#F8F5EE]">
                  <p className="section-kicker">{program.label}</p>
                  <h3 className="font-display program-card-title mt-3 font-black tracking-[-0.05em]">{program.name}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section ref={journeyRef} id="journey" className="journey-stage bg-[#0F2744] px-5 py-16 text-[#F8F5EE] sm:px-8 lg:px-12">
        <div className="journey-copy mx-auto w-full max-w-7xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">Interactive student journey</p>
              <h2 className="font-display mt-4 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                Scroll through the Sri Chaitanya operating model.
              </h2>
            </div>
            <p className="journey-hint max-w-sm text-sm font-bold uppercase tracking-[0.22em] text-[#D4A64A]/80">
              Wheel scroll moves the cards
            </p>
          </div>
        </div>

        <div ref={journeyViewportRef} className="journey-viewport mx-auto mt-10 w-full max-w-7xl overflow-hidden">
          <div ref={journeyTrackRef} className="journey-track flex gap-5">
            {journey.map(([step, title, text, image]) => (
              <article key={title} className="journey-panel grid shrink-0 overflow-hidden rounded-[26px] border border-white/12 bg-[#F8F5EE] text-[#0F2744] shadow-[0_22px_70px_rgba(0,0,0,0.18)]">
                <div className="relative min-h-44 overflow-hidden">
                  <Image src={image} alt={`${title} student journey`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 360px" className="object-cover transition duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744]/38 to-transparent" />
                </div>
                <div className="flex min-h-64 flex-col p-5">
                  <span className="font-display text-5xl font-black tracking-[-0.07em] text-[#D4A64A]">{step}</span>
                  <h3 className="font-display mt-5 text-2xl font-black tracking-[-0.045em]">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#0F2744]/62">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Bridge */}
      <section className="learning-bridge-section px-5 py-20 text-[#0F2744] sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal>
            <p className="section-kicker">Focused pathway</p>
            <h2 className="font-display mt-4 max-w-3xl font-black leading-[1.04] tracking-[-0.045em]">
              From journey mapping to daily learning spaces.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#0F2744]/66">
              The horizontal story shows the student path. Next, the campus timeline shows how each day turns that path into practice, mentoring, performance, and confidence.
            </p>
          </div>
          <div data-reveal className="bridge-visual grid gap-4 sm:grid-cols-3">
            {[
              ["Plan", "/imageSection/11.jpeg"],
              ["Practice", "/blog/4.jpg"],
              ["Progress", "/imageSection/12.jfif"],
            ].map(([label, image]) => (
              <article key={label} className="relative min-h-[260px] overflow-hidden rounded-[28px] border border-[#0F2744]/8 shadow-[0_20px_70px_rgba(15,39,68,0.1)]">
                <Image src={image} alt={`${label} learning pathway`} fill sizes="(max-width: 768px) 100vw, 260px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744]/72 to-transparent" />
                <h3 className="font-display absolute bottom-0 p-5 text-2xl font-black text-[#F8F5EE]">{label}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Campus */}
      <section ref={campusRef} className="campus-section px-5 py-20 text-[#0F2744] sm:px-8 lg:px-12">
        <div className="campus-atlas mx-auto max-w-7xl">
          <div data-reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker">Campus experience</p>
              <h2 className="font-display campus-heading mt-4 max-w-2xl font-black leading-none tracking-[-0.055em]">
                A living atlas of learning spaces.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#0F2744]/64 lg:justify-self-end">
              Each zone is designed like a daily ritual: students test ideas, meet mentors, perform with confidence, and build the habits behind visible achievement.
            </p>
          </div>

          <div className="campus-map mt-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <motion.div data-reveal className="campus-command relative overflow-hidden rounded-[34px] border border-[#7A8A5A]/18 p-7 sm:p-8" whileHover={{ y: -5 }}>
              <div className="campus-command-orbit" />
              <p className="section-kicker">Discovery route</p>
              <h3 className="font-display mt-6 text-4xl font-black leading-none tracking-[-0.055em] sm:text-5xl">
                From curiosity to public confidence.
              </h3>
              <p className="mt-5 text-sm leading-7 text-[#0F2744]/64">
                Scroll to move through the learning spaces: experiment, mentor, perform, and lead.
              </p>
              <div className="mt-8 space-y-4">
                {["Experiment", "Mentor", "Perform", "Lead"].map((step, index) => (
                  <div key={step} className="campus-route-step">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </motion.div>

            <div ref={campusWindowRef} className="campus-story-window relative">
              <div ref={campusTrackRef} className="campus-field relative">
                <div className="campus-path-line" />
                {campus.map((item, index) => (
                  <motion.article
                    key={item.title}
                    whileHover={{ y: -8 }}
                    className={`campus-node group ${index % 2 ? "campus-node-offset" : ""}`}
                  >
                    <div className="campus-node-number">0{index + 1}</div>
                    <div className="campus-node-media">
                      <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="campus-node-copy">
                      <h3 className="font-display">{item.title}</h3>
                      <p>{item.text}</p>
                      <div>
                        {item.stats.map((stat) => (
                          <span key={stat}>{stat}</span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* City Map */}
      <section className="city-section px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker">Admissions near you</p>
              <h2 className="font-display mt-4 max-w-3xl font-black leading-none tracking-[-0.055em]">
                Find the right campus in your city.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#0F2744]/64 lg:justify-self-end">
              Select a city to preview sample Sri Chaitanya campus locations, nearby branches, and the admission path that fits your child.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {admissionCities.map((item) => (
              <button
                key={item.city}
                type="button"
                onClick={() => setActiveCity(item.city)}
                className={`rounded-full border px-5 py-3 text-sm font-black transition ${
                  selectedCity.city === item.city
                    ? "border-[#0F2744] bg-[#0F2744] text-[#F8F5EE] shadow-[0_18px_50px_rgba(15,39,68,0.18)]"
                    : "border-[#D4A64A]/35 bg-[#F8F4EC]/76 text-[#0F2744] hover:border-[#0F2744]/30 hover:bg-white/70"
                }`}
              >
                {item.city}
              </button>
            ))}
          </div>

          <div data-reveal className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_420px]">
            <div className="premium-map relative min-h-[470px] overflow-hidden rounded-[30px] border border-[#0F2744]/8 bg-[#EAEEDC] shadow-[0_24px_90px_rgba(15,39,68,0.12)]">
              <iframe
                key={selectedCity.city}
                title={`${selectedCity.city} branch map`}
                src={selectedCity.mapUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(248,244,236,0.16),rgba(234,238,220,0.08))]" />
              <svg className="absolute inset-0 h-full w-full opacity-55" viewBox="0 0 900 560" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path d="M-40 350C120 280 190 380 310 300C440 214 520 230 660 150C760 92 830 118 940 70" stroke="#0F2744" strokeWidth="18" strokeLinecap="round" opacity="0.1" />
                <path d="M-20 180C120 205 190 118 300 170C430 232 480 390 620 410C730 425 790 350 930 382" stroke="#C97B63" strokeWidth="10" strokeLinecap="round" opacity="0.16" />
                <path d="M120 -30C180 140 160 250 250 360C326 452 470 450 520 600" stroke="#D4A64A" strokeWidth="8" strokeLinecap="round" opacity="0.22" />
                <path d="M690 -20C625 130 680 220 590 322C520 402 394 398 330 585" stroke="#7A8A5A" strokeWidth="12" strokeLinecap="round" opacity="0.16" />
              </svg>

              <div className="absolute left-6 top-6 rounded-[28px] border border-[#0F2744]/8 bg-[#F8F4EC]/86 p-5 shadow-[0_18px_60px_rgba(15,39,68,0.1)] backdrop-blur-xl">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#C97B63]">Live city preview</p>
                <h3 className="font-display mt-2 text-3xl font-black tracking-[-0.05em] text-[#0F2744]">{selectedCity.city}</h3>
              </div>

              {selectedCity.branches.map((branch, index) => (
                <motion.button
                  key={branch.name}
                  type="button"
                  initial={{ scale: 0.86, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  className="map-pin group absolute"
                  style={{ left: branch.x, top: branch.y }}
                >
                  <span className="relative grid h-12 w-12 place-items-center rounded-full bg-[#0F2744] text-sm font-black text-[#D4A64A] shadow-[0_18px_44px_rgba(15,39,68,0.32)]">
                    {index + 1}
                  </span>
                  <span className="pointer-events-none absolute left-10 top-[-10px] w-56 rounded-2xl border border-[#0F2744]/8 bg-[#F8F4EC] p-3 text-left opacity-0 shadow-[0_18px_60px_rgba(15,39,68,0.18)] transition group-hover:translate-y-[-4px] group-hover:opacity-100">
                    <span className="block text-sm font-black text-[#0F2744]">{branch.name}</span>
                    <span className="mt-1 block text-xs text-[#0F2744]/58">{branch.area}</span>
                  </span>
                </motion.button>
              ))}
            </div>

            <aside className="city-panel rounded-[38px] border border-[#0F2744]/8 bg-[#F8F4EC]/86 p-6 shadow-[0_30px_110px_rgba(15,39,68,0.1)] backdrop-blur-xl">
              <p className="section-kicker">Campus list</p>
              <h3 className="font-display mt-3 text-3xl font-black tracking-[-0.05em] text-[#0F2744]">{selectedCity.city} branches</h3>
              <div className="mt-6 space-y-4">
                {selectedCity.branches.map((branch, index) => (
                  <article key={branch.name} className="rounded-[24px] border border-[#0F2744]/8 bg-white/60 p-4">
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D4A64A] text-sm font-black text-[#0F2744]">{index + 1}</span>
                      <div>
                        <h4 className="font-black text-[#0F2744]">{branch.name}</h4>
                        <p className="mt-1 text-sm text-[#0F2744]/58">{branch.area}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <button className="mt-6 w-full rounded-2xl bg-[#0F2744] px-5 py-4 text-sm font-black text-[#F8F5EE] shadow-[0_18px_50px_rgba(15,39,68,0.18)]">
                Request campus callback
              </button>
            </aside>
          </div>
        </div>
      </section>

      {/* Stacking Story */}
      <section ref={stackingRef} className="stacking-section px-5 py-20 text-[#F8F5EE] sm:px-8 lg:px-12">
        <div className="stacking-bg absolute inset-0" />
        <div className="relative z-10 mx-auto grid h-full max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="stacking-copy">
            <p className="section-kicker">Premium story deck</p>
            <h2 className="font-display mt-4 max-w-xl font-black leading-[1.02] tracking-[-0.05em]">
              Scroll through the layers of a high-performance school.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#F8F5EE]/68">
              Each card stacks above the last, revealing how achievements, faculty, labs, results, and campus life work together.
            </p>
          </div>

          <div className="stacking-deck">
            {stackStories.map((item, index) => (
              <article key={item.title} className="stack-card" style={{ "--stack-index": index } as React.CSSProperties}>
                <div className="stack-card-media">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744]/60 via-transparent to-transparent" />
                </div>
                <div className="stack-card-copy">
                  <div>
                    <p className="section-kicker">{item.label}</p>
                    <h3 className="font-display mt-3 text-3xl font-black tracking-[-0.045em] text-[#0F2744]">{item.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-[#0F2744]/64">{item.text}</p>
                  </div>
                  <div className="stack-card-stat">
                    <strong>{item.stat}</strong>
                    <span>{item.statLabel}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Moments */}
      <section className="visual-moments px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker">Campus highlights</p>
              <h2 className="font-display mt-4 max-w-4xl text-5xl font-black leading-none tracking-[-0.06em] sm:text-7xl">
                Real moments, not empty decoration.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[#0F2744]/62">
              Classrooms, awards, mentoring, digital learning, and leadership experiences create a complete premium academic environment.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {visualMoments.map((item, index) => (
              <motion.article
                key={item.title}
                data-reveal
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative overflow-hidden rounded-[28px] shadow-[0_22px_70px_rgba(15,39,68,0.1)] ${index === 1 ? "md:col-span-2 md:row-span-2 min-h-[380px]" : "min-h-[260px]"}`}
              >
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover transition duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744]/76 to-transparent" />
                <h3 className="font-display absolute bottom-0 p-6 text-2xl font-black text-[#F8F5EE]">{item.title}</h3>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="faculty-section px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div data-reveal>
            <p className="section-kicker">Faculty experience</p>
            <h2 className="font-display mt-4 text-5xl font-black leading-none tracking-[-0.06em] sm:text-7xl">
              Mentor presence that feels personal.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#0F2744]/66">
              A premium learning brand is built by teachers who can translate ambition into daily practice.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {faculty.map(([role, name, image]) => (
              <motion.article key={name} whileHover={{ y: -8 }} className="relative min-h-[420px] overflow-hidden rounded-[28px]">
                <Image src={image} alt={name} fill sizes="320px" className="object-cover transition duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744] to-transparent" />
                <div className="absolute bottom-0 p-6 text-[#F8F5EE]">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-[#D4A64A]">{role}</p>
                  <h3 className="font-display mt-3 text-2xl font-black">{name}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Network */}
      <section className="branch-network-section px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div data-reveal>
            <p className="section-kicker">Branch network</p>
            <h2 className="font-display mt-4 font-black leading-none tracking-[-0.055em]">
              Find the right Sri Chaitanya campus with clarity.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#0F2744]/64">
              Browse by board, state, city, and branch, then connect with the campus that fits your child&apos;s academic path.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {branchNetwork.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[#D4A64A]/35 bg-[#F8F4EC]/82 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C97B63]">{label}</p>
                  <p className="mt-2 text-lg font-black text-[#0F2744]">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal className="grid gap-5 md:grid-cols-[1fr_0.75fr]">
            <div className="relative min-h-[350px] overflow-hidden rounded-[28px] shadow-[0_22px_74px_rgba(15,39,68,0.12)]">
              <Image src="/admission-cities/hyderabad-city.webp" alt="Hyderabad branch network" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744]/72 to-transparent" />
              <div className="absolute bottom-0 p-6 text-[#F8F5EE]">
                <p className="section-kicker">Hyderabad</p>
                <h3 className="font-display mt-2 text-3xl font-black">Ameerpet, Madhapur, Kukatpally and more.</h3>
              </div>
            </div>
            <div className="space-y-4">
              {footerBranches.map(([name, area, image]) => (
                <article key={name} className="flex items-center gap-3 rounded-[24px] bg-[#F8F4EC] p-4 shadow-[0_16px_50px_rgba(15,39,68,0.08)]">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl">
                    <Image src={image} alt={name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#0F2744]">{name}</h3>
                    <p className="mt-1 text-sm text-[#0F2744]/58">{area}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="ai-section px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div data-reveal className="grid overflow-hidden rounded-[34px] bg-[#0F2744] text-[#F8F5EE] md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[320px]">
              <Image src="/imageSection/11.jpeg" alt="Digital learning environment" fill sizes="(max-width: 768px) 100vw, 38vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F2744]/68" />
            </div>
            <div className="p-7">
              <p className="section-kicker">AI counsellor</p>
              <div className="mt-8 space-y-4">
                <p className="max-w-lg rounded-[26px] bg-white/10 p-5">Which Sri Chaitanya track suits a Class 10 student aiming for engineering?</p>
                <p className="ml-auto max-w-xl rounded-[26px] bg-[#D4A64A] p-5 text-[#0F2744]">IIT-JEE Apex with Foundation Bridge is the strongest path. Scholarship estimate can be calculated next.</p>
              </div>
            </div>
          </div>
          <div data-reveal className="space-y-5">
            <div className="rounded-[30px] bg-white p-6 shadow-[0_24px_80px_rgba(15,39,68,0.1)]">
              <h3 className="font-display text-2xl font-black">Scholarship calculator</h3>
              <input type="range" min="40" max="100" defaultValue="86" className="mt-8 w-full accent-[#D4A64A]" />
              <p className="font-display mt-5 text-4xl font-black text-[#C97B63]">Up to 45%</p>
            </div>
            <div className="rounded-[30px] bg-white p-6 shadow-[0_24px_80px_rgba(15,39,68,0.1)]">
              <h3 className="font-display text-2xl font-black">Result search</h3>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search rank or student" className="mt-5 w-full rounded-2xl bg-[#F8F5EE] px-4 py-3 outline-none" />
              <div className="mt-4 space-y-2">
                {(filteredResults.length ? filteredResults : results).slice(0, 2).map((item) => (
                  <p key={item.name} className="rounded-xl bg-[#F8F5EE] p-3 text-sm font-bold">{item.rank} - {item.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section relative overflow-hidden px-5 py-28 text-center text-[#F8F5EE] sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-5xl">
          <h2 data-reveal className="font-display text-6xl font-black leading-[0.9] tracking-[-0.08em] sm:text-8xl">
            Make the next academic decision feel clear.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#F8F5EE]/68">
            Premium counselling, campus discovery, scholarship mapping, and Sri Chaitanya course guidance in one modern flow.
          </p>
          <div className="mt-9 flex justify-center"><MagneticButton>Book a Strategy Session</MagneticButton></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="premium-footer relative overflow-hidden px-5 pb-12 pt-20 text-[#F8F5EE] sm:px-8 lg:px-12">
        <div className="footer-aurora absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="footer-gallery-marquee -mx-5 mb-14 flex gap-4 overflow-hidden sm:-mx-8 lg:-mx-12">
            <div className="footer-gallery-track flex gap-4 px-5 sm:px-8 lg:px-12">
              {[...footerGallery, ...footerGallery].map((src, index) => (
                <motion.div key={`${src}-${index}`} whileHover={{ y: -12, scale: 1.03 }} className="relative h-44 w-36 shrink-0 overflow-hidden rounded-[24px] border border-white/12 bg-white/10 shadow-[0_22px_80px_rgba(0,0,0,0.28)] sm:h-56 sm:w-44">
                  <Image src={src} alt="Sri Chaitanya footer gallery" fill sizes="176px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2744]/62 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.75fr_1fr_0.9fr]">
            <div className="footer-panel rounded-[34px] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-2xl">
              <Image src="/logos/logo_transparent_fixed.png" alt="Sri Chaitanya" width={64} height={64} className="rounded-full border border-[#D4A64A]/40 bg-white/10 p-1" />
              <h2 className="font-display mt-5 text-3xl font-black tracking-[-0.06em]">Sri Chaitanya</h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-[#F8F5EE]/62">Transforming education since 1986 through disciplined academics, competitive preparation, and future-ready mentoring.</p>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {["41+ years", "950+ campuses", "9.5L+ students"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-xs font-black text-[#D4A64A]">{item}</div>
                ))}
              </div>
            </div>
            <div className="footer-panel rounded-[34px] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D4A64A]">Quick Links</p>
              <div className="mt-7 space-y-3">
                {footerQuickLinks.map((item) => <Link key={item} href="/" className="block rounded-xl px-3 py-2 text-sm text-[#F8F5EE]/66 transition hover:bg-white/8 hover:text-white">{item}</Link>)}
              </div>
            </div>
            <div className="footer-panel rounded-[34px] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D4A64A]">Academic Programs</p>
              <div className="mt-7 space-y-3">
                {footerPrograms.map((item) => <Link key={item} href="/" className="block rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3 text-sm text-[#F8F5EE]/72 transition hover:border-[#D4A64A]/35 hover:text-white">{item}</Link>)}
              </div>
            </div>
            <div className="footer-panel rounded-[34px] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-2xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#D4A64A]">Nearby Branches</p>
              <div className="mt-7 space-y-3">
                {footerBranches.map(([name, area, image]) => (
                  <article key={name} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3">
                    <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={image} alt={name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold leading-snug">{name}</h3>
                      <p className="mt-1 text-xs text-[#F8F5EE]/50">{area}</p>
                    </div>
                  </article>
                ))}
              </div>
              <input placeholder="Email or mobile" className="mt-5 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm outline-none placeholder:text-white/40" />
              <button className="mt-3 w-full rounded-2xl bg-[#D4A64A] px-4 py-3 text-sm font-black text-[#0F2744]">Send Enquiry</button>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#F8F5EE]/45 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 Sri Chaitanya. Premium education experience.</p>
            <div className="flex gap-4">
              {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((item) => <Link key={item} href="/" className="hover:text-[#D4A64A]">{item}</Link>)}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
        <a href="https://wa.me/" className="grid h-12 w-12 place-items-center rounded-full bg-[#2E4A3D] text-xs font-black text-[#F8F5EE] shadow-2xl">WA</a>
        <button
          type="button"
          onClick={() => window.__lenis?.scrollTo(0, { duration: 1.05 }) ?? window.scrollTo({ top: 0, behavior: "smooth" })}
          className="grid h-12 w-12 place-items-center rounded-full bg-[#F8F5EE] text-xs font-black text-[#0F2744] shadow-2xl"
        >
          Top
        </button>
      </div>
    </main>
  );
}
