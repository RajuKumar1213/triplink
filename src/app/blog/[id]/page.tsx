import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

// Comprehensive blog data with full content
const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Bali That Even Celebrities Love",
    excerpt: "Discover the secluded spots in Bali where A-listers escape the paparazzi and find true peace.",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "destinations",
    date: "August 25, 2025",
    readTime: "5 min read",
    author: "Triplink Adventures Team",
    content: `
      <h2>The Ultimate Bali Experience Beyond the Crowds</h2>

      <p>Bali has long been a favorite destination for celebrities seeking respite from the spotlight. While tourist hotspots like Kuta and Seminyak offer vibrant nightlife and beach culture, the real magic lies in Bali's hidden gems that only the locals and discerning travelers know about.</p>

      <h3>1. The Secret Beaches of Nusa Penida</h3>
      <p>Far from the mainland crowds, Nusa Penida offers pristine beaches with crystal-clear waters. Crystal Bay and Gamat Bay are two lesser-known spots where you can enjoy uninterrupted views of the Indian Ocean.</p>

      <h3>2. Hidden Rice Terraces of Jatiluwih</h3>
      <p>While Tegallalang is famous for its rice terraces, Jatiluwih offers a more authentic experience. This UNESCO World Heritage site provides breathtaking views and a peaceful atmosphere perfect for reflection.</p>

      <h3>3. The Mystical Mount Batur Sunrise Trek</h3>
      <p>Wake up before dawn to witness one of Bali's most spectacular sunrises from the crater of Mount Batur. This challenging trek rewards you with panoramic views that few tourists experience.</p>

      <h3>4. Traditional Villages of Ubud</h3>
      <p>Beyond the monkey forest and art markets, explore the traditional villages where local Balinese culture thrives. Visit Pengosekan for authentic crafts and cultural performances.</p>

      <h3>5. Sacred Springs of Tirta Empul</h3>
      <p>This ancient Hindu temple complex features holy springs where locals and visitors alike participate in purification rituals. The peaceful atmosphere makes it perfect for spiritual reflection.</p>

      <h3>6. The Black Sand Beaches of East Bali</h3>
      <p>Explore the volcanic black sand beaches of Tulamben and Amed, where you can snorkel among coral reefs and enjoy stunning sunsets over the ocean.</p>

      <h3>7. Hidden Waterfalls of Munduk</h3>
      <p>The Munduk region is home to several cascading waterfalls, including the twin waterfalls of Munduk and the pristine Melanting waterfall, surrounded by lush coffee plantations.</p>

      <h3>8. Traditional Salt Farming in Amed</h3>
      <p>Witness the age-old tradition of salt farming along the coast of Amed, where locals harvest sea salt using traditional methods passed down through generations.</p>

      <h3>9. The Rice Fields of Sidemen Valley</h3>
      <p>This picturesque valley offers some of Bali's most stunning rice terrace landscapes, with Mount Agung providing a dramatic backdrop to the emerald green fields.</p>

      <h3>10. Cultural Immersion in Trunyan</h3>
      <p>Visit the ancient village of Trunyan on Lake Batur, known for its unique burial traditions and stunning lake views. This remote location offers an authentic glimpse into traditional Balinese culture.</p>

      <h2>Planning Your Hidden Bali Adventure</h2>

      <p>To truly experience these hidden gems, consider hiring a local guide who understands the cultural significance of each location. Remember to respect local customs and contribute to the sustainable tourism initiatives that help preserve Bali's natural beauty.</p>

      <p>Whether you're seeking spiritual enlightenment, adventure, or simply a break from the ordinary, Bali's hidden gems offer experiences that will stay with you long after you return home.</p>
    `,
    tags: ["Bali", "Hidden Gems", "Celebrity Travel", "Adventure", "Culture"]
  },
  {
    id: 2,
    title: "Ultimate Guide to Luxury Safari in Kenya",
    excerpt: "Experience the wild in style with our comprehensive guide to Kenya's most exclusive safari experiences.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "luxury",
    date: "August 22, 2025",
    readTime: "7 min read",
    author: "Triplink Adventures Team",
    content: `
      <h2>Luxury Safari: Where Wilderness Meets Opulence</h2>

      <p>Kenya's safari experience has evolved dramatically, offering luxury travelers unprecedented access to the wild while maintaining the highest standards of comfort and exclusivity. From private conservancies to mobile camps, here's your ultimate guide to experiencing the Maasai Mara and beyond in ultimate luxury.</p>

      <h3>Private Conservancies: The Ultimate in Exclusivity</h3>
      <p>Private conservancies offer the most exclusive safari experiences, with properties like Olare Motorogi and Mara North offering vast tracts of land where wildlife roams freely without the crowds of public reserves.</p>

      <h3>Mobile Luxury Camps</h3>
      <p>Experience the romance of the wild with mobile luxury camps that can be set up in the most remote locations. These camps offer the flexibility to follow wildlife migrations while maintaining five-star amenities.</p>

      <h3>Helicopter Safaris</h3>
      <p>For the ultimate in luxury and efficiency, helicopter safaris allow you to cover vast distances quickly while enjoying breathtaking aerial views of the Kenyan landscape and wildlife.</p>

      <h3>Culinary Experiences in the Wild</h3>
      <p>Luxury safari camps now feature world-class chefs who create gourmet meals using local ingredients, often served under the stars with views of the savannah.</p>

      <h3>Wellness and Spa Treatments</h3>
      <p>Many luxury camps now offer wellness experiences, from yoga at sunrise to spa treatments using local ingredients and traditional Maasai healing practices.</p>

      <h2>Best Time to Visit Kenya for Luxury Safari</h2>

      <p>The Great Migration (July-October) offers the most spectacular wildlife viewing, but shoulder seasons (November-December, March-May) provide excellent game viewing with fewer crowds and more affordable luxury options.</p>

      <h2>Sustainable Luxury: Giving Back to Communities</h2>

      <p>True luxury safari experiences now include meaningful community engagement, from supporting local Maasai communities to conservation efforts that ensure Kenya's wildlife thrives for future generations.</p>
    `,
    tags: ["Kenya", "Safari", "Luxury Travel", "Wildlife", "Adventure"]
  },
  {
    id: 3,
    title: "Cultural Immersion: Beyond the Tourist Trail in Japan",
    excerpt: "Step off the beaten path and discover authentic Japanese culture through local experiences.",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "culture",
    date: "August 20, 2025",
    readTime: "6 min read",
    author: "Triplink Adventures Team",
    content: `
      <h2>Discovering Authentic Japan: A Cultural Journey</h2>

      <p>While Tokyo's neon lights and Kyoto's temples draw millions of visitors annually, Japan's true cultural essence lies in its rural villages, local festivals, and everyday traditions that have remained unchanged for centuries.</p>

      <h3>Rural Homestays in Tohoku</h3>
      <p>Experience authentic Japanese hospitality by staying with local families in Tohoku's rural villages. Learn traditional crafts, participate in farm work, and enjoy home-cooked meals made with locally grown ingredients.</p>

      <h3>Matsuri Festivals: Heart of Japanese Culture</h3>
      <p>Attend local festivals (matsuri) that showcase Japan's rich cultural heritage. From the Kanamara Matsuri in Kawasaki to the Hadaka Matsuri in Okayama, each festival offers unique insights into local traditions.</p>

      <h3>Tea Ceremony in Uji</h3>
      <p>Beyond Kyoto's tourist tea ceremonies, experience the real tradition in Uji, where tea has been cultivated for over 800 years. Participate in authentic ceremonies conducted by local tea masters.</p>

      <h3>Craft Villages of Takayama</h3>
      <p>Explore the craft villages around Takayama, where artisans continue age-old traditions of woodworking, lacquerware, and paper-making. Many workshops welcome visitors to try their hand at traditional crafts.</p>

      <h3>Onsen Culture in Beppu</h3>
      <p>Immerse yourself in Japan's hot spring culture in Beppu, known as the "hot spring capital." Learn about the therapeutic benefits and social aspects of onsen visits from local experts.</p>

      <h2>Language and Communication</h2>

      <p>While English is spoken in tourist areas, learning basic Japanese phrases and using translation apps can greatly enhance your cultural immersion experience in rural areas.</p>

      <h2>Respecting Local Customs</h2>

      <p>Understanding and respecting local customs, from bowing etiquette to removing shoes indoors, will deepen your connection with Japanese culture and create more meaningful interactions with locals.</p>
    `,
    tags: ["Japan", "Culture", "Local Experiences", "Traditions", "Immersion"]
  },
  {
    id: 4,
    title: "Packing Like a Pro: Celebrity Travel Secrets Revealed",
    excerpt: "Learn the insider tips and tricks that celebrities use to pack efficiently for any trip.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "tips",
    date: "August 18, 2025",
    readTime: "4 min read",
    author: "Triplink Adventures Team",
    content: `
      <h2>Celebrity Packing Secrets: Travel Light, Live Luxurious</h2>

      <p>Celebrities travel the world constantly, and they've mastered the art of efficient packing. Here are the insider tips and tricks that keep them looking impeccable while traveling light.</p>

      <h3>The Capsule Wardrobe Approach</h3>
      <p>Most celebrities use the capsule wardrobe method: 5-7 versatile pieces that can be mixed and matched to create multiple outfits. Focus on quality over quantity, choosing pieces that are comfortable yet stylish.</p>

      <h3>Color Coordination Strategy</h3>
      <p>Stick to a cohesive color palette (black, white, navy, and one accent color) to make pieces interchangeable and reduce the overall bulk of your luggage.</p>

      <h3>Multipurpose Accessories</h3>
      <p>Choose accessories that serve multiple purposes: a scarf that can be worn multiple ways, jewelry that transitions from day to night, and shoes that work with various outfits.</p>

      <h3>Tech-Savvy Packing</h3>
      <p>Celebrities rely heavily on packing cubes, compression bags, and apps to organize their luggage efficiently. Many use RFID-blocking bags to protect their valuables.</p>

      <h3>Skincare and Wellness Essentials</h3>
      <p>Never compromise on skincare routines. Celebrities travel with travel-sized versions of their favorite products and often bring their own pillowcases and sheets for hygiene.</p>

      <h2>The Mental Game of Packing</h2>

      <p>Packing is as much a mental exercise as a physical one. Celebrities often create packing lists weeks in advance and do practice runs to ensure they have everything they need without overpacking.</p>

      <h2>Sustainable Luxury Travel</h2>

      <p>Many celebrities now prioritize sustainable packing practices, using reusable toiletry bags, choosing eco-friendly brands, and minimizing waste during their travels.</p>
    `,
    tags: ["Packing", "Travel Tips", "Celebrity Style", "Efficiency", "Luxury"]
  }
];

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <div className="relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <Container className="py-12 relative">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Article Content */}
          <article className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg prose-yellow max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-yellow-100 hover:text-yellow-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Share this article:</span>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
                <Link
                  href="/blog"
                  className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
                >
                  ← Back to All Articles
                </Link>
              </div>
            </div>
          </article>
        </Container>
      </div>
      <Footer />
    </>
  );
}
