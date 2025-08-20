"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { backgroundImage } from "@/constant";

// Data structures
const team = [
  {
    name: "Prince Dahiya",
    role: "Founder",
    image:
      "https://triplinkadventures.com/wp-content/uploads/2025/07/prince-dahiya-founder.jpg",
    blurb:
      "The visionary behind Triplink Adventures’s mission to redefine travel. Prince leads with a passion for creating unforgettable journeys.",
  },
  {
    name: "Ayush",
    role: "COO",
    image:
      "https://triplinkadventures.com/wp-content/uploads/2025/07/Ayush-COO.jpg",
    blurb:
      "Ensuring every trip runs smoothly, Ayush brings operational excellence, strategy and a little magic to every adventure.",
  },
  {
    name: "Mrs. Sonam Kothiwal",
    role: "Founder",
    image:
      "https://triplinkadventures.com/wp-content/uploads/2025/07/mrs.-sonam-kothiwal-founder.jpg",
    blurb:
      "Co–founder shaping our vision for meaningful and sustainable experiences with a heart for mindful travel.",
  },
  {
    name: "Harsh Jonwal",
    role: "Creative Head",
    image:
      "https://triplinkadventures.com/wp-content/uploads/2025/07/harsh-jonwal-creative-head.jpg",
    blurb:
      "The creative force behind vibrant visuals & storytelling – crafting experiences that inspire and connect.",
  },
];

const statsPrimary = [
  { label: "SATISFACTION", value: "100%" },
  { label: "DELUXE STAYS", value: "100%" },
  { label: "TRAVEL GUIDES", value: "100%" },
  { label: "CUSTOMIZED TRIPS", value: "100%" },
];

const statsSecondary = [
  { label: "BEST SERVICES", value: "100%" },
  { label: "AFFORDABILITY", value: "100%" },
  { label: "SAFETY MEASURES", value: "100%" },
  { label: "QUALITY ASSURANCE", value: "100%" },
];

const reachStats = [
  { value: "10+", label: "DESTINATIONS" },
  { value: "50+", label: "GROUP TRIPS" },
  { value: "10+", label: "INTERNATIONAL" },
  { value: "10+", label: "DOMESTIC" },
];

// Simple intersection observer hook
function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);
  return { ref, visible };
}

// Animated counter
function Counter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const duration = 1200;
    function step(ts: number) {
      if (start === null) start = ts;
      const prog = Math.min(1, (ts - start) / duration);
      setVal(Math.floor(prog * target));
      if (prog < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [visible, target]);
  return (
    <div
      ref={ref}
      className="text-4xl font-black text-gray-900 mb-2 tabular-nums">
      {prefix}
      {val}
      {val >= target ? suffix : suffix}
    </div>
  );
}

