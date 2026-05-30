"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const objectives = [
  "Encourage healthy competition",
  "Develop team spirit",
  "Build leadership qualities",
  "Promote unity and discipline",
];

const activities = [
  "Inter-house competitions",
  "Sports events",
  "Cultural contests",
  "Leadership roles through House Captains and Prefects",
];

const objectiveCardStyles = [
  { background: "#eef7ff", border: "#b9dcff", label: "#2f6fa8" },
  { background: "#ecfffb", border: "#a9eadf", label: "#17957e" },
  { background: "#fff7ec", border: "#f0c987", label: "#bf7a19" },
  { background: "#fbf2ff", border: "#ddb9f1", label: "#9b4fc9" },
];

const activityNumberColors = ["#2f6fa8", "#41bda2", "#d39345", "#ba62ec"];

const houses = [
  {
    name: "House of Knights",
    line: "Courage, responsibility, and the confidence to lead with respect.",
    accent: "#2f6fa8",
    soft: "#eef7ff",
    image: "/hero-banners/home/1.jpeg",
  },
  {
    name: "House of Vikings",
    line: "Strength, shared purpose, and the drive to rise as one team.",
    accent: "#41bda2",
    soft: "#ecfffb",
    image: "/hero-banners/home/3.jpeg",
  },
  {
    name: "House of Spartans",
    line: "Discipline, resilience, and focus through every challenge.",
    accent: "#d39345",
    soft: "#fff7ec",
    image: "/imageSection/10.jpeg",
  },
  {
    name: "House of Samurais",
    line: "Integrity, composure, and excellence shaped by everyday practice.",
    accent: "#ba62ec",
    soft: "#fbf2ff",
    image: "/imageSection/5.jpg",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-reveal]"),
    );
    const waveElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-wave-reveal]"),
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (!entry.isIntersecting) {
            element.classList.remove("is-visible");
            return;
          }

          window.setTimeout(() => {
            element.classList.remove("is-visible");
            void element.offsetWidth;
            element.classList.add("is-visible");
          }, 40);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    const waveObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (!entry.isIntersecting) {
            element.classList.remove("is-visible");
            return;
          }

          window.setTimeout(() => {
            element.classList.remove("is-visible");
            void element.offsetWidth;
            element.classList.add("is-visible");
          }, 60);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    const frameId = window.requestAnimationFrame(() => {
      revealElements.forEach((element) => revealObserver.observe(element));
      waveElements.forEach((element) => waveObserver.observe(element));
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      revealObserver.disconnect();
      waveObserver.disconnect();
    };
  }, []);
}

