"use client";
import React, { useState } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";

interface FormState {
  name: string;
  email: string;
  phone: string;
  city: string;
  designation: string;
  destinations: string;
  message: string;
}
const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  city: "Ranchi",
  designation: "",
  destinations: "Kahmir/Sikkim",
  message: "",
};

export default function RequestInvitePage() {
  const [form, setForm] = useState<FormState>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setDone(true);
    setForm(initial);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FFFCEE] pb-24">
        <Container className="pt-12">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Left Promo Column */}
            <div className="space-y-10 order-2 md:order-1">
              <div className="bg-black rounded-2xl p-10 relative text-white flex flex-col items-center text-center">
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                <button className="relative mb-6 w-20 h-20 rounded-md bg-yellow-400 flex items-center justify-center ring-2 ring-black shadow-[0_0_0_4px_#111] hover:scale-105 transition">
                  <span
                    className="w-8 h-8 inline-block"
                    style={{
                      clipPath: "polygon(0 0,100% 50%,0 100%)",
                      background: "#111",
                    }}
                  />
                </button>
                <p
                  className="font-semibold text-xl md:text-2xl mb-6 leading-snug"
                  style={{ fontFamily: '"Brush Script MT",cursive' }}>
                  <span className="text-yellow-400">
                    Ready to Explore Your Next Adventure?
                  </span>
                </p>
                <h1 className="font-semibold text-4xl md:text-5xl leading-tight tracking-tight">
                  <span className="block">Personalized Trips,</span>
                  <span className="block">Group Tours &</span>
                  <span className="block">Unforgettable</span>
                  <span className="block">Experiences — Crafted</span>
                  <span className="block">Just For You.</span>
                </h1>
              </div>
              <div className="rounded-2xl overflow-hidden grid grid-cols-3 gap-1 h-72 bg-gray-200">
                <div className="bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60')] bg-cover bg-center" />
                <div className="bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=60')] bg-cover bg-center" />
                <div className="bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=60')] bg-cover bg-center" />
              </div>
            </div>
            {/* Right Form Column */}
            <div className="order-1 md:order-2 bg-white rounded-2xl p-10 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                Request Invite
              </h2>
              {!done ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                  <Field
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Ranchi"
                  />
                  <Field
                    label="Designation"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="Ex:- Founder of Xyz Company"
                  />
                  <Field
                    label="Destinations"
                    name="destinations"
                    value={form.destinations}
                    onChange={handleChange}
                    placeholder="Kahmir/Sikkim"
                  />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message{" "}
                      <span className="text-gray-400 font-normal text-xs">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Message (Optional)"
                      rows={4}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-md bg-yellow-400 hover:bg-yellow-500 transition font-semibold py-4 text-black text-sm tracking-wide disabled:opacity-60">
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              ) : (
                <div className="py-16 text-center space-y-6">
                  <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Request Received
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto text-sm">
                    We will reach out with next steps shortly.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="px-6 py-3 rounded-md bg-yellow-400 hover:bg-yellow-500 font-semibold text-sm">
                    Send Another
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        className="block text-sm font-semibold text-gray-700 mb-2"
        htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
      />
    </div>
  );
}
