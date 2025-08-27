"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { Container } from "@/components/ui/Container";
import { Footer } from "@/components/sections/Footer";

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Blog categories
  const categories = [
    { id: "all", name: "All Articles" },
    { id: "destinations", name: "Destinations" },
    { id: "tips", name: "Travel Tips" },
    { id: "luxury", name: "Luxury Travel" },
    { id: "culture", name: "Local Culture" },
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "10 Hidden Gems in Bali That Even Celebrities Love",
      excerpt:
        "Discover the secluded spots in Bali where A-listers escape the paparazzi and find true peace.",
      image:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "destinations",
      date: "May 15, 2023",
      readTime: "6 min read",
    },
    {
      id: 2,
      title: "Packing Like a Star: Celebrity Travel Essentials",
      excerpt:
        "Learn what your favorite celebrities never travel without and how to pack efficiently for luxury trips.",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80",
      category: "tips",
      date: "April 28, 2023",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "The Most Exclusive Private Islands for Your Next Getaway",
      excerpt:
        "From Richard Branson's Necker Island to hidden Indonesian paradises, explore the world's most luxurious private islands.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "luxury",
      date: "April 12, 2023",
      readTime: "10 min read",
    },
    {
      id: 4,
      title: "How to Experience Local Culture Like a True Traveler",
      excerpt:
        "Move beyond tourist traps and discover authentic cultural experiences that will transform your travels.",
      image:
        "https://images.unsplash.com/photo-1553659971-f01207815908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "culture",
      date: "March 30, 2023",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "The French Riviera's Best Kept Secrets",
      excerpt:
        "Explore the hidden corners of the Côte d'Azur that offer glamour without the crowds.",
      image:
        "https://images.unsplash.com/photo-1503918886996-8e5c6c0ad951?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "destinations",
      date: "March 18, 2023",
      readTime: "9 min read",
    },
    {
      id: 6,
      title:
        "Sustainable Luxury: Eco-Friendly Resorts That Don't Compromise on Comfort",
      excerpt:
        "Discover how luxury and sustainability can coexist at these breathtaking eco-resorts around the world.",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "luxury",
      date: "February 25, 2023",
      readTime: "11 min read",
    },
  ];

  // Filter posts based on selected category
  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

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
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-yellow-100/50 border border-yellow-200/60">
          <div className="md:flex">
            <div className="md:flex-1 relative h-80 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="Featured travel destination"
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
                The Art of Slow Travel: Embracing the Journey
              </h2>
              <p className="text-gray-600 mb-6">
                In our fast-paced world, the concept of slow travel has emerged
                as a luxurious alternative. It&apos;s not just about the destination,
                but about immersing yourself in the experience, the culture, and
                the moments in between. Discover how to travel deeper rather
                than faster.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>June 2, 2023</span>
                <span className="mx-2">•</span>
                <span>12 min read</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Blog Grid */}
      <Container className="pb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md shadow-yellow-100/30 border border-yellow-200/40 hover:shadow-lg hover:shadow-yellow-100/50 transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
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
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-200">
            Load More Articles
          </button>
        </div>
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
