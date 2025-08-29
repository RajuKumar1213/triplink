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
    id: 5,
    title: "The French Riviera's Best Kept Secrets",
    excerpt: "Explore the hidden corners of the Côte d'Azur that offer glamour without the crowds.",
    image: "https://images.unsplash.com/photo-1503918886996-8e5c6c0ad951?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "destinations",
    date: "August 15, 2025",
    readTime: "8 min read",
    author: "Triplink Adventures Team",
    content: `
      <h2>Hidden Gems Along the French Riviera</h2>

      <p>The French Riviera, or Côte d'Azur, is synonymous with luxury and glamour. While Saint-Tropez and Cannes draw the crowds, the real magic lies in the lesser-known villages and hidden coves that offer authentic French Riviera charm without the tourist bustle.</p>

      <h3>The Medieval Village of Èze</h3>
      <p>Perched dramatically on a hill overlooking the Mediterranean, Èze is a medieval village that seems frozen in time. Wander through narrow cobblestone streets lined with stone houses adorned with flowers, and enjoy panoramic views of the coastline from the Exotic Garden.</p>

      <h3>Secluded Beaches of the Esterel Coast</h3>
      <p>Just east of Cannes, the Esterel coastline offers some of the most beautiful and least crowded beaches on the Riviera. The red porphyry rocks create a stunning contrast with the turquoise waters, and the hiking trails offer breathtaking coastal views.</p>

      <h3>The Perfumed Village of Grasse</h3>
      <p>Known as the perfume capital of the world, Grasse is home to some of the most prestigious perfume houses. Visit the Fragonard Perfumery to learn about the perfume-making process and enjoy the fragrant fields of lavender and jasmine that surround the town.</p>

      <h3>Hidden Coves of Saint-Jean-Cap-Ferrat</h3>
      <p>This exclusive peninsula is home to some of the most luxurious villas on the Riviera. The coastal path offers access to secluded coves and beaches that are perfect for a private swim away from the crowds.</p>

      <h3>The Artists' Village of Saint-Paul-de-Vence</h3>
      <p>This hilltop village has attracted artists for centuries, including Marc Chagall and Henri Matisse. The narrow streets are lined with art galleries, and the views of the surrounding countryside are spectacular.</p>

      <h2>A Culinary Journey Through Hidden France</h2>

      <p>The French Riviera is also a paradise for food lovers. Beyond the famous Michelin-starred restaurants, explore local markets and family-run bistros that serve authentic Provençal cuisine using the freshest local ingredients.</p>

      <h2>Planning Your French Riviera Adventure</h2>

      <p>The best time to visit these hidden gems is during the shoulder seasons of spring and fall, when the weather is pleasant and the crowds are minimal. Consider renting a car to explore the winding coastal roads and discover these secret spots at your own pace.</p>
    `,
    tags: ["French Riviera", "Hidden Gems", "Luxury Travel", "Europe", "Beaches"]
  }
];

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.id === parseInt(params.id));

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
