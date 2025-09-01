import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Share2, Eye, Heart, Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Fetch blog data from backend
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${slug}`, {
      cache: 'no-store' // Ensure fresh data
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogPost(id);

  if (!blog) {
    return {
      title: 'Blog Not Found | TripLink Adventures',
    };
  }

  return {
    title: `${blog.title} | TripLink Adventures`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlogPost(id);

  if (!blog) {
    notFound();
  }

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate read time (rough estimate: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen overflow-hidden">
        {/* Enhanced Background with Multiple Layers */}
        <div className="absolute inset-0">
          <Image
            src={blog.featuredImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"}
            alt={blog.title}
            fill
            className="object-cover object-center scale-105"
            priority={true}
          />
        </div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-500" />

        {/* Hero Content with Enhanced Layout */}
        <div className="relative z-10 flex items-center min-h-screen">
          <Container className="py-20">
            <div className="max-w-5xl mx-auto text-center text-white">
              {/* Enhanced Back to Blog Link */}
              <div className="text-left mb-16">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-3 text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-lg font-medium hover:scale-105 transform"
                >
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full group-hover:bg-white/20 transition-all duration-300">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                  <span className="relative">
                    Back to Blog
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </div>

              {/* Enhanced Category Badge */}
              <div className="mb-10">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm font-bold rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                  {blog.category.toUpperCase()}
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                </span>
              </div>

              {/* Enhanced Title */}
              <h1 className="text-5xl md:text-7xl font-black mb-10 leading-tight drop-shadow-2xl bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">
                {blog.title}
              </h1>

              {/* Enhanced Excerpt */}
              <div className="mb-12">
                <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light">
                  {blog.excerpt}
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-6 rounded-full"></div>
              </div>

              {/* Enhanced Metadata Cards */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-12">
                <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-2 bg-yellow-400/20 rounded-full">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                  </div>
                  <span className="font-medium">{formatDate(blog.createdAt)}</span>
                </div>

                <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-2 bg-blue-400/20 rounded-full">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="font-medium">{calculateReadTime(blog.content)}</span>
                </div>

                <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-2 bg-green-400/20 rounded-full">
                    <User className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="font-medium">TripLink Team</span>
                </div>

                <div className="group flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-2 bg-purple-400/20 rounded-full">
                    <Eye className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="font-medium">{blog.views || 0} views</span>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Enhanced Article Content Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <Container className="relative z-10">
          {/* Featured Image with Enhanced Styling */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="relative group">
              <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
                <Image
                  src={blog.featuredImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80 animate-bounce delay-100"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-orange-400 rounded-full opacity-80 animate-bounce delay-300"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-pink-400 rounded-full opacity-80 animate-bounce delay-500"></div>
            </div>
          </div>

          {/* Enhanced Article Content */}
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700 text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                Article Content
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced Prose Content */}
            <div className="bg-white rounded-2xl shadow-xl shadow-yellow-100/50 border border-gray-100 p-8 md:p-12 mb-12">
              <div
                className="prose prose-xl prose-yellow max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-a:text-yellow-600 prose-a:hover:text-yellow-700 prose-blockquote:border-l-yellow-500 prose-blockquote:bg-yellow-50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Enhanced Tags Section */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12 border border-yellow-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yellow-500 rounded-full">
                    <Bookmark className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Related Topics</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="group inline-flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 hover:text-white transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md border border-gray-200 hover:border-yellow-500"
                    >
                      <span className="text-yellow-500 group-hover:text-white">#</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Share & Actions Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-medium">Share this article:</span>
                  <div className="flex gap-3">
                    <button className="group flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      Share
                    </button>
                    <button className="group flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                      <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      Like
                    </button>
                  </div>
                </div>

                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-3 text-yellow-600 hover:text-yellow-700 font-semibold transition-all duration-300 hover:scale-105"
                >
                  <div className="p-2 bg-yellow-50 rounded-full group-hover:bg-yellow-100 transition-colors duration-300">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <span className="relative">
                    Back to All Articles
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </div>
            </div>

            {/* Reading Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 ease-out"></div>
            </div>
          </article>
        </Container>
      </div>
      <Footer />
    </>
  );
}
