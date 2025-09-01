"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/sections/Footer";

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

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Blog categories
  const categories = [
    { id: "all", name: "All Articles" },
    { id: "destinations", name: "Destinations" },
    { id: "tips", name: "Travel Tips" },
    { id: "luxury", name: "Luxury Travel" },
    { id: "culture", name: "Local Culture" },
  ];

  // Fetch blog data from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        const result = await response.json();

        if (result.success) {
          // Filter only published blogs
          const publishedBlogs = result.data.filter((blog: BlogPost) => blog.isPublished);
          setBlogPosts(publishedBlogs);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err) {
        setError('Error fetching blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter posts based on selected category
  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category.toLowerCase() === activeCategory);

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

  // Get featured post (most recent published blog)
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-yellow-50 to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Travel Insights & Stories
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover expert tips, hidden destinations, and luxury travel
              inspiration from around the world
            </p>
            <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <Container className="py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-yellow-500 text-white shadow-lg shadow-yellow-200"
                  : "bg-white text-gray-700 border border-yellow-200 hover:bg-yellow-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </Container>

      {/* Featured Post */}
      <Container className="mb-16">
        {loading ? (
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-yellow-100/50 border border-yellow-200/60 animate-pulse">
            <div className="md:flex">
              <div className="md:flex-1 h-80 md:h-auto bg-gray-200"></div>
              <div className="md:flex-1 p-8 md:p-12">
                <div className="h-6 bg-gray-200 rounded-full mb-4 w-24"></div>
                <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded mb-6 w-4/6"></div>
                <div className="h-4 bg-gray-200 rounded mb-6 w-32"></div>
                <div className="h-10 bg-gray-200 rounded-full w-40"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Blogs</h3>
            <p className="text-red-600">{error}</p>
          </div>
        ) : featuredPost ? (
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-yellow-100/50 border border-yellow-200/60">
            <div className="md:flex">
              <div className="md:flex-1 relative h-80 md:h-auto">
                <Image
                  src={featuredPost.featuredImage || "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60" />
              </div>
              <div className="md:flex-1 p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-4">
                  FEATURED
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>{formatDate(featuredPost.createdAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{calculateReadTime(featuredPost.content)}</span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  Read Full Article →
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Featured Blog</h3>
            <p className="text-gray-500">No published blogs available at the moment.</p>
          </div>
        )}
      </Container>

      {/* Blog Grid */}
      <Container className="pb-16">
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <article key={index} className="bg-white rounded-xl overflow-hidden shadow-md shadow-yellow-100/30 border border-yellow-200/40 animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </article>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Blogs</h3>
            <p className="text-red-600">{error}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Blogs Found</h3>
            <p className="text-gray-500">
              {activeCategory === "all"
                ? "No published blogs available at the moment."
                : `No blogs found in the "${categories.find(cat => cat.id === activeCategory)?.name}" category.`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl overflow-hidden shadow-md shadow-yellow-100/30 border border-yellow-200/40 hover:shadow-lg hover:shadow-yellow-100/50 transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={post.featuredImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-white text-yellow-700 text-xs font-medium rounded-full capitalize">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <span>{formatDate(post.createdAt)}</span>
                    <span>{calculateReadTime(post.content)}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-yellow-600 font-semibold hover:text-yellow-700 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button - Only show if there are blogs and not loading */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-200">
              Load More Articles
            </button>
          </div>
        )}
      </Container>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-16 border-t border-b border-yellow-200">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Never Miss a Travel Story
            </h2>
            <p className="text-gray-600 mb-8">
              Join our community of luxury travelers and receive exclusive
              content, tips, and early access to new destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