export default function PrimaryHousesPage() {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-[#f7fbff] text-[#1f2734]">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1510px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logos/logo_transparent_fixed.png"
              alt="Sri Chaitanya Schools"
              width={58}
              height={58}
              className="h-14 w-14 object-contain"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="text-[18px] font-extrabold text-[#17314a]">
                Sri Chaitanya
              </span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f7f91]">
                CBSE Houses
              </span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full border border-[#dbe7f2] bg-white px-5 text-[14px] font-semibold text-[#17314a] shadow-[0_10px_28px_rgba(17,37,63,0.08)] transition-all hover:-translate-y-0.5 hover:border-[#A2D2FF] hover:text-[#2f6fa8]"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-white pt-28">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-banners/pre-primary-banner.jpg"
            alt="Students taking part in school activities"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38, 55, 83, 0.69)_0%,rgba(77, 97, 131, 0.67)_44%,rgba(10, 20, 36, 0.09)_100%)]" />
        </div>

        <div className="mx-auto flex min-h-[330px] w-full max-w-[1510px] items-center px-5 py-10 sm:min-h-[350px] sm:px-8 lg:min-h-[360px] lg:px-10">
          <div className="max-w-[760px] text-white">
            <p
              data-section-reveal
              className="section-reveal-up mb-5 text-[12px] font-extrabold uppercase tracking-[0.55em] text-white/72"
            >
              About Us
            </p>
            <h1
              data-wave-reveal
              style={{ fontFamily: "var(--font-cinzel)" }}
              className="wave-reveal-heading text-[40px] font-black leading-[0.96] tracking-[-0.03em] sm:text-[52px] lg:text-[64px]"
            >
              <span>CBSE</span> <span>Houses</span>
            </h1>
            <p
              data-section-reveal
              className="section-reveal-up mt-5 max-w-[690px] text-[15px] font-medium leading-7 text-white/82 sm:text-[16px]"
              style={{ animationDelay: "120ms" }}
            >
              The House System encourages discipline, leadership, and organizing
              abilities among students. Every student becomes part of a house
              community where healthy competition and team spirit grow together.
            </p>
          </div>
        </div>
      </section>

            <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1510px]">
          <div className="max-w-[820px]">
            <p
              data-section-reveal
              className="section-reveal-up text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#2f6fa8]"
            >
              The Houses
            </p>
            <h2
              data-wave-reveal
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              className="wave-reveal-heading mt-4 text-[38px] font-light leading-[1] tracking-[-0.05em] text-[#1f2734] sm:text-[56px]"
            >
              <span>Four</span> <span>identities,</span>{" "}
              <span className="font-extrabold">one spirit</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {houses.map((house, index) => (
              <article
                key={house.name}
                data-section-reveal
                className="section-reveal-up group grid overflow-hidden rounded-[8px] border border-[#dce9f4] bg-white shadow-[0_22px_55px_rgba(17,37,63,0.09)] sm:grid-cols-[0.72fr_1fr]"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="relative min-h-[260px] overflow-hidden">
                  <Image
                    src={house.image}
                    alt={house.name}
                    fill
                    sizes="(max-width: 1023px) 100vw, 34vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{ backgroundColor: house.accent }}
                  />
                </div>
                <div className="flex min-h-[260px] flex-col justify-between p-8">
                  <div>
                    <span
                      className="inline-flex rounded-full px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.2em]"
                      style={{ backgroundColor: house.soft, color: house.accent }}
                    >
                      House 0{index + 1}
                    </span>
                    <h3 className="mt-6 text-[30px] font-extrabold leading-tight tracking-[-0.04em] text-[#17314a]">
                      {house.name}
                    </h3>
                    <p className="mt-4 text-[16px] leading-7 text-[#5a6572]">
                      {house.line}
                    </p>
                  </div>
                  <div
                    className="mt-8 h-1.5 w-24 rounded-full transition-all duration-500 group-hover:w-36"
                    style={{ backgroundColor: house.accent }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1510px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p
              data-section-reveal
              className="section-reveal-up text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#2f6fa8]"
            >
              Foundation
            </p>
            <h2
              data-wave-reveal
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              className="wave-reveal-heading mt-4 text-[38px] font-light leading-[1] tracking-[-0.05em] text-[#1f2734] sm:text-[56px]"
            >
              <span>Built</span> <span>for</span>{" "}
              <span className="font-extrabold">Belonging</span>
            </h2>
            <p
              data-section-reveal
              className="section-reveal-up mt-6 max-w-[520px] text-[17px] leading-8 text-[#5a6572]"
            >
              Each house gives students a smaller circle of identity inside the
              larger school community, helping them participate, collaborate,
              compete, and lead with confidence.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {objectives.map((objective, index) => (
              <article
                key={objective}
                data-section-reveal
                className="section-reveal-up rounded-[8px] border p-7 shadow-[0_18px_42px_rgba(17,37,63,0.07)]"
                style={{
                  animationDelay: `${index * 80}ms`,
                  backgroundColor: objectiveCardStyles[index].background,
                  borderColor: objectiveCardStyles[index].border,
                }}
              >
                <span
                  className="text-[13px] font-extrabold uppercase tracking-[0.22em]"
                  style={{ color: objectiveCardStyles[index].label }}
                >
                  Objective {index + 1}
                </span>
                <h3 className="mt-5 text-[24px] font-extrabold leading-tight tracking-[-0.03em] text-[#17314a]">
                  {objective}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef7ff] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto w-full max-w-[1510px]">
          <div className="mx-auto max-w-[920px] text-center">
            <p
              data-section-reveal
              className="section-reveal-up text-[13px] font-extrabold uppercase tracking-[0.24em] text-[#2f6fa8]"
            >
              Student Life
            </p>
            <h2
              data-wave-reveal
              style={{ fontFamily: "var(--font-plus-jakarta-sans)" }}
              className="wave-reveal-heading mt-4 text-[38px] font-light leading-[1] tracking-[-0.05em] text-[#1f2734] sm:text-[56px]"
            >
              <span>Activities</span> <span>that</span>{" "}
              <span className="font-extrabold">Shape Character</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {activities.map((activity, index) => (
              <article
                key={activity}
                data-section-reveal
                className="campus-card-reveal overflow-hidden rounded-[8px] bg-white shadow-[0_20px_48px_rgba(17,37,63,0.09)]"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="h-2 bg-[linear-gradient(90deg,#A2D2FF,#98F5E1,#FFD6A5,#CDB4DB)]" />
                <div className="p-7">
                  <span
                    className="text-[42px] font-extrabold tracking-[-0.06em]"
                    style={{ color: activityNumberColors[index] }}
                  >
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-[23px] font-extrabold leading-tight tracking-[-0.03em] text-[#17314a]">
                    {activity}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
