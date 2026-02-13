"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExploreColleges from '../../colegesearch';

const JobPostForm = () => {
  const router = useRouter();
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Field State
  const [heading, setHeading] = useState("");
  const [type, setType] = useState("Assignment");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [links, setLinks] = useState(['']);
  
  // Image State
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  // --- Image Handlers ---

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      
      // 1. Generate Preview URLs
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));

      // 2. Append to existing state (instead of replacing)
      setFiles((prev) => [...prev, ...newFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Link Handlers ---

  const handleAddLink = () => setLinks([...links, '']);
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };
  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  // --- Submit Handler ---

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Retrieve Token
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to post.");
      setLoading(false);
      // Optional: router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("deadline", deadline);
    formData.append("location", location);
    formData.append("cost", cost);

    // Append Links
    links.filter(l => l.trim() !== "").forEach(link => {
      formData.append("links", link);
    });

    // Append Images
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

      const response = await fetch(`${API_BASE}/post/service`, {
        method: "POST",
        // 2. Add Authorization Header
        headers: {
          "Authorization": `Bearer ${token}`, 
          // Note: DO NOT set 'Content-Type'. The browser sets it automatically for FormData.
        },
        body: formData,
      });


      // Check for HTML error response
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Publishing failed");
        const tokendeduction= await fetch(`${API_BASE}/payment/minusfive`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        alert("Post published successfully! 5 tokens have been deducted from your account.");
        router.push("/");
      } else {
        const text = await response.text();
        console.error("Server Error:", text);
        throw new Error("Server returned an error (check console)");
      }

    } catch (err: any) {
      console.error("Upload Error:", err);
      setError(err.message || "Server Error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        
        <div className="bg-black text-white p-6 border-b-4 border-violet-500">
          <h1 className="text-2xl font-black uppercase tracking-tight">Create New Post</h1>
          <p className="text-violet-500 text-xs font-bold mt-1 tracking-widest uppercase">Post on NITH Marketplace</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* --- NEW IMAGE SECTION --- */}
          <div>
            <label className="block text-xs font-black uppercase mb-1 text-gray-500">
              Media ({files.length} selected)
            </label>
            
            {/* Upload Box */}
            <label htmlFor="image-input" className="border-2 border-dashed border-black p-8 rounded-sm bg-violet-50 flex flex-col items-center justify-center cursor-pointer hover:bg-violet-100 transition-colors mb-4">
              <span className="text-2xl mb-2">📸</span>
              <p className="text-xs font-bold uppercase text-center">Click to Add Images</p>
              <input 
                id="image-input"
                type="file" 
                multiple 
                accept="image/*"
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>

            {/* Preview Grid */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {previews.map((src, index) => (
                  <div key={index} className="relative group w-full h-24 border-2 border-black">
                    <img 
                      src={src} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-black w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold hover:bg-red-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Heading */}
          <div>
            <label className="block text-xs font-black uppercase mb-1 text-gray-500">Heading *</label>
            <input 
              type="text" 
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full border-2 border-black p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-violet-500 font-bold"
              placeholder="What do you need?"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-500">Type</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border-2 border-black p-3 rounded-sm bg-white font-bold"
              >
                <option value="Assignment">Assignment</option>
                <option value="Rental">Rental</option>
                <option value="Notes">Notes</option>
                <option value="Canteen">Grocery</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-500">Location</label>
              <ExploreColleges location={location} setLocation={setLocation} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black uppercase mb-1 text-gray-500">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border-2 border-black p-3 rounded-sm focus:outline-none focus:border-violet-500"
              placeholder="Add details..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Deadline */}
             <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-500">Cost (₹)</label>
              <input 
                type="number" 
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full border-2 border-black p-3 rounded-sm font-bold"
                placeholder="Price"
              />
            </div>
           

            {/* Cost - Hide for Canteen */}
            {type !== "Canteen" && (
             <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-500">Deadline</label>
              <input 
                type="datetime-local" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full border-2 border-black p-3 rounded-sm font-bold"
              />
            </div>
            )}
          </div>

          {/* Links */}
          <div>
            <label className="block text-xs font-black uppercase mb-2 text-gray-500"> External Link (Add Google Drive link of Assignment/Notes)</label>
            <div className="space-y-2">
              {links.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <input 
                    type="url" 
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                    className="flex-1 border-2 border-black p-2 text-sm"
                    placeholder="https://..."
                  />
                  {links.length > 1 && (
                    <button type="button" onClick={() => handleRemoveLink(index)} className="px-3 border-2 border-black font-bold">✕</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={handleAddLink} className="text-[10px] font-black uppercase underline decoration-violet-500">+ Add Link</button>
            </div>
          </div>

          {error && <div className="p-3 border-2 border-black bg-red-100 font-bold text-red-600 text-xs">{error}</div>}

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-violet-500 text-black border-4 border-black p-4 font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;