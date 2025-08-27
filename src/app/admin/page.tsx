"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Mountain,
  Tag,
  Package,
  FileText,
  TrendingUp,
  Plus,
  Star
} from 'lucide-react';

interface DashboardStats {
  adventures: {
    total: number;
    popular: number;
    recent: any[];
  };
  categories: {
    total: number;
    recent: any[];
  };
  packages: {
    total: number;
    trending: number;
    recent: any[];
  };
  blogs: {
    total: number;
    published: number;
    draft: number;
    recent: any[];
  };
}

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    adventures: { total: 0, popular: 0, recent: [] },
    categories: { total: 0, recent: [] },
    packages: { total: 0, trending: 0, recent: [] },
    blogs: { total: 0, published: 0, draft: 0, recent: [] }
  });
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  // Check authentication first
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        if (!response.ok) {
          router.push('/admin-login');
          return;
        }
        setAuthLoading(false);
      } catch {
        router.push('/admin-login');
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!authLoading) {
      fetchDashboardStats();
    }
  }, [authLoading]);

  const fetchDashboardStats = async () => {
    try {
      const [adventuresRes, categoriesRes, packagesRes, blogsRes] = await Promise.all([
        fetch('/api/adventure'),
        fetch('/api/category'),
        fetch('/api/pakage'),
        fetch('/api/blog')
      ]);

      const [adventuresData, categoriesData, packagesData, blogsData] = await Promise.all([
        adventuresRes.json(),
        categoriesRes.json(),
        packagesRes.json(),
        blogsRes.json()
      ]);

      if (adventuresData.success && categoriesData.success && packagesData.success && blogsData.success) {
        const adventures = adventuresData.data;
        const categories = categoriesData.data;
        const packages = packagesData.data;
        const blogs = blogsData.data;

        setStats({
          adventures: {
            total: adventures.length,
            popular: adventures.filter((adv: any) => adv.isPopular).length,
            recent: adventures.slice(0, 5)
          },
          categories: {
            total: categories.length,
            recent: categories.slice(0, 5)
          },
          packages: {
            total: packages.length,
            trending: packages.filter((pkg: any) => pkg.trending).length,
            recent: packages.slice(0, 5)
          },
          blogs: {
            total: blogs.length,
            published: blogs.filter((blog: any) => blog.isPublished).length,
            draft: blogs.filter((blog: any) => !blog.isPublished).length,
            recent: blogs.slice(0, 5)
          }
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s an overview of your content.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Adventures Stats */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Adventures</p>
              <p className="text-3xl font-bold text-gray-900">{stats.adventures.total}</p>
              <p className="text-sm text-green-600 mt-1">
                {stats.adventures.popular} popular
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Mountain className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/adventure">
              <Button size="sm" variant="outline" className="w-full">
                Manage Adventures
              </Button>
            </Link>
          </div>
        </Card>

        {/* Categories Stats */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Categories</p>
              <p className="text-3xl font-bold text-gray-900">{stats.categories.total}</p>
              <p className="text-sm text-blue-600 mt-1">
                Well organized
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Tag className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/category">
              <Button size="sm" variant="outline" className="w-full">
                Manage Categories
              </Button>
            </Link>
          </div>
        </Card>

        {/* Packages Stats */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Packages</p>
              <p className="text-3xl font-bold text-gray-900">{stats.packages.total}</p>
              <p className="text-sm text-yellow-600 mt-1">
                {stats.packages.trending} trending
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/pakage">
              <Button size="sm" variant="outline" className="w-full">
                Manage Packages
              </Button>
            </Link>
          </div>
        </Card>

        {/* Blogs Stats */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Blog Posts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.blogs.total}</p>
              <p className="text-sm text-gray-600 mt-1">
                {stats.blogs.published} published, {stats.blogs.draft} draft
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/blog">
              <Button size="sm" variant="outline" className="w-full">
                Manage Blogs
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Adventures */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Adventures</h2>
            <Link href="/admin/adventure">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {stats.adventures.recent.length > 0 ? (
              stats.adventures.recent.map((adventure: any) => (
                <div key={adventure._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {adventure.image ? (
                      <Image
                        src={adventure.image}
                        alt={adventure.destination}
                        width={60}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-15 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Mountain className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {adventure.destination}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {adventure.duration}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {adventure.isPopular && (
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      ${adventure.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Mountain className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No adventures yet</p>
                <Link href="/admin/adventure">
                  <Button size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Add First Adventure
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Packages */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Packages</h2>
            <Link href="/admin/pakage">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {stats.packages.recent.length > 0 ? (
              stats.packages.recent.map((pkg: any) => (
                <div key={pkg._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {pkg.heroImage ? (
                      <Image
                        src={pkg.heroImage}
                        alt={pkg.name}
                        width={60}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-15 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {pkg.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {pkg.region} • {pkg.duration}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {pkg.trending && (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No packages yet</p>
                <Link href="/admin/pakage">
                  <Button size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Add First Package
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Recent Blog Posts */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Blog Posts</h2>
            <Link href="/admin/blog">
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {stats.blogs.recent.length > 0 ? (
              stats.blogs.recent.map((blog: any) => (
                <div key={blog._id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {blog.featuredImage ? (
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        width={60}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-15 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {blog.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {blog.category} • {blog.views} views
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      blog.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">No blog posts yet</p>
                <Link href="/admin/blog">
                  <Button size="sm" className="mt-2">
                    <Plus className="h-4 w-4 mr-1" />
                    Add First Blog Post
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/adventure">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Mountain className="h-6 w-6" />
                <span className="text-sm">Add Adventure</span>
              </Button>
            </Link>
            <Link href="/admin/category">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Tag className="h-6 w-6" />
                <span className="text-sm">Add Category</span>
              </Button>
            </Link>
            <Link href="/admin/pakage">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <Package className="h-6 w-6" />
                <span className="text-sm">Add Package</span>
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Add Blog Post</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Content Overview */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.adventures.total + stats.packages.total}</div>
            <div className="text-sm text-gray-600">Total Travel Content</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.adventures.popular + stats.packages.trending}</div>
            <div className="text-sm text-gray-600">Featured Content</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.blogs.published}</div>
            <div className="text-sm text-gray-600">Published Articles</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
