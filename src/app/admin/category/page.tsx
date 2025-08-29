"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ICategory } from "@/types/category";
import { Plus, Edit, Trash2, Search, ImageIcon } from "lucide-react";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
    });
    setEditingCategory(null);
  };

  // Function to generate unique slug from category name
  const generateUniqueSlug = async (
    name: string,
    excludeId?: string
  ): Promise<string> => {
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "") // Remove special characters
      .replace(/[\s_-]+/g, "-") // Replace spaces, underscores, and multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

    if (!baseSlug) return "";

    let slug = baseSlug;
    let counter = 1;

    while (true) {
      try {
        // Check if slug exists in database
        const response = await fetch(
          `/api/category/check-slug?slug=${slug}${excludeId ? `&excludeId=${excludeId}` : ""}`
        );
        const data = await response.json();

        if (!data.exists) {
          return slug;
        }

        // If slug exists, try with counter
        slug = `${baseSlug}-${counter}`;
        counter++;
      } catch (error) {
        console.error("Error checking slug:", error);
        // If API call fails, fall back to local check
        const localExists = categories.some(
          (cat) => cat.slug === slug && cat._id?.toString() !== excludeId
        );
        if (!localExists) {
          return slug;
        }
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }
  };

  // Auto-generate slug when category name changes (only for new categories)
  useEffect(() => {
    if (!editingCategory && formData.name.trim()) {
      const generateSlugForForm = async () => {
        try {
          const generatedSlug = await generateUniqueSlug(formData.name);
          setFormData((prev) => ({ ...prev, slug: generatedSlug }));
        } catch (error) {
          console.error("Error generating slug:", error);
        }
      };
      generateSlugForForm();
    }
  }, [formData.name, editingCategory]);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }

    const submitData = async () => {
      try {
        // Generate unique slug if not editing
        const slug = editingCategory
          ? formData.slug
          : await generateUniqueSlug(formData.name);

        const dataToSend = {
          ...formData,
          slug,
        };

        const url = editingCategory
          ? `/api/category/${editingCategory._id}`
          : "/api/category";
        const method = editingCategory ? "PUT" : "POST";

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });

        const data = await response.json();

        if (response.ok) {
          fetchCategories();
          setShowForm(false);
          resetForm();
        } else {
          alert(data.error || "Error saving category");
        }
      } catch (error) {
        console.error("Error saving category:", error);
        alert("Error saving category");
      }
    };

    submitData();
  }
  function handleDelete(id: string): void {
    if (confirm("Are you sure you want to delete this category?")) {
      const deleteData = async () => {
        try {
          const response = await fetch(`/api/category/${id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            fetchCategories();
          } else {
            const data = await response.json();
            alert(data.error || "Error deleting category");
          }
        } catch (error) {
          console.error("Error deleting category:", error);
          alert("Error deleting category");
        }
      };

      deleteData();
    }
  }

  function handleEdit(category: ICategory): void {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
    });
    setShowForm(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Category Management
        </h1>
        <Button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search categories..."
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
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
<<<<<<< HEAD
=======
                Category
              </label>
              <select
              title="Select Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={String(cat._id)} value={String(cat._id)}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
>>>>>>> ea594390fe29d7e10bade4e50b53cdaf9c7fe4e1
                Category Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Enter category name"
              />
              <p className="text-xs text-gray-500 mt-1">
                Category name must be unique
              </p>
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
                placeholder="category-slug"
                readOnly={!editingCategory} // Only editable when editing existing category
              />
              <p className="text-xs text-gray-500 mt-1">
                URL-friendly version of the category name
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit">
                {editingCategory ? "Update Category" : "Create Category"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[500px] w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                Slug
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                Created
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <tr key={String(category._id)} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-semibold text-gray-900">
                  {category.name}
                </td>
                <td className="px-4 py-2 text-gray-600 text-sm">
                  {category.slug}
                </td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {new Date(category.createdAt || "").toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(String(category._id))}
                      className="text-red-600 hover:text-red-900 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No categories found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? "Try adjusting your search terms."
              : "Get started by creating a new category."}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCategoryPage;
