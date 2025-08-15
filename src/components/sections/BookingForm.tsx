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
    <section className="my-5 ">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="text-center md:mb-6 mb-1">
            <h2 className="text-xl sm:text-4xl font-bold text-gray-900 mb-4">
              Holiday Packages
            </h2>
          </div>

      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8">
            <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 items-end">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:py-3 border-2 border-yellow-400 rounded focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
                    placeholder="Name"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:py-3 border-2 border-yellow-400 rounded focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
                    placeholder="Email Address"
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:py-3 border-2 border-yellow-400 rounded focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
                    placeholder="Phone number"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 sm:py-3 px-4 rounded transition-colors duration-200 text-sm"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            
            <div className="mt-4 text-center text-xs sm:text-sm text-gray-600 leading-snug">
              I accept ✓ the Privacy Policy and authorise Thomas Cook and Group of Companies to contact me with details
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
