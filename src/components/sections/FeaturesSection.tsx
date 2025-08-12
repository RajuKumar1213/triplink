import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  Users, 
  MapPin, 
  Mountain, 
  Shield, 
  Heart, 
  Wallet 
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Custom Plans',
    subtitle: 'Tailored Itineraries',
    description: 'Personalized travel experiences designed just for you'
  },
  {
    icon: MapPin,
    title: 'Unique Spots',
    subtitle: 'Offbeat Destinations',
    description: 'Discover hidden gems and unexplored locations'
  },
  {
    icon: Mountain,
    title: 'Epic Adventures',
    subtitle: 'Thrilling Experiences',
    description: 'From bungee jumping to mountain trekking'
  },
  {
    icon: Shield,
    title: 'Secure Journeys',
    subtitle: 'Safety First',
    description: 'Your safety and security is our top priority'
  },
  {
    icon: Heart,
    title: 'Join the Crew',
    subtitle: 'Traveler Community',
    description: 'Connect with like-minded adventure seekers'
  },
  {
    icon: Wallet,
    title: 'Pocket-Friendly',
    subtitle: 'Affordable Travel',
    description: 'Quality experiences at unbeatable prices'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
      <Container size="xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover TripLink Adventures
          </h2>
          <p className="text-xl text-yellow-600 font-medium mb-4">
            &quot;Adventures That Inspire&quot;
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At TripLink Adventures, we design journeys that resonate with your wanderlust. 
            Our curated experiences, seamless planning, and personalized touch ensure every 
            trip is a story to cherish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} hover className="text-center group">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6 group-hover:bg-yellow-500 transition-colors duration-200">
                    <IconComponent className="h-8 w-8 text-yellow-600 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-yellow-600 font-medium mb-3">
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Experience the Extraordinary
            </h3>
            <p className="text-gray-600 mb-6">
              Whether it&apos;s bungee jumping or a quiet retreat, we turn your travel dreams into 
              reality with ease and excitement.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">24/7 Customer Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Hassle-free Booking</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Travel Solo, Never Alone
            </h3>
            <p className="text-gray-600 mb-6">
              Our solo travel options prioritize your safety and connection, making every 
              journey empowering and enjoyable.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">Female-friendly group tours</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">Verified travel companions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">Safety protocols in place</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
