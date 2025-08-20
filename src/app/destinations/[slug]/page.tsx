/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { getDestinationBySlug, destinations } from "@/lib/destinations";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BookingActions } from "@/components/sections/BookingActions";
import { backgroundImage } from "@/constant";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export default async function DestinationPage({ params }: any) {
  const data = await getDestinationBySlug(params?.slug as string);
  if (!data) return notFound();

  const sectionNav = [
    { id: "overview", label: "Overview" },
    { id: "highlights", label: "Highlights" },
    { id: "itinerary", label: "Itinerary" },
    { id: "pricing", label: "Pricing" },
    { id: "inclusions", label: "Includes" },
    { id: "faqs", label: "FAQs" },
  ];

  return (
    <>
      <Header />
      <Container>
        <section className="relative">
          {(() => {
            const heroImages = (
              data.gallery.length > 0 ? data.gallery : [data.heroImage]
            ).filter((v, i, a) => !!v && a.indexOf(v) === i);
            return (
              <div className="relative w-full">
                <div className="relative py-6 md:py-4">
                  <div className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 md:gap-6  [&::-webkit-scrollbar]:hidden">
                    {heroImages.map((src, i) => (
                      <div
                        key={src + i}
                        className="relative flex-shrink-0 snap-start w-48 h-48 md:w-80 md:h-80 rounded-none overflow-hidden bg-gray-100 shadow-sm shadow-yellow-100/50 ring-1 ring-yellow-200/50">
                        <Image
                          src={src}
                          alt={`${data.name} image ${i + 1}`}
                          fill
                          priority={i === 0}
                          className="object-cover"
                          sizes="(min-width:1024px) 18rem, 12rem"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 hover:opacity-40 transition" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                  <div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                </div>
                {/* Info strip below carousel */}
                <Container className="mt-4 md:mt-4 bg-white/80 backdrop-blur-md border border-yellow-200/60 rounded-2xl p-6 md:p-8 shadow-lg shadow-yellow-100/50">
                  <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-end lg:justify-between ">
                    <div className="flex-1">
                      <p className="uppercase tracking-[0.35em] text-[10px] md:text-xs font-semibold text-yellow-600 mb-3">
                        Signature Journey
                      </p>
                      <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4 text-gray-900 tracking-tight">
                        {data.name}
                      </h1>
                      <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed font-medium max-w-2xl">
                        {data.shortTagline}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] md:text-xs">
                      {data.duration && (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium shadow-sm">
                          ⏱ {data.duration}
                        </span>
                      )}
                      {data.altitude && (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium shadow-sm">
                          ⬆ {data.altitude}
                        </span>
                      )}
                      {data.bestSeason && (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium shadow-sm">
                          ☀ {data.bestSeason}
                        </span>
                      )}
                      {data.difficulty && (
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium shadow-sm">
                          ⚡ {data.difficulty}
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium border border-yellow-200/70">
                        {data.region}
                      </span>
                    </div>
                  </div>
                  <BookingActions destination={data.name} className="mt-4" />
                </Container>
              </div>
            );
          })()}
        </section>
      </Container>
      <div className="relative mt-4">
        <div className="sticky top-16 z-40 bg-gradient-to-r from-yellow-50/70 via-white to-yellow-50/60 backdrop-blur-md border-b border-yellow-200/60">
          <Container>
            <nav className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-none py-3">
              {sectionNav.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-gray-700 hover:text-black text-xs md:text-sm font-semibold relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-yellow-500 hover:after:w-full after:transition-all">
                  {s.label}
                </a>
              ))}
            </nav>
          </Container>
        </div>
        <div className="absolute inset-0 opacity-10">
          <Image
            src={backgroundImage}
            alt="Backgroundttp"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* Content Gradient Background Layers */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#fff,rgba(254,222,88,0.08))]" />

        <Container className="py-14">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {/* MAIN */}
            <div className="lg:col-span-2 space-y-16">
              {/* (Removed standalone gallery preview) */}

              {/* Overview */}
              <section id="overview" className="scroll-mt-28">
                <header className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-400">
                    Overview
                  </h2>
                </header>
                <div className="space-y-5 text-gray-700 text-sm md:text-[15px] leading-relaxed">
                  {data.overview.map((p, i) => (
                    <p
                      key={i}
                      className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-yellow-300 font-medium text-gray-800">
                      {p}
                    </p>
                  ))}
                </div>
              </section>

              {/* Highlights */}
              {data.highlights.length > 0 && (
                <section id="highlights" className="scroll-mt-28">
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
                    Trip Highlights
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {data.highlights.map((h) => (
                      <li
                        key={h}
                        className="group relative rounded-xl border border-yellow-200 bg-white/70 backdrop-blur-sm px-4 py-3 flex gap-3 items-start shadow-sm hover:shadow-md transition">
                        <span className="mt-1 h-3 w-3 rounded-full bg-yellow-400 ring-2 ring-yellow-200" />
                        <span className="text-gray-800 text-sm md:text-[15px] font-medium">
                          {h}
                        </span>
                        <span className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-yellow-400/40 transition" />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Itinerary */}
              {data.itinerary.length > 0 && (
                <section id="itinerary" className="scroll-mt-28">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-extrabold">
                      Detailed Itinerary
                    </h2>
                    <span className="text-xs font-medium text-yellow-700 bg-yellow-200/60 px-3 py-1 rounded-full">
                      {data.itinerary.length} Days
                    </span>
                  </div>
                  <div className="space-y-6">
                    {data.itinerary.map((day) => (
                      <div
                        key={day.day}
                        className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-yellow-200 shadow-sm hover:shadow-md transition">
                        <div className="absolute -left-6 -top-6 w-24 h-24 bg-gradient-to-br from-yellow-300/40 to-yellow-500/40 rotate-45" />
                        <div className="relative p-5 md:p-6">
                          <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wide bg-yellow-500 text-white px-3 py-1 rounded-full shadow">
                            Day {day.day}
                          </span>
                          <h3 className="mt-3 text-lg md:text-xl font-bold">
                            {day.title}
                          </h3>
                          <p className="mt-2 text-sm md:text-[15px] text-gray-800 leading-relaxed font-medium">
                            {day.description}
                          </p>
                          {day.activities && day.activities.length > 0 && (
                            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-xs md:text-sm text-gray-600">
                              {day.activities.map((a) => (
                                <li key={a} className="flex gap-2">
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                  {a}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {data.faqs.length > 0 && (
                <section id="faqs" className="scroll-mt-28">
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
                    FAQs
                  </h2>
                  <div className="space-y-4">
                    {data.faqs.map((f, i) => (
                      <details
                        key={i}
                        className="group rounded-xl bg-white/80 backdrop-blur-sm border border-yellow-200 p-4 shadow-sm">
                        <summary className="cursor-pointer font-semibold text-sm md:text-base text-gray-800 flex items-center justify-between">
                          {f.question}
                          <span className="text-yellow-600 group-open:rotate-180 transition-transform">
                            ▼
                          </span>
                        </summary>
                        <p className="mt-3 text-xs md:text-sm text-gray-600 leading-relaxed">
                          {f.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA Banner */}
              <section className="rounded-3xl relative overflow-hidden bg-gradient-to-r from-yellow-500 to-yellow-400 p-8 md:p-12 text-white shadow-xl">
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
                <div className="relative max-w-2xl">
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3 drop-shadow">
                    Ready to Experience {data.name.split(" ")[0]}?
                  </h2>
                  <p className="text-sm md:text-base font-medium mb-6 text-yellow-50/90">
                    Limited seats. Secure your spot with a quick advance & start
                    packing the thrill.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <BookingActions
                      destination={data.name}
                      mode="single"
                      singleLabel="Book Now"
                    />
                    <button className="px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold text-sm md:text-base transition">
                      Download PDF
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* SIDEBAR */}
            <aside className="space-y-8 lg:sticky lg:top-28 self-start">
              {/* Pricing */}
              {data.pricing.length > 0 && (
                <section
                  id="pricing"
                  className="scroll-mt-28 rounded-2xl border border-yellow-300/70 bg-gradient-to-br from-yellow-100/80 to-yellow-50/80 backdrop-blur-sm p-6 shadow-sm">
                  <h3 className="text-lg font-extrabold mb-5 flex items-center gap-2">
                    Pricing Options{" "}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-yellow-300/60 text-yellow-900">
                      INR
                    </span>
                  </h3>
                  <ul className="space-y-5">
                    {data.pricing.map((tier) => (
                      <li
                        key={tier.label}
                        className="relative p-4 rounded-xl bg-white/90 border border-yellow-200 shadow-sm hover:shadow-md transition flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <span className="font-semibold text-sm md:text-base text-gray-800">
                            {tier.label}
                          </span>
                          {tier.originalPrice && (
                            <span className="text-[11px] md:text-xs line-through text-gray-400">
                              ₹{tier.originalPrice}
                            </span>
                          )}
                        </div>
                        {tier.price > 0 ? (
                          <span className="text-xl md:text-2xl font-extrabold text-yellow-700 tracking-tight">
                            ₹{tier.price}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-gray-500">
                            {tier.notes}
                          </span>
                        )}
                        {tier.includes && tier.includes.length > 0 && (
                          <ul className="mt-1 text-[11px] md:text-xs text-gray-600 space-y-1 list-disc list-inside">
                            {tier.includes.map((i) => (
                              <li key={i}>{i}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  {data.bookingNote && (
                    <p className="mt-5 text-xs md:text-sm text-yellow-800 font-medium bg-yellow-200/70 px-3 py-2 rounded-lg">
                      {data.bookingNote}
                    </p>
                  )}
                  <div className="mt-6">
                    <BookingActions
                      destination={data.name}
                      mode="single"
                      singleLabel="Book Now"
                      buttonClassName="w-full rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 text-sm md:text-base shadow-lg shadow-yellow-600/30 transition"
                    />
                  </div>
                </section>
              )}

              {/* Inclusions & Exclusions */}
              <section id="inclusions" className="scroll-mt-28 space-y-6">
                {data.inclusions.length > 0 && (
                  <div className="rounded-2xl border border-yellow-200 bg-white/90 backdrop-blur-sm p-5 shadow-sm">
                    <h4 className="text-sm md:text-base font-bold mb-3">
                      Inclusions
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                      {data.inclusions.map((i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-yellow-500" />{" "}
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.exclusions.length > 0 && (
                  <div className="rounded-2xl border border-yellow-200 bg-white/90 backdrop-blur-sm p-5 shadow-sm">
                    <h4 className="text-sm md:text-base font-bold mb-3">
                      Exclusions
                    </h4>
                    <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                      {data.exclusions.map((i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />{" "}
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </aside>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
