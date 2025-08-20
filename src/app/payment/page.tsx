"use client";
import React, { useState } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Check, Copy, Shield, AlertCircle } from "lucide-react";
import Image from "next/image";
import { backgroundImage } from "@/constant";

interface PaymentMethod {
  label: string;
  type: "bank" | "upi" | "razorpay";
  details: { [k: string]: string };
  highlight?: string;
  note?: string;
}

const methods: PaymentMethod[] = [
  {
    label: "Private Bank Transfer",
    type: "bank",
    details: {
      "Account Name": "Triplink Adventures",
      "Account No": "1234567890",
      "IFSC Code": "DVTR00001234",

    },
    highlight: "Preferred for bulk / corporate bookings",
  },
  {
    label: "UPI Transfer",
    type: "upi",
    details: {
      "UPI ID": "triplink@upi",
      Name: "Triplink Adventures",
    },
    highlight: "Instant confirmation for most banks",
  },
  {
    label: "Razorpay Link",
    type: "razorpay",
    details: {
      Link: "https://razorpay.com/triplink",
    },
    highlight: "Supports Cards, UPI, Wallets & EMI",
  },
];

export default function PaymentPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    });
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-white to-yellow-50/40">
        {/* Hero */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <Container className="relative z-10 text-center max-w-4xl">
            <p className="uppercase tracking-[0.35em] text-[10px] md:text-xs text-yellow-600 font-semibold mb-5">
              Payment Options
            </p>
            <h1 className="text-3xl md:text-5xl font-black leading-tight text-gray-900 mb-6 tracking-tight">
              Secure & Convenient Ways To Pay
            </h1>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto">
              Choose the method that suits you best. All transactions processed
              securely. For any clarification, reach our support desk.
            </p>
          </Container>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-24 w-[32rem] h-[32rem] bg-yellow-300/20 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-32 w-[38rem] h-[38rem] bg-yellow-500/10 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Methods */}
        <div className="relative">
          <div className="absolute inset-0 opacity-10">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover object-center"
              priority={false}
            />
          </div>
          <section className="pb-20 ">
            <Container className="grid gap-10 md:gap-12 md:grid-cols-3">
              {methods.map((m) => (
                <div
                  key={m.label}
                  className="group relative rounded-3xl bg-white/70 backdrop-blur p-6 md:p-7 ring-1 ring-yellow-100 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition" />
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                      {m.label}
                    </h3>
                    <span className="text-[10px] font-semibold tracking-wider px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      {m.type.toUpperCase()}
                    </span>
                  </div>
                  {m.highlight && (
                    <p className="text-xs font-semibold text-yellow-700 mb-4">
                      {m.highlight}
                    </p>
                  )}
                  <ul className="space-y-3 mb-5">
                    {Object.entries(m.details).map(([k, v]) => {
                      const copyKey = `${m.type}-${k}`;
                      const isLink = v.startsWith("http");
                      return (
                        <li
                          key={k}
                          className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-semibold tracking-wide text-gray-500">
                              {k}
                            </p>
                            {isLink ? (
                              <a
                                href={v}
                                target="_blank"
                                className="text-sm font-semibold text-yellow-700 hover:underline break-all">
                                {v}
                              </a>
                            ) : (
                              <p className="text-sm font-semibold text-gray-800 break-all">
                                {v}
                              </p>
                            )}
                          </div>
                          {!isLink && (
                            <button
                              onClick={() => copy(v, copyKey)}
                              className="mt-1 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-md border border-yellow-200 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 transition">
                              {copiedKey === copyKey ? (
                                <>
                                  <Check className="h-3.5 w-3.5" /> Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" /> Copy
                                </>
                              )}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {m.note && (
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {m.note}
                    </p>
                  )}
                </div>
              ))}
            </Container>
          </section>

          {/* Security Notice */}
          <section className="pb-24">
            <Container className="max-w-4xl">
              <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400 text-white overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-20 mix-blend-overlay" />
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1 space-y-5">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3">
                      <Shield className="h-7 w-7" /> Important Notice
                    </h2>
                    <p className="text-sm md:text-base font-medium leading-relaxed text-yellow-50/95">
                      For secure transactions, use only the official payment
                      details on this page. Triplink Adventures is not
                      responsible for payments made to unauthorized accounts.
                      Need help? Call us at{" "}
                      <span className="font-semibold">+91 88837 72000</span>.
                    </p>
                  </div>
                  <div className="w-full md:w-64">
                    <div className="bg-white/15 backdrop-blur rounded-2xl p-5 h-full flex flex-col justify-center text-sm font-semibold tracking-wide space-y-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Verify IFSC / UPI
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Confirm Account Name
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Keep Proof of
                        Payment
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> Report Suspicious
                        Calls
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
