"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import ImageUpload from '@/components/ui/ImageUpload';
import { IPackage, Itinerary, Pricing, FAQ } from '@/types/package';
import { Plus, Edit, Trash2, Search, MapPin, Calendar, Mountain, Star, ImageIcon } from 'lucide-react';

const AdminPackagePage = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<IPackage | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    slug: '',
    name: '',
    region: '',
    shortTagline: '',
    heroImage: '',
    gallery: '',
    duration: '',
    difficulty: '',
    altitude: '',
    bestSeason: '',
    overview: '',
    highlights: '',
    inclusions: '',
    exclusions: '',
    bookingNote: '',
    trending: false,
    icon: '',
    itinerary: [] as Itinerary[],
    pricing: [] as Pricing[],
    faqs: [] as FAQ[]
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/pakage');
      const data = await response.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        gallery: formData.gallery.split('\n').map(url => url.trim()).filter(url => url),
        overview: formData.overview.split('\n').map(item => item.trim()).filter(item => item),
        highlights: formData.highlights.split('\n').map(item => item.trim()).filter(item => item),
        inclusions: formData.inclusions.split('\n').map(item => item.trim()).filter(item => item),
        exclusions: formData.exclusions.split('\n').map(item => item.trim()).filter(item => item)
      };

      const url = editingPackage ? `/api/pakage/${editingPackage._id}` : '/api/pakage';
      const method = editingPackage ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        fetchPackages();
        setShowForm(false);
        setEditingPackage(null);
        resetForm();
      } else {
        alert(responseData.message || 'Error saving package');
      }
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Error saving package');
    }
  };

  const handleEdit = (pkg: IPackage) => {
    setEditingPackage(pkg);
    setFormData({
      slug: pkg.slug,
      name: pkg.name,
      region: pkg.region || '',
      shortTagline: pkg.shortTagline || '',
      heroImage: pkg.heroImage || '',
      gallery: pkg.gallery.join('\n'),
      duration: pkg.duration || '',
      difficulty: pkg.difficulty || '',
      altitude: pkg.altitude || '',
      bestSeason: pkg.bestSeason || '',
      overview: pkg.overview.join('\n'),
      highlights: pkg.highlights.join('\n'),
      inclusions: pkg.inclusions.join('\n'),
      exclusions: pkg.exclusions.join('\n'),
      bookingNote: pkg.bookingNote || '',
      trending: pkg.trending,
      icon: pkg.icon || '',
      itinerary: pkg.itinerary,
      pricing: pkg.pricing,
      faqs: pkg.faqs
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      try {
        const response = await fetch(`/api/pakage/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPackages();
        } else {
          const data = await response.json();
          alert(data.message || 'Error deleting package');
        }
      } catch (error) {
        console.error('Error deleting package:', error);
        alert('Error deleting package');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      name: '',
      region: '',
      shortTagline: '',
      heroImage: '',
      gallery: '',
      duration: '',
      difficulty: '',
      altitude: '',
      bestSeason: '',
      overview: '',
      highlights: '',
      inclusions: '',
      exclusions: '',
      bookingNote: '',
      trending: false,
      icon: '',
      itinerary: [],
      pricing: [],
      faqs: []
    });
    setActiveTab('basic');
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { day: formData.itinerary.length + 1, title: '', description: '', activities: [] }]
    });
  };

  const updateItineraryDay = (index: number, field: string, value: any) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  const removeItineraryDay = (index: number) => {
    setFormData({
      ...formData,
      itinerary: formData.itinerary.filter((_, i) => i !== index)
    });
  };

  const addPricingOption = () => {
    setFormData({
      ...formData,
      pricing: [...formData.pricing, { label: '', price: 0, originalPrice: 0, includes: [], notes: '' }]
    });
  };

  const updatePricingOption = (index: number, field: string, value: any) => {
    const updatedPricing = [...formData.pricing];
    updatedPricing[index] = { ...updatedPricing[index], [field]: value };
    setFormData({ ...formData, pricing: updatedPricing });
  };

  const removePricingOption = (index: number) => {
    setFormData({
      ...formData,
      pricing: formData.pricing.filter((_, i) => i !== index)
    });
  };

  const addFAQ = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: '', answer: '' }]
    });
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    const updatedFAQs = [...formData.faqs];
    updatedFAQs[index] = { ...updatedFAQs[index], [field]: value };
    setFormData({ ...formData, faqs: updatedFAQs });
  };

  const removeFAQ = (index: number) => {
    setFormData({
      ...formData,
      faqs: formData.faqs.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Package
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search packages..."
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
            {editingPackage ? 'Edit Package' : 'Add New Package'}
          </h2>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            {['basic', 'details', 'itinerary', 'pricing', 'faqs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="unique-package-slug"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Package Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Package Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Region
                    </label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="e.g., Himalayas, Alps"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Short Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.shortTagline}
                      onChange={(e) => setFormData({...formData, shortTagline: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Brief description"
                    />
                  </div>
                  <div>
                    <ImageUpload
                      value={formData.heroImage}
                      onChange={(url) => setFormData({...formData, heroImage: url})}
                      label="Hero Image"
                      required
                    />
                  </div>
                  <div>
                    <ImageUpload
                      value={formData.icon}
                      onChange={(url) => setFormData({...formData, icon: url})}
                      label="Icon"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gallery Images (one URL per line)
                  </label>
                  <textarea
                    value={formData.gallery}
                    onChange={(e) => setFormData({...formData, gallery: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="trending"
                    checked={formData.trending}
                    onChange={(e) => setFormData({...formData, trending: e.target.checked})}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label htmlFor="trending" className="ml-2 block text-sm text-gray-900">
                    Mark as Trending Package
                  </label>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="e.g., 7 Days 6 Nights"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      title="Select difficulty level"
                    >
                      <option value="">Select Difficulty</option>
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Challenging">Challenging</option>
                      <option value="Extreme">Extreme</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Altitude
                    </label>
                    <input
                      type="text"
                      value={formData.altitude}
                      onChange={(e) => setFormData({...formData, altitude: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="e.g., 4,200m - 6,100m"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Best Season
                    </label>
                    <input
                      type="text"
                      value={formData.bestSeason}
                      onChange={(e) => setFormData({...formData, bestSeason: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="e.g., March to May, September to November"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Overview (one point per line)
                    </label>
                    <textarea
                      value={formData.overview}
                      onChange={(e) => setFormData({...formData, overview: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Overview point 1&#10;Overview point 2&#10;Overview point 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Highlights (one point per line)
                    </label>
                    <textarea
                      value={formData.highlights}
                      onChange={(e) => setFormData({...formData, highlights: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Highlight 1&#10;Highlight 2&#10;Highlight 3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inclusions (one item per line)
                    </label>
                    <textarea
                      value={formData.inclusions}
                      onChange={(e) => setFormData({...formData, inclusions: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Accommodation&#10;Meals&#10;Guide&#10;Transportation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Exclusions (one item per line)
                    </label>
                    <textarea
                      value={formData.exclusions}
                      onChange={(e) => setFormData({...formData, exclusions: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="International flights&#10;Travel insurance&#10;Personal expenses"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Booking Note
                  </label>
                  <textarea
                    value={formData.bookingNote}
                    onChange={(e) => setFormData({...formData, bookingNote: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Important booking information..."
                  />
                </div>
              </div>
            )}

            {/* Itinerary Tab */}
            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Itinerary</h3>
                  <Button type="button" onClick={addItineraryDay} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Day
                  </Button>
                </div>

                {formData.itinerary.map((day, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Day {day.day}</h4>
                      <Button
                        type="button"
                        onClick={() => removeItineraryDay(index)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Day title"
                        value={day.title}
                        onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Day description"
                        value={day.description}
                        onChange={(e) => updateItineraryDay(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Activities (one per line)"
                        value={day.activities.join('\n')}
                        onChange={(e) => updateItineraryDay(index, 'activities', e.target.value.split('\n').filter(a => a.trim()))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Pricing Options</h3>
                  <Button type="button" onClick={addPricingOption} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Pricing Option
                  </Button>
                </div>

                {formData.pricing.map((pricing, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Pricing Option {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removePricingOption(index)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Label (e.g., Standard, Premium)"
                        value={pricing.label}
                        onChange={(e) => updatePricingOption(index, 'label', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={pricing.price}
                        onChange={(e) => updatePricingOption(index, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Original Price (optional)"
                        value={pricing.originalPrice || ''}
                        onChange={(e) => updatePricingOption(index, 'originalPrice', parseFloat(e.target.value) || undefined)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <div className="md:col-span-2">
                        <textarea
                          placeholder="Includes (one per line)"
                          value={pricing.includes.join('\n')}
                          onChange={(e) => updatePricingOption(index, 'includes', e.target.value.split('\n').filter(i => i.trim()))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <textarea
                          placeholder="Notes (optional)"
                          value={pricing.notes || ''}
                          onChange={(e) => updatePricingOption(index, 'notes', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* FAQs Tab */}
            {activeTab === 'faqs' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Frequently Asked Questions</h3>
                  <Button type="button" onClick={addFAQ} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add FAQ
                  </Button>
                </div>

                {formData.faqs.map((faq, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">FAQ {index + 1}</h4>
                      <Button
                        type="button"
                        onClick={() => removeFAQ(index)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t">
              <Button type="submit">
                {editingPackage ? 'Update Package' : 'Create Package'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingPackage(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <Card key={pkg._id?.toString()} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Package Image */}
              <div className="flex justify-center">
                {pkg.heroImage ? (
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.name}
                    width={200}
                    height={150}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-50 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Package Info */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {pkg.name}
                </h3>
                {pkg.shortTagline && (
                  <p className="text-gray-600 text-sm">
                    {pkg.shortTagline}
                  </p>
                )}
                <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                  {pkg.region && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {pkg.region}
                    </div>
                  )}
                  {pkg.duration && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {pkg.duration}
                    </div>
                  )}
                </div>
                {pkg.trending && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    Trending
                  </span>
                )}
                <div className="text-xs text-gray-500">
                  Created: {new Date(pkg.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(pkg)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(pkg._id?.toString() || '')}
                  className="flex-1 text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <Mountain className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No packages found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new package.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Package
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPackagePage;
