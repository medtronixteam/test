"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import PreviewRightBar from "../createPost/PreviewRightBar";

const Step5 = () => {
  const [formData, setFormData] = useState({
    adName: "",
    businessName: "",
    websiteURL: "",
    description: "",
    images: [], 
  });

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const uploaded = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploaded],
      }));
    }
  };

  // Remove image
  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold my-4">Design</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* LEFT FORM SECTION */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-[16px] text-[#A7A7A7] mb-2">
                Ad Name
              </label>
              <input
                name="adName"
                value={formData.adName}
                onChange={handleChange}
                placeholder="Type here..."
                className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
              />
            </div>
            <div>
              <label className="block text-[16px] text-[#A7A7A7] mb-2">
                Business Name
              </label>
              <input
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Type here..."
                className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-[16px] text-[#A7A7A7] mb-2">
              Website URL
            </label>
            <input
              name="websiteURL"
              value={formData.websiteURL}
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[16px] text-[#A7A7A7] mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Type here..."
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <h3 className="text-md font-medium">Multimedia</h3>
            <p className="text-zinc-400">Upload one or more images</p>

            <div className="mt-4 flex flex-wrap gap-3">
              {/* Hidden file input */}
              <input
                type="file"
                id="fileUpload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              {/* Custom plus button */}
              <label
                htmlFor="fileUpload"
                className="w-[80px] h-[80px] border-2 border-dashed border-[#3570BC] rounded-[8px] bg-[#26292F] flex justify-center items-center hover:bg-[#2e3238] cursor-pointer"
              >
                <Plus size={32} className="text-[#3570BC]" />
              </label>

              {/* Image Previews */}
              {formData.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index}`}
                    className="w-[80px] h-[80px] rounded-[8px] object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -top-2 -right-2 bg-[#3570BC] text-white rounded-full p-[2px] hover:bg-blue-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <PreviewRightBar
            selectedPlatforms={["facebook"]} 
            postTypes={["Post"]} 
            setActivePlatform={["Post"]}
            activePlatform={"facebook"}
            type={"campaign"}
          />
        </div>
      </div>
    </div>
  );
};

export default Step5;
