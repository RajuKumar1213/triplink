import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { RefreshCw, Clock, CreditCard, AlertTriangle, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { backgroundImage } from "../../constant";

export default function RefundPolicy() {
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
              <RefreshCw className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Triplink Adventures, we strive to make your travel experience seamless and enjoyable.
            Our refund policy ensures fair and transparent processes for cancellations and modifications.
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
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Cancellation Timeline</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Cancellations must be made within the specified timeframe to be eligible for a refund:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li><strong>60+ days before departure:</strong> Full refund (minus processing fees)</li>
                      <li><strong>30-59 days before departure:</strong> 75% refund</li>
                      <li><strong>15-29 days before departure:</strong> 50% refund</li>
                      <li><strong>7-14 days before departure:</strong> 25% refund</li>
                      <li><strong>Less than 7 days:</strong> No refund (except in exceptional circumstances)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Refund Processing</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Once your cancellation is approved, refunds are processed as follows:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li><strong>Processing Time:</strong> 7-14 business days from approval</li>
                      <li><strong>Original Payment Method:</strong> Refunds issued to the same method used for payment</li>
                      <li><strong>Bank Transfers:</strong> May take additional 3-5 business days</li>
                      <li><strong>Partial Refunds:</strong> Calculated based on cancellation timeline and services used</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Non-Refundable Items</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The following items are generally non-refundable:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Visa and documentation fees</li>
                      <li>Travel insurance premiums</li>
                      <li>Third-party supplier charges (airlines, hotels)</li>
                      <li>Processing and administrative fees</li>
                      <li>Services already utilized or consumed</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Modifications & Changes</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Changes to your booking may incur modification fees:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li><strong>Name Changes:</strong> Not permitted after booking confirmation</li>
                      <li><strong>Date Changes:</strong> Subject to availability and airline policies</li>
                      <li><strong>Destination Changes:</strong> Treated as cancellation and rebooking</li>
                      <li><strong>Modification Fees:</strong> Starting from ₹2,000 per change</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Force Majeure</h2>
                    <p className="text-gray-700 leading-relaxed">
                      In cases of force majeure (natural disasters, political unrest, pandemics, etc.),
                      we follow government guidelines and airline policies. Refunds may be processed
                      according to the circumstances and applicable regulations.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Refund Request Process</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      To request a refund, please follow these steps:
                    </p>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                      <li>Contact our customer service team via email or phone</li>
                      <li>Provide your booking reference number and reason for cancellation</li>
                      <li>Submit any required documentation</li>
                      <li>Receive confirmation of refund amount and processing timeline</li>
                      <li>Refund processed within the specified timeframe</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Policy Updates</h2>
                    <p className="text-gray-700 leading-relaxed">
                      This refund policy may be updated to reflect changes in our practices or regulations.
                      The latest version will be posted on our website, and significant changes will be
                      communicated to existing customers.
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
                Need Help with Your Booking?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our customer service team is here to assist you with any questions about cancellations,
                modifications, or refunds. We&apos;re committed to making the process as smooth as possible.
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
              <p className="text-gray-600">August 29, 2025</p>
              <p className="text-sm text-gray-500 mt-2">
                This refund policy was last updated to ensure transparency in our cancellation and refund processes.
              </p>
            </div>
          </div>
        </div>
      </Container>
      </div>
      <Footer />
    </>
  );
}
