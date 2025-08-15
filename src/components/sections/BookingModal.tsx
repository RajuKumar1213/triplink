"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Calendar, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  destination: string;
}

interface CalendarDay {
  date: Date;
  currentMonth: boolean;
}

function buildMonth(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay(); // 0 Sun
  const days: CalendarDay[] = [];
  // previous month fillers
  for (let i = 0; i < startWeekday; i++) {
    const d = new Date(year, month, 0 - (startWeekday - 1 - i));
    days.push({ date: d, currentMonth: false });
  }
  // current month
  const last = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= last; d++) {
    days.push({ date: new Date(year, month, d), currentMonth: true });
  }
  // next fillers to get 42 cells
  while (days.length < 42) {
    const lastDate = days[days.length - 1].date;
    const nd = new Date(lastDate);
    nd.setDate(nd.getDate() + 1);
    days.push({ date: nd, currentMonth: false });
  }
  return days;
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [submitting, setSubmitting] = useState(false);
  const days = buildMonth(calYear, calMonth);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
      // Placeholder: send to API
      console.log({
        name,
        email,
        phone,
        travellers,
        message,
        destination,
        date: selectedDate,
      });
      setSubmitting(false);
      onClose();
    }, 1200);
  };

  const monthLabel = new Date(calYear, calMonth, 1).toLocaleDateString(
    undefined,
    { month: "long", year: "numeric" }
  );

  const formatDMY = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  if (!mounted) return null;
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[200]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-fadeIn"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="fixed md:absolute bottom-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 inset-x-0 mx-auto w-full md:w-[560px] bg-white md:rounded-2xl rounded-t-3xl shadow-2xl border border-yellow-200/70 flex flex-col max-h-[95vh] overflow-hidden animate-slideUp md:animate-scaleIn">
        <div className="flex items-center justify-between px-6 py-4 border-b border-yellow-100/70 bg-gradient-to-r from-yellow-50 to-white">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900">
            Book / Enquire
          </h2>
          <button
            onClick={close}
            className="p-2 rounded-full hover:bg-yellow-100 text-gray-600"
            aria-label="Close booking form">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 md:px-8 py-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Full Name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Explorer"
                className="w-full rounded-lg border border-yellow-200/70 bg-white/60 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-yellow-200/70 bg-white/60 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Phone Number
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-yellow-200/70 bg-white/60 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2 relative">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Choose Date
              </label>
              <button
                type="button"
                onClick={() => setShowCalendar((s) => !s)}
                className="w-full flex items-center justify-between rounded-lg border border-yellow-200/70 bg-white/60 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none">
                <span>
                  {selectedDate ? formatDMY(selectedDate) : "Select date"}
                </span>
                <Calendar className="h-4 w-4 text-yellow-600" />
              </button>
              {showCalendar && (
                <div className="absolute z-20 mt-2 w-72 rounded-xl border border-yellow-200 bg-white shadow-lg p-3 right-2">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      type="button"
                      onClick={() => {
                        const m = calMonth - 1;
                        setCalMonth((m + 12) % 12);
                        if (m < 0) setCalYear((y) => y - 1);
                      }}
                      className="px-2 py-1 text-xs rounded hover:bg-yellow-100">
                      ←
                    </button>
                    <span className="text-sm font-semibold text-gray-800">
                      {monthLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const m = calMonth + 1;
                        setCalMonth(m % 12);
                        if (m > 11) setCalYear((y) => y + 1);
                      }}
                      className="px-2 py-1 text-xs rounded hover:bg-yellow-100">
                      →
                    </button>
                  </div>
                  <div className="grid grid-cols-7 text-[10px] font-medium text-gray-500 mb-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} className="text-center py-1">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 relative ">
                    {days.map((d, i) => {
                      const isSel =
                        selectedDate &&
                        d.date.toDateString() === selectedDate.toDateString();
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setSelectedDate(d.date);
                            setShowCalendar(false);
                          }}
                          className={`h-8 text-xs rounded-md flex items-center justify-center transition ${
                            d.currentMonth ? "text-gray-700" : "text-gray-300"
                          } ${
                            isSel
                              ? "bg-yellow-500 text-white shadow"
                              : "hover:bg-yellow-100"
                          }`}>
                          {d.date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Travellers
              </label>
              <input
                type="number"
                min={1}
                value={travellers}
                onChange={(e) => setTravellers(parseInt(e.target.value) || 1)}
                className="w-full rounded-lg border border-yellow-200/70 bg-white/60 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Destination
              </label>
              <input
                value={destination}
                readOnly
                className="w-full rounded-lg border border-yellow-200/70 bg-yellow-50/60 px-3 py-2 text-sm font-medium text-gray-700"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Message / Notes
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Tell us about preferred dates, customization, special requirements..."
                className="w-full resize-none rounded-lg border border-yellow-200/70 bg-white/60 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <p className="text-[11px] text-gray-500">
              We usually respond within 2–6 hours.
            </p>
            <button
              disabled={submitting}
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 text-sm shadow shadow-yellow-500/30">
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
