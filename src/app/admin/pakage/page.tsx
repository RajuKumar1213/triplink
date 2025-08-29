"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import ImageUpload from "@/components/ui/ImageUpload";
import MultipleImageUpload from "@/components/ui/MultipleImageUpload";
import { IPackage, Itinerary, Pricing, FAQ } from "@/types/package";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MapPin,
  Calendar,
  Mountain,
  Star,
  ImageIcon,
} from "lucide-react";

const AdminPackagePage = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [categories, setCategories] = useState<
    { name: string; slug: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<IPackage | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    region: "",
    shortTagline: "",
    heroImage: "",
    gallery: [] as string[],
    duration: "",
    difficulty: "",
    altitude: "",
    bestSeason: "",
    overview: "",
    highlights: "",
    inclusions: "",
    exclusions: "",
    bookingNote: "",
    trending: false,
    icon: "",
    itinerary: [] as Itinerary[],
    pricing: [] as Pricing[],
    faqs: [] as FAQ[],
    category: "",
  });

  useEffect(() => {
    fetchPackages();
    fetchCategories();
  }, []);

  // Auto-generate slug when package name changes (only for new packages)
  useEffect(() => {
    if (!editingPackage && formData.name.trim()) {
      const generatedSlug = generateSlug(formData.name);
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, editingPackage]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/pakage");
      const data = await response.json();
      if (data.success) {
        setPackages(data.data);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate slug from package name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Generate slug from package name if not editing
      const slug = editingPackage ? formData.slug : generateSlug(formData.name);

      const data = {
        ...formData,
        slug, // Use the generated or existing slug
        overview: formData.overview
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item),
        highlights: formData.highlights
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item),
        inclusions: formData.inclusions
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item),
        exclusions: formData.exclusions
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item),
      };

      const url = editingPackage
        ? `/api/pakage/${editingPackage._id}`
        : "/api/pakage";
      const method = editingPackage ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
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
        alert(responseData.error.message || "Error saving package");
      }
    } catch (error) {
      console.error("Error saving package:", error);
      alert(alert);
    }
  };

  const handleEdit = (pkg: IPackage) => {
    setEditingPackage(pkg);
    setFormData({
      slug: pkg.slug,
      name: pkg.name,
      region: pkg.region || "",
      shortTagline: pkg.shortTagline || "",
      heroImage: pkg.heroImage || "",
      gallery: pkg.gallery,
      duration: pkg.duration || "",
      difficulty: pkg.difficulty || "",
      altitude: pkg.altitude || "",
      bestSeason: pkg.bestSeason || "",
      overview: pkg.overview.join("\n"),
      highlights: pkg.highlights.join("\n"),
      inclusions: pkg.inclusions.join("\n"),
      exclusions: pkg.exclusions.join("\n"),
      bookingNote: pkg.bookingNote || "",
      trending: pkg.trending,
      icon: pkg.icon || "",
      itinerary: pkg.itinerary,
      pricing: pkg.pricing,
      faqs: pkg.faqs,
      category: pkg.category || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      try {
        const response = await fetch(`/api/pakage/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchPackages();
        } else {
          const data = await response.json();
          alert(data.message || "Error deleting package");
        }
      } catch (error) {
        console.error("Error deleting package:", error);
        alert("Error deleting package");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      slug: "",
      name: "",
      region: "",
      shortTagline: "",
      heroImage: "",
      gallery: [],
      duration: "",
      difficulty: "",
      altitude: "",
      bestSeason: "",
      overview: "",
      highlights: "",
      inclusions: "",
      exclusions: "",
      bookingNote: "",
      trending: false,
      icon: "",
      itinerary: [],
      pricing: [],
      faqs: [],
      category: "",
    });
    setActiveTab("basic");
  };

  const tabs = ["basic", "details", "itinerary", "pricing", "faqs"];

  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [
        ...formData.itinerary,
        {
          day: formData.itinerary.length + 1,
          title: "",
          description: "",
          activities: [],
        },
      ],
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
      itinerary: formData.itinerary.filter((_, i) => i !== index),
    });
  };

  const addPricingOption = () => {
    setFormData({
      ...formData,
      pricing: [
        ...formData.pricing,
        { label: "", price: 0, originalPrice: 0, includes: [], notes: "" },
      ],
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
      pricing: formData.pricing.filter((_, i) => i !== index),
    });
  };

  const addFAQ = () => {
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: "", answer: "" }],
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
      faqs: formData.faqs.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Package Management</h1>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
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
            {editingPackage ? "Edit Package" : "Add New Package"}
          </h2>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Tab */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      title="Select Category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Package Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Package Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug (Auto-generated from name)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="package-slug"
                      readOnly={!editingPackage} // Only editable when editing existing package
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Region
                    </label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) =>
                        setFormData({ ...formData, region: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shortTagline: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Brief description"
                    />
                  </div>
                  <div>
                    <ImageUpload
                      value={formData.heroImage}
                      onChange={(url) =>
                        setFormData({ ...formData, heroImage: url })
                      }
                      label="Hero Image"
                      required
                    />
                  </div>
                  <div>
                    <ImageUpload
                      value={formData.icon}
                      onChange={(url) =>
                        setFormData({ ...formData, icon: url })
                      }
                      label="Icon"
                      required
                    />
                  </div>
                </div>

                <div>
                  <MultipleImageUpload
                    value={formData.gallery}
                    onChange={(urls) =>
                      setFormData({ ...formData, gallery: urls })
                    }
                    label="Gallery Images"
                    folder="packages"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="trending"
                    checked={formData.trending}
                    onChange={(e) =>
                      setFormData({ ...formData, trending: e.target.checked })
                    }
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="trending"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Mark as Trending Package
                  </label>
                </div>
              </div>
            )}

            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, difficulty: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, altitude: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, bestSeason: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, overview: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, highlights: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, inclusions: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, exclusions: e.target.value })
                      }
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
                    onChange={(e) =>
                      setFormData({ ...formData, bookingNote: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Important booking information..."
                  />
                </div>
              </div>
            )}

            {/* Itinerary Tab */}
            {activeTab === "itinerary" && (
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
                        onChange={(e) =>
                          updateItineraryDay(index, "title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Day description"
                        value={day.description}
                        onChange={(e) =>
                          updateItineraryDay(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Activities (one per line)"
                        value={day.activities.join("\n")}
                        onChange={(e) =>
                          updateItineraryDay(
                            index,
                            "activities",
                            e.target.value.split("\n").filter((a) => a.trim())
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
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
                      <h4 className="font-medium">
                        Pricing Option {index + 1}
                      </h4>
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
                        onChange={(e) =>
                          updatePricingOption(index, "label", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={pricing.price}
                        onChange={(e) =>
                          updatePricingOption(
                            index,
                            "price",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Original Price (optional)"
                        value={pricing.originalPrice || ""}
                        onChange={(e) =>
                          updatePricingOption(
                            index,
                            "originalPrice",
                            parseFloat(e.target.value) || undefined
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <div className="md:col-span-2">
                        <textarea
                          placeholder="Includes (one per line)"
                          value={pricing.includes.join("\n")}
                          onChange={(e) =>
                            updatePricingOption(
                              index,
                              "includes",
                              e.target.value.split("\n").filter((i) => i.trim())
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <textarea
                          placeholder="Notes (optional)"
                          value={pricing.notes || ""}
                          onChange={(e) =>
                            updatePricingOption(index, "notes", e.target.value)
                          }
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
            {activeTab === "faqs" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    Frequently Asked Questions
                  </h3>
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
                        onChange={(e) =>
                          updateFAQ(index, "question", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) =>
                          updateFAQ(index, "answer", e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-6 items-center mt-6">
              <button
                type="button"
                onClick={goToPreviousTab}
                disabled={tabs.indexOf(activeTab) === 0}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {tabs.indexOf(activeTab) === tabs.length - 1 ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Creating..." : "Create Package"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goToNextTab}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </form>

          <div className="flex justify-end mt-4">
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
        </Card>
      )}

      {/* Mobile Card View (shown on small screens) */}
      <div className="md:hidden space-y-4">
        {filteredPackages.map((pkg) => (
          <Card key={pkg._id?.toString()} className="p-4">
            <div className="flex items-start space-x-4">
              {/* Package Image */}
              <div className="flex-shrink-0">
                {pkg.heroImage ? (
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.name}
                    width={80}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-20 h-15 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Package Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {pkg.name}
                    </h3>
                    {pkg.shortTagline && (
                      <p className="text-sm text-gray-600 truncate">
                        {pkg.shortTagline}
                      </p>
                    )}
                    <div className="mt-1 space-y-1">
                      {pkg.category && (
                        <span className="inline-block text-xs text-gray-500 capitalize">
                          {pkg.category.replace(/-/g, " ")}
                        </span>
                      )}
                      {pkg.region && (
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {pkg.region}
                        </div>
                      )}
                      {pkg.duration && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {pkg.duration}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-col space-y-1 ml-2">
                    {pkg.trending && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Trending
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                        pkg.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : pkg.difficulty === "Moderate"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pkg.difficulty || "Not set"}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                {pkg.pricing && pkg.pricing.length > 0 && (
                  <div className="mt-2 text-sm text-gray-900">
                    <span className="font-medium">
                      ${Math.min(...pkg.pricing.map((p) => p.price))} - $
                      {Math.max(...pkg.pricing.map((p) => p.price))}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({pkg.pricing.length} option
                      {pkg.pricing.length > 1 ? "s" : ""})
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(pkg)}
                    className="flex-1 text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(pkg._id?.toString() || "")}
                    className="flex-1 text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Packages Table (hidden on small screens) */}
      <div className="hidden md:block bg-white shadow-sm rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPackages.map((pkg) => (
                <tr key={pkg._id?.toString()} className="hover:bg-gray-50">
                  {/* Package Info */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {pkg.heroImage ? (
                          <Image
                            src={pkg.heroImage}
                            alt={pkg.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {pkg.name}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {pkg.category?.replace(/-/g, " ")}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Details */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {pkg.region && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate max-w-xs">
                            {pkg.region}
                          </span>
                        </div>
                      )}
                      {pkg.duration && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-3 w-3 mr-1" />
                          {pkg.duration}
                        </div>
                      )}
                      {pkg.pricing && pkg.pricing.length > 0 && (
                        <div className="text-sm font-medium text-gray-900">
                          ${Math.min(...pkg.pricing.map((p) => p.price))} - $
                          {Math.max(...pkg.pricing.map((p) => p.price))}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      {pkg.trending && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 w-fit">
                          <Star className="h-3 w-3 mr-1" />
                          Trending
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full w-fit ${
                          pkg.difficulty === "Easy"
                            ? "bg-green-100 text-green-800"
                            : pkg.difficulty === "Moderate"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {pkg.difficulty || "Not set"}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(pkg)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(pkg._id?.toString() || "")}
                        className="text-red-600 hover:text-red-900 p-1"
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
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <Mountain className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No packages found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Get started by creating a new package."}
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
