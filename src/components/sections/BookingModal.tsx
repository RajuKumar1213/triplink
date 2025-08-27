"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Calendar, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  destination: string;
}

export function BookingModal({
  open,
  onClose,
  destination,
}: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [message, setMessage] = useState("");
  const [selectedDate] = useState<Date | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = useCallback(() => {
    if (!submitting) onClose();
  }, [onClose, submitting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      console.log({
        name,
        email,
        phone,
        travellers,
        message,
        destination,
        selectedDate,
      });
      setSubmitting(false);
      onClose();
    }, 1200);
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={close}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-yellow-300/70 animate-scaleIn overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-yellow-200/60 bg-gradient-to-r from-yellow-100 to-yellow-50">
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-yellow-600" />
            Book Your Trip
          </h2>
          <button
            onClick={close}
            className="p-2 rounded-full hover:bg-yellow-100 text-gray-600 transition"
            aria-label="Close booking form"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 md:px-8 py-6 space-y-5"
        >
          {/* Name & Email */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Explorer"
                className="w-full rounded-lg border border-yellow-300/70 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-lg border border-yellow-300/70 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Phone & Travellers */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Phone
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-yellow-300/70 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Travellers
              </label>
              <input
                type="number"
                min={1}
                value={travellers}
                onChange={(e) => setTravellers(parseInt(e.target.value) || 1)}
                className="w-full rounded-lg border border-yellow-300/70 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Destination
            </label>
            <input
              value={destination}
              readOnly
              className="w-full rounded-lg border border-yellow-300/70 bg-yellow-50/70 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Message / Notes
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Preferred dates, requirements..."
              className="w-full rounded-lg border border-yellow-300/70 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-gray-500">
              We usually reply within{" "}
              <span className="font-semibold">2–6 hrs</span>.
            </p>
            <button
              disabled={submitting}
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 text-sm shadow-md hover:shadow-lg transition"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
