'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="my-10">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center md:mb-8 mb-4">
            <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
              ✈️ Holiday Packages
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Book your dream holiday in just a few clicks
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border border-yellow-400/40">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg font-medium shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200 text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg font-medium shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200 text-sm sm:text-base"
                    placeholder="you@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-yellow-400 rounded-lg font-medium shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200 text-sm sm:text-base"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition duration-200 text-sm sm:text-base"
                  >
                    🚀 Submit
                  </button>
                </div>
              </div>
            </form>

            {/* Footer note */}
            <div className="mt-6 text-center text-xs sm:text-sm text-gray-600 leading-snug">
              ✅ I accept the <span className="font-semibold text-gray-800">Privacy Policy</span> and authorise{" "}
              <span className="font-bold text-yellow-600">Triplink & Co.</span> to contact me with details.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
