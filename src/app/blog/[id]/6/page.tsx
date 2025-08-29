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
    id: 6,
    title: "Sustainable Luxury: Eco-Friendly Resorts That Don't Compromise on Comfort",
    excerpt: "Discover how luxury and sustainability can coexist at these breathtaking eco-resorts around the world.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "luxury",
    date: "August 12, 2025",
    readTime: "9 min read",
    author: "Triplink Adventures Team",
    content: `
      <h2>The Rise of Sustainable Luxury Travel</h2>

      <p>In an era where conscious consumerism is becoming the norm, the luxury travel industry is embracing sustainability without compromising on the opulent experiences that discerning travelers expect. These eco-friendly resorts prove that luxury and environmental responsibility can coexist beautifully.</p>

      <h3>Amangiri - Canyon Point, Utah, USA</h3>
      <p>This architectural masterpiece blends seamlessly with the red rock desert landscape. Built with local stone and designed to minimize environmental impact, Amangiri offers unparalleled luxury while maintaining the pristine beauty of its surroundings.</p>

      <h3>Soneva Fushi - Baa Atoll, Maldives</h3>
      <p>This overwater resort pioneers sustainable practices in paradise. From coral replanting programs to zero-waste initiatives, Soneva Fushi demonstrates that luxury resorts can be both indulgent and environmentally responsible.</p>

      <h3>Six Senses Yao Noi - Krabi, Thailand</h3>
      <p>Perched on a limestone cliff, this resort integrates seamlessly with its natural surroundings. The property uses solar power, rainwater harvesting, and supports local conservation efforts while providing world-class spa treatments and gourmet dining.</p>

      <h3>Alila Manggis - Manggis, Indonesia</h3>
      <p>This Balinese resort combines traditional architecture with modern eco-friendly practices. The property supports local communities through fair trade initiatives and maintains mangrove restoration programs.</p>

      <h3>COMO Cocoa Island - South Male Atoll, Maldives</h3>
      <h3>Quilalea - Quirimbas Archipelago, Mozambique</h3>
      <p>This intimate island retreat focuses on low-impact luxury. With just 14 villas, Quilalea offers personalized service while protecting the pristine ecosystem of the Quirimbas Archipelago through marine conservation programs.</p>

      <h2>Innovative Sustainable Practices</h2>

      <p>These resorts employ cutting-edge sustainable technologies: solar power systems, water purification plants, organic gardens, and waste management systems that turn luxury hospitality into a force for environmental good.</p>

      <h2>The Future of Luxury Travel</h2>

      <p>As travelers increasingly prioritize sustainability, these eco-luxury resorts are setting new standards for the industry. They prove that true luxury lies not just in material comfort, but in the responsible stewardship of our planet's precious resources.</p>
    `,
    tags: ["Sustainable Travel", "Eco-Luxury", "Green Resorts", "Conservation", "Luxury Travel"]
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
