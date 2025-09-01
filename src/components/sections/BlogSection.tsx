"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

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

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog data from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog');
        const result = await response.json();

        if (result.success) {
          // Filter only published blogs and take first 4 for homepage
          const publishedBlogs = result.data.filter((blog: BlogPost) => blog.isPublished).slice(0, 4);
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

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center mb-12">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Blogs</h3>
            <p className="text-red-600">{error}</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center mb-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Blogs Available</h3>
            <p className="text-gray-500">Check back soon for new travel stories and insights.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {blogPosts.map((post) => (
              <Card key={post._id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{formatDate(post.createdAt)}</span>
                    <span>•</span>
                    <span>{calculateReadTime(post.content)}</span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-yellow-600 font-semibold hover:text-yellow-700 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

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
};


