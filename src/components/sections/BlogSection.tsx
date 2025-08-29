import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Bali That Even Celebrities Love",
    excerpt: "Discover the secluded spots in Bali where A-listers escape the paparazzi and find true peace.",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "destinations",
    readTime: "5 min read",
    date: "August 25, 2025"
  },
  {
    id: 2,
    title: "Ultimate Guide to Luxury Safari in Kenya",
    excerpt: "Experience the wild in style with our comprehensive guide to Kenya's most exclusive safari experiences.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "luxury",
    readTime: "7 min read",
    date: "August 22, 2025"
  },
  {
    id: 3,
    title: "Cultural Immersion: Beyond the Tourist Trail in Japan",
    excerpt: "Step off the beaten path and discover authentic Japanese culture through local experiences.",
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "culture",
    readTime: "6 min read",
    date: "August 20, 2025"
  },
  {
    id: 4,
    title: "Packing Like a Pro: Celebrity Travel Secrets Revealed",
    excerpt: "Learn the insider tips and tricks that celebrities use to pack efficiently for any trip.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    category: "tips",
    readTime: "4 min read",
    date: "August 18, 2025"
  }
];

export function BlogSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Stories & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing destinations, travel tips, and insider stories from our expert team
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-yellow-600 font-semibold hover:text-yellow-700 transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/blog">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              View All Blogs →
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
