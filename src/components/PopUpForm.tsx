"use client";

import { backgroundImage } from "@/constant";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function PopUpForm() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      {/* Popup Box */}
      <div className="relative md:w-[40%] w-[95 %] max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Travel Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/90 via-yellow-400/70 to-yellow-500/90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 text-center text-black">
          {/* Close Button */}
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-4 right-4 text-black hover:text-gray-800 text-2xl font-bold">
            ✖
          </button>

          <h2 className="text-3xl font-extrabold mb-2">Plan Your Trip ✈️</h2>
          <p className="text-sm mb-6 opacity-90">
            Tell us your dream destination & we’ll send you the best deals!
          </p>

          <form className="space-y-4">
            {/* Destination */}
            <input
              type="text"
              placeholder="Dream Destination"
              className="w-full rounded-xl px-4 py-3 bg-white/90 border border-yellow-700 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-600 text-black placeholder-gray-600"
            />

            {/* Travel Date */}
            <input
              type="date"
              className="w-full rounded-xl px-4 py-3 bg-white/90 border border-yellow-700 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-600 text-black"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl px-4 py-3 bg-white/90 border border-yellow-700 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-600 text-black placeholder-gray-600"
            />

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full mt-4 bg-black text-yellow-400 rounded-xl py-3 font-bold text-lg hover:bg-yellow-600 hover:text-black transition transform hover:scale-105 shadow-lg">
              Get Deals 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopUpForm;
