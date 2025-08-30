"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { X, ImageIcon, Plus } from "lucide-react";

interface MultipleImageUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  label: string;
  required?: boolean;
  folder?: string;
  className?: string;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  value = [],
  onChange,
  label,
  required = false,
  folder = "triplink",
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>(value || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Validate files
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        alert("Please select only image files");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("Each file size must be less than 5MB");
        return;
      }
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        return data.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newPreviews = [...previews, ...uploadedUrls];
      setPreviews(newPreviews);
      onChange(newPreviews);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onChange(newPreviews);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && "*"}
      </label>

      {/* Image Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {previews.map((url, index) => (
            <div key={index} className="relative group">
              <Image
                src={url}
                alt={`Gallery image ${index + 1}`}
                width={150}
                height={100}
                className="w-full h-24 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              Uploading...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add Images
            </>
          )}
        </Button>

        {previews.length === 0 && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <ImageIcon className="h-4 w-4" />
            No images uploaded
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default MultipleImageUpload;
