
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import ImageUpload from '@/components/ui/ImageUpload';
import { IAdventure } from '@/types/adventure';
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
}

const AdminAdventurePage = () => {
  const [adventures, setAdventures] = useState<IAdventure[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAdventure, setEditingAdventure] = useState<IAdventure | null>(null);
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    image: '',
    category: '',
    price: '',
    originalPrice: '',
    rating: '',
    reviews: '',
    features: '',
    discount: '',
    isPopular: false
  });

  useEffect(() => {
    fetchAdventures();
    fetchCategories();
  }, []);

  const fetchAdventures = async () => {
    try {
      const response = await fetch('/api/adventure');
      const data = await response.json();
      if (data.success) {
        setAdventures(data.data);
      }
    } catch (error) {
      console.error('Error fetching adventures:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        rating: parseFloat(formData.rating),
        reviews: parseInt(formData.reviews),
        features: formData.features.split(',').map(f => f.trim()),
        discount: parseFloat(formData.discount)
      };

      const url = editingAdventure ? `/api/adventure/${editingAdventure._id}` : '/api/adventure';
      const method = editingAdventure ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        fetchAdventures();
        setShowForm(false);
        setEditingAdventure(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving adventure:', error);
    }
  };

  const handleEdit = (adventure: IAdventure) => {
    setEditingAdventure(adventure);
    setFormData({
      destination: adventure.destination,
      duration: adventure.duration,
      image: adventure.image,
      category: adventure.category.toString(),
      price: adventure.price.toString(),
      originalPrice: adventure.originalPrice.toString(),
      rating: adventure.rating.toString(),
      reviews: adventure.reviews.toString(),
      features: adventure.features.join(', '),
      discount: adventure.discount.toString(),
      isPopular: adventure.isPopular
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this adventure?')) {
      try {
        const response = await fetch(`/api/adventure/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchAdventures();
        }
      } catch (error) {
        console.error('Error deleting adventure:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      destination: '',
      duration: '',
      image: '',
      category: '',
      price: '',
      originalPrice: '',
      rating: '',
      reviews: '',
      features: '',
      discount: '',
      isPopular: false
    });
  };

  const filteredAdventures = adventures.filter(adventure =>
    adventure.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adventure.duration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Adventure Management</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Adventure
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search adventures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingAdventure ? 'Edit Adventure' : 'Add New Adventure'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination *
                </label>
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Enter destination name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="e.g., 3 Days 2 Nights"
                />
              </div>
              <div>
                <ImageUpload
                  label="Adventure Image"
                  value={formData.image}
                  onChange={(url) => setFormData({...formData, image: url})}
                  required
                  folder="adventures"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  title="Select a category"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (0-5) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="4.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reviews *
                </label>
                <input
                  type="number"
                  required
                  value={formData.reviews}
                  onChange={(e) => setFormData({...formData, reviews: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (0-100) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.discount}
                  onChange={(e) => setFormData({...formData, discount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={formData.isPopular}
                  onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="isPopular" className="ml-2 block text-sm text-gray-900">
                  Popular Adventure
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features (comma-separated) *
              </label>
              <textarea
                required
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>
            <div className="flex gap-4">
              <Button type="submit">
                {editingAdventure ? 'Update Adventure' : 'Create Adventure'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingAdventure(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Adventures Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adventure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdventures.map((adventure) => (
                <tr key={adventure._id?.toString()} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <Image
                          className="h-12 w-12 rounded-lg object-cover"
                          src={adventure.image}
                          alt={adventure.destination}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {adventure.destination}
                        </div>
                        <div className="text-sm text-gray-500">
                          {adventure.duration}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {(adventure.category as any)?.name || 'No Category'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${adventure.price}
                      {adventure.discount > 0 && (
                        <span className="text-red-500 ml-2">
                          -{adventure.discount}%
                        </span>
                      )}
                    </div>
                    {adventure.discount > 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        ${adventure.originalPrice}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-900">
                        {adventure.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({adventure.reviews} reviews)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      adventure.isPopular
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {adventure.isPopular ? 'Popular' : 'Regular'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(adventure)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(adventure._id?.toString() || '')}
                        title="Delete"
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAdventures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No adventures found.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminAdventurePage;
