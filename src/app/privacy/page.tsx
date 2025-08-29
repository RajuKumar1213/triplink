import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Shield, Eye, Lock, Cookie, Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <Container className="py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Triplink Adventures, we prioritize your privacy while crafting exceptional travel experiences.
            This Privacy Policy explains how we collect, use, and protect your personal information to ensure your trust and confidence.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12 space-y-8">

              {/* Section 1 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information Collection</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We collect details you provide, such as your name, email, phone number, and payment information, to process bookings.
                      We also use cookies and analytics to enhance your website experience, with your consent where required.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Data Usage</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Your information is used to manage bookings, offer personalized travel recommendations, and send updates or promotions (opt-out available).
                      We do not sell your data to third parties.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Data Sharing</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We share data with trusted partners (e.g., airlines, hotels) to fulfill your travel plans, ensuring they follow strict confidentiality standards.
                      Data may be shared if required by law or to protect our legal rights.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Data Security</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We implement industry-standard encryption and security measures to protect your data.
                      While we strive for maximum security, no system is entirely risk-free.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Your Privacy Rights</h2>
                    <p className="text-gray-700 leading-relaxed">
                      You may access, update, or delete your data by contacting us. You can also manage marketing preferences or cookie settings through our website,
                      in compliance with applicable data protection laws.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Cookie className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Cookies & Tracking</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Our website uses cookies to improve functionality and analyze performance. You can adjust cookie settings in your browser,
                      which may affect site features. We respect your preferences.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Policy Updates</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We may update this policy to reflect changes in practices or regulations. The latest version will be posted on our website,
                      with significant changes notified via email or site announcements.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                For privacy-related inquiries, please contact our team. We're here to help and ensure your data privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">contact@triplinkadventures.com</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">+91 7838720559</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600 text-sm">
                  Office No. 406 - 4th Floor<br />
                  VDS Building, H-159, H Block<br />
                  Sector 63, Noida<br />
                  Uttar Pradesh 201301, India
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Last Updated</h3>
              <p className="text-gray-600">August 28, 2025</p>
              <p className="text-sm text-gray-500 mt-2">
                This privacy policy was last updated to reflect our current data handling practices.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
