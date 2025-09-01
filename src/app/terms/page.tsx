"use client";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { FileText, Shield, Users, CreditCard, AlertTriangle, Mail } from "lucide-react";
import Image from "next/image";
import { backgroundImage } from "../../constant";

const TermsPage = () => {
  return (
    <>
      <Header />
      <div className="relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>

        <Container className="py-12 relative">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our services.
            By using TripLink, you agree to be bound by these terms.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12 space-y-8">              {/* Section 1: Acceptance of Terms */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        Welcome to TripLink (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your use of our website, mobile application, and services (collectively, the &quot;Service&quot;). By accessing or using our Service, you agree to be bound by these Terms.
                      </p>
                      <p>
                        If you do not agree to these Terms, please do not use our Service. We reserve the right to modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Description of Service */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        TripLink is a premium travel booking and planning platform that connects travelers with luxury experiences, adventure packages, and personalized travel services. Our services include:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Travel package bookings and reservations</li>
                        <li>Destination information and travel guides</li>
                        <li>Customer support and travel assistance</li>
                        <li>Payment processing for travel services</li>
                        <li>Access to exclusive travel deals and experiences</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: User Accounts */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        To access certain features of our Service, you may need to create an account. You are responsible for:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Maintaining the confidentiality of your account credentials</li>
                        <li>All activities that occur under your account</li>
                        <li>Providing accurate and up-to-date information</li>
                        <li>Notifying us immediately of any unauthorized use</li>
                      </ul>
                      <p>
                        We reserve the right to suspend or terminate your account if we suspect any violation of these Terms.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Booking and Payments */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Booking and Payments</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        All bookings made through TripLink are subject to availability and confirmation. Payment terms include:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Full payment is required at the time of booking for most services</li>
                        <li>Prices are subject to change without notice</li>
                        <li>Refunds are processed according to our refund policy</li>
                        <li>Additional fees may apply for changes or cancellations</li>
                      </ul>
                      <p>
                        You agree to pay all charges associated with your bookings, including applicable taxes and fees.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Cancellation and Refund Policy */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Cancellation and Refund Policy</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        Cancellation policies vary by service provider and booking type. Generally:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Cancellations made 30+ days before travel: Full refund minus processing fees</li>
                        <li>Cancellations made 15-29 days before travel: 50% refund</li>
                        <li>Cancellations made less than 15 days before travel: No refund</li>
                        <li>Force majeure events may qualify for special consideration</li>
                      </ul>
                      <p>
                        Please refer to your specific booking confirmation for detailed cancellation terms.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: User Conduct */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">6. User Conduct</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        You agree to use our Service responsibly and in compliance with applicable laws. Prohibited activities include:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Violating any applicable laws or regulations</li>
                        <li>Impersonating others or providing false information</li>
                        <li>Interfering with the proper functioning of our Service</li>
                        <li>Using our Service for any fraudulent or illegal purpose</li>
                        <li>Uploading harmful content or malware</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7: Intellectual Property */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        All content, trademarks, and materials on our Service are owned by TripLink or our licensors and are protected by intellectual property laws. You may not:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Copy, reproduce, or distribute our content without permission</li>
                        <li>Use our trademarks without authorization</li>
                        <li>Reverse engineer or attempt to extract our source code</li>
                        <li>Create derivative works based on our Service</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 8: Limitation of Liability */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Limitation of Liability</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        TripLink shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our Service. Our total liability shall not exceed the amount paid by you for the specific service in question.
                      </p>
                      <p>
                        We do not guarantee the accuracy, completeness, or reliability of information provided through our Service.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 9: Contact Information */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact Information</h2>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>
                        If you have any questions about these Terms and Conditions, please contact us:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                          <p className="text-gray-600">contact@triplinkadventures.com</p>
                        </div>

                        <div className="text-center">
                          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                          <p className="text-gray-600">+91 7838720559</p>
                        </div>

                        <div className="text-center">
                          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-6 h-6 text-white" />
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
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Last Updated</h3>
              <p className="text-gray-600">September 1, 2025</p>
              <p className="text-sm text-gray-500 mt-2">
                These terms and conditions were last updated to ensure clarity and transparency in our service agreements.
              </p>
            </div>
          </div>
        </div>
      </Container>
      </div>

      <Footer />
    </>
  );
};

export default TermsPage;