const values = [
  {
    title: "Authenticity",
    text: "Real stories, real places — no plastic travel.",
  },
  { title: "Community", text: "We link travelers, locals & creators." },
  { title: "Sustainability", text: "Low impact, high meaning journeys." },
  { title: "Craft", text: "Every itinerary is hand-built, never copy‑paste." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Team collaboration"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black40 to-black/30" />
          <div className="absolute top-1/3 -right-20 w-[32rem] h-[32rem] bg-yellow-300/10 rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10 py-32 md:py-48 text-center flex flex-col items-center">
          <p className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-yellow-400 font-semibold mb-6 animate-pulse">
            ABOUT US
          </p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-white max-w-5xl">
            We Link People, <span className="text-yellow-400">Stories</span> &
            Meaningful Adventures
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-200 max-w-2xl font-medium">
            For dreamers, planners & the spontaneous — experiences that stay
            long after the bags are unpacked.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-xs font-semibold">
            {values.map((v) => (
              <span
                key={v.title}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 text-white/80 hover:text-white hover:bg-white/15 transition">
                {v.title.toUpperCase()}
              </span>
            ))}
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest animate-bounce">
            SCROLL
          </div>
        </Container>
      </section>

      <div className="relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={backgroundImage}
            alt="Backgroundttp"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* WHO WE ARE */}
        <RevealSection
          className="py-10 "
          delay={0.05}>
          <Container className="max-w-4xl">
            <StylishHeading icon="✈️">Who We Are</StylishHeading>
            <RichText>
              <p>
                Ever found yourself scrolling through travel reels at midnight,
                whispering to yourself, “I need a break”? We’ve been there too.
                And that’s exactly why Triplink Adventures was born.
              </p>
              <p>
                We’re not just another travel brand selling packages. We’re here
                for the dreamers, the planners, and the spontaneous ones — the
                ones who want more than just a place to stay. We’re here for the
                experiences that stay with you long after your bags are
                unpacked.
              </p>
              <p>
                So let’s go beyond the checklist. Skip the tourist traps.
                Discover the real, the raw, the unforgettable. Let’s make
                memories worth linking.
              </p>
            </RichText>
          </Container>
        </RevealSection>

        {/* WHY WE EXIST + VALUES GRID */}
        <RevealSection className="py-10" delay={0.1}>
          <Container className="max-w-6xl">
            <div className="grid lg:grid-cols-5 gap-14 items-start">
              <div className="lg:col-span-2 space-y-8">
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl ring-1 ring-yellow-200/60 group">
                  <Image
                    src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Purpose driven"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[2500ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white font-semibold text-sm tracking-wider uppercase flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />{" "}
                    PURPOSE DRIVEN
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {values.map((v) => (
                    <div
                      key={v.title}
                      className="relative p-5 rounded-2xl bg-white/70 backdrop-blur border border-yellow-100 shadow-sm hover:shadow-xl transition group overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-yellow-100/30 to-yellow-50/10 transition" />
                      <h4 className="font-bold text-gray-900 mb-1 tracking-tight flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                        {v.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-medium">
                        {v.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <StylishHeading icon="🌍">
                  Why We Exist & Where We’re Headed
                </StylishHeading>
                <RichText>
                  <p>
                    Travel isn&apos;t just about places — it&apos;s about
                    purpose. We&apos;re building a platform that connects
                    wanderers with meaningful adventures, eco-conscious stays
                    and a community of like-minded travelers.
                  </p>
                  <p>
                    We don&apos;t just link trips. We link people. We link
                    stories. We link experiences. And we&apos;re just getting
                    started.
                  </p>
                </RichText>
                <Timeline />
              </div>
            </div>
          </Container>
        </RevealSection>

        {/* TEAM */}
        <RevealSection
          className="py-10 bg-gradient-to-b from-yellow-50/50 to-white"
          delay={0.05}>
          <Container>
            <StylishHeading icon="💪">Our Pillars</StylishHeading>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
              {team.map((member, i) => (
                <div
                  key={member.name}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className="group relative bg-white/60 backdrop-blur rounded-3xl p-5 shadow-lg ring-1 ring-yellow-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-200">
                  <div className="relative h-72 w-full rounded-2xl overflow-hidden mb-5">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="md:object-cover object-contain group-hover:scale-105 transition-transform duration-[1600ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white font-semibold text-xs sm:text-sm px-3 py-1 rounded-full bg-black/35 backdrop-blur">
                      {member.role}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {member.blurb}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </RevealSection>

        {/* STATS */}
        <RevealSection className="py-10" delay={0.05}>
          <Container className="space-y-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsPrimary.map((s, i) => (
                <StatCard
                  key={s.label}
                  index={i}
                  value={s.value}
                  label={s.label}
                  accent
                />
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsSecondary.map((s, i) => (
                <StatCard
                  key={s.label}
                  index={i}
                  value={s.value}
                  label={s.label}
                />
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-yellow-100/60">
              {reachStats.map((s, i) => (
                <div
                  key={s.label}
                  className="relative rounded-3xl bg-white/80 backdrop-blur p-6 ring-1 ring-yellow-100 shadow-sm hover:shadow-xl transition"
                  style={{ transitionDelay: `${i * 70}ms` }}>
                  <Counter
                    target={parseInt(s.value)}
                    suffix={s.value.includes("+") ? "+" : ""}
                  />
                  <div className="text-[11px] font-semibold tracking-widest text-yellow-600">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </RevealSection>

        {/* VISION CTA */}
        <RevealSection
          className="py-10 bg-gradient-to-br from-yellow-600/80 via-yellow-500 to-yellow-400 text-white relative overflow-hidden"
          delay={0.05}>
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" />
          <Container className="relative z-10 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
              Our Vision
            </h2>
            <p className="text-lg md:text-xl font-medium leading-relaxed mb-12">
              Drowning in deadlines while your soul whispers ‘Himalayas’? We
              hear you. You hustle hard — let us craft the escape you’ve earned.
              The next chapter is community, authenticity & unforgettable
              impact-driven journeys.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold">
              {[
                "24/7 SUPPORT",
                "EASY BOOKING",
                "CUSTOMER FIRST",
                "HASSLE FREE",
              ].map((b) => (
                <span
                  key={b}
                  className="px-4 py-2 rounded-full bg-white/15 backdrop-blur border border-white/20 hover:bg-white/25 transition">
                  {b}
                </span>
              ))}
            </div>
          </Container>
        </RevealSection>

        {/* CONTACT */}
        <RevealSection className="py-10" delay={0.05}>
          <Container className="max-w-4xl text-center space-y-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Ready To Link Your Next Journey?
            </h2>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
              OFFICE NO. 406 - 4TH FLOOR, VDS BUILDING, H-159, H BLOCK, SECTOR
              63 NOIDA, UTTAR PRADESH 201301
              <br />
              Phone:{" "}
              <a
                href="tel:+917838720559"
                className="text-yellow-600 font-semibold hover:underline">
                +91 7838720559
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-700">
              <SocialLink href="https://youtube.com/@trip-link">
                YouTube
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/company/triplink-adventures/">
                LinkedIn
              </SocialLink>
              <SocialLink href="https://www.facebook.com/share/16avXaLMS2/?mibextid=wwXIfr">
                Facebook
              </SocialLink>
              <SocialLink href="https://www.instagram.com/triplink_adventures">
                Instagram
              </SocialLink>
            </div>
          </Container>
        </RevealSection>
      </div>
      <Footer />
    </>
  );
}

// Reusable components
function StylishHeading({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: string;
}) {
  return (
    <h2 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
      <span>{children}</span>
      {icon && <span className="text-2xl">{icon}</span>}
    </h2>
  );
}

function RichText({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-gray-700 text-lg leading-relaxed font-medium [&_p]:scroll-mt-24">
      {children}
    </div>
  );
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      ref={ref}
      className={
        className +
        ` transition-all duration-[1200ms] ease-out will-change-transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`
      }
      style={{ transitionDelay: `${delay * 1000}ms` }}>
      {children}
    </section>
  );
}

function StatCard({
  value,
  label,
  index,
  accent = false,
}: {
  value: string;
  label: string;
  index: number;
  accent?: boolean;
}) {
  return (
    <div
      style={{ transitionDelay: `${index * 70}ms` }}
      className={`relative rounded-3xl p-6 ring-1 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
        accent
          ? "bg-gradient-to-br from-white to-yellow-50 ring-yellow-100"
          : "bg-gradient-to-br from-white to-white/70 ring-yellow-100"
      }`}>
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl" />
      <div className="relative text-4xl font-black text-yellow-500 mb-2 tracking-tight">
        {value}
      </div>
      <div className="relative text-sm font-semibold tracking-wide text-gray-700">
        {label}
      </div>
    </div>
  );
}

function Timeline() {
  const items = [
    { year: "2024", text: "Ideation & early community trips" },
    { year: "2025", text: "Foundation of platform & curated experiences" },
    { year: "2026", text: "Scaling creator & eco‑stay collaborations" },
  ];
  return (
    <div className="mt-10 relative pl-4 border-l-2 border-yellow-200 space-y-6">
      {items.map((i) => (
        <div key={i.year} className="relative">
          <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white ring-2 ring-yellow-400 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
          </div>
          <div className="ml-2">
            <p className="text-xs font-bold text-yellow-600 tracking-wide">
              {i.year}
            </p>
            <p className="text-sm font-medium text-gray-700 leading-relaxed">
              {i.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function SocialLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="px-5 py-2 rounded-full bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 transition text-gray-700 shadow-sm hover:shadow-md">
      {children}
    </a>
  );
}
