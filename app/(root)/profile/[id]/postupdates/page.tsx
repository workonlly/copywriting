"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Bids from './bids';

export default function UpdatePostPage() {
  const router = useRouter();
  const { id } = useParams(); 
  const API_BASE: any = process.env.NEXT_PUBLIC_API_BASE_URL;

  // UI State
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Data State
  const [formData, setFormData] = useState({
    heading: "",
    type: "",
    description: "",
    deadline: "",
    cost: "",
    links: [""],
    progress: ""
  });

  // Image Management State
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]); 
  const [newFiles, setNewFiles] = useState<File[]>([]); 
  const [newPreviews, setNewPreviews] = useState<string[]>([]); 

  // 1. Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/calls/work/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post data");
        const responseData = await res.json();
        const data = Array.isArray(responseData) ? responseData[0] : responseData;

        const formattedDate = data.deadline 
          ? new Date(data.deadline).toISOString().slice(0, 16) 
          : "";

        setFormData({
          heading: data.heading,
          type: data.type,
          description: data.description || "",
          deadline: formattedDate,
          cost: data.cost.toString(),
          links: data.links || [''],
          progress: data.progress || ""
        });
        setExistingImages(data.image_url || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, API_BASE]);

  // --- Handlers ---
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData(prev => ({ ...prev, links: newLinks }));
  };
  const handleAddLink = () => setFormData(prev => ({ ...prev, links: [...prev.links, ''] }));
  const handleRemoveLink = (index: number) => {
    setFormData(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
  };

  const markImageForDeletion = (url: string) => {
    setImagesToRemove(prev => [...prev, url]); 
    setExistingImages(prev => prev.filter(img => img !== url)); 
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map(file => URL.createObjectURL(file));
      setNewFiles(prev => [...prev, ...files]);
      setNewPreviews(prev => [...prev, ...previews]);
    }
  };

  const removeNewFile = (index: number) => {
    URL.revokeObjectURL(newPreviews[index]); 
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // --- DELETE Logic with Token ---
  const Delete = async () => {
      // 1. User Confirmation
      if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

      // 2. Get Token
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to delete.");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/updatecalls/${id}`, {
          method: "DELETE",
          headers: {
            // 3. Attach Token
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
           const result = await res.json();
           throw new Error(result.msg || "Delete failed");
        }

        alert("Post Deleted Successfully");
        router.push('/'); // Redirect after delete

      } catch (err: any) {
        setError(err.message);
      } 
  }

  // --- SUBMIT Logic with Token ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // 1. Get Token
    const token = localStorage.getItem("token");
    if (!token) {
        setError("You must be logged in to update.");
        setSubmitting(false);
        return;
    }

    // 2. Build FormData
    const submitData = new FormData();
    submitData.append("heading", formData.heading);
    submitData.append("type", formData.type);
    submitData.append("description", formData.description);
    submitData.append("deadline", formData.deadline);
    submitData.append("cost", formData.cost);
    
    formData.links.filter(l => l.trim() !== "").forEach(link => {
        submitData.append("links", link);
    });

    imagesToRemove.forEach(url => {
        submitData.append("imagesToRemove", url);
    });

    newFiles.forEach(file => {
        submitData.append("images", file);
    });

    try {
      const res = await fetch(`${API_BASE}/updatecalls/${id}`, {
        method: "PUT",
        headers: {
            // 3. Attach Token
            "Authorization": `Bearer ${token}` 
            // NOTE: Do NOT set "Content-Type" here. 
            // Fetch sets it automatically to "multipart/form-data" with the correct boundary for files.
        },
        body: submitData
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.msg || result.error || "Update failed");
      }

      
    } catch (err: any) {
      setError(err.message);
    } finally {
      router.push('/');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 font-bold">Loading Post...</div>;

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white rounded-sm overflow-hidden">
        
        {/* Header */}
        <div className="bg-black text-white p-6 border-b-4 border-violet-500 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight italic">Update Post</h1>
          </div>
          <button 
            type="button"
            onClick={() => router.back()}
            className="text-[10px] font-black border-2 border-white px-3 py-1 hover:bg-violet-500 hover:text-black hover:border-black transition-all uppercase"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          
          {/* 1. IMAGES SECTION */}
          <div>
            <label className="block text-xs font-black uppercase mb-2 text-gray-400 italic">01. Manage Images</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
               {/* Existing Images */}
               {existingImages.map((url, idx) => (
                 <div key={`exist-${idx}`} className="aspect-square bg-gray-50 border-2 border-black relative group">
                   <img src={url} alt="Existing" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                     <button type="button" onClick={() => markImageForDeletion(url)} className="bg-red-500 text-white text-[8px] font-black px-2 py-1 uppercase hover:scale-105 transition-transform">
                       Delete
                     </button>
                   </div>
                 </div>
               ))}

               {/* New Upload Previews */}
               {newPreviews.map((src, idx) => (
                 <div key={`new-${idx}`} className="aspect-square bg-violet-50 border-2 border-violet-500 relative group">
                   <img src={src} alt="New" className="w-full h-full object-cover opacity-80" />
                   <button type="button" onClick={() => removeNewFile(idx)} className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center font-bold text-xs">✕</button>
                 </div>
               ))}

               {/* Add Button */}
               <label className="aspect-square border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-black hover:bg-gray-50 cursor-pointer transition-colors">
                 <span className="text-gray-400 text-2xl font-light">+</span>
                 <span className="text-[8px] font-bold uppercase text-gray-400">Add New</span>
                 <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
               </label>
            </div>
            
            {(imagesToRemove.length > 0 || newFiles.length > 0) && (
                <p className="text-[10px] text-violet-600 font-bold uppercase">
                    Changes pending: {imagesToRemove.length} deletes, {newFiles.length} new uploads
                </p>
            )}
          </div>

          <div className="space-y-6">
            {/* 2. HEADING */}
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-500 italic">02. Heading</label>
              <input type="text" name="heading" value={formData.heading} onChange={handleInputChange} className="w-full border-2 border-black p-3 rounded-sm focus:outline-none focus:bg-violet-50 font-bold transition-colors" />
            </div>

            {/* 3. TYPE */}
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-500 italic">03. Post Type</label>
              <select name="type" value={formData.type} onChange={handleInputChange} className="w-full border-2 border-black p-3 rounded-sm bg-white focus:outline-none focus:border-violet-500 appearance-none cursor-pointer font-bold">
                <option value="Assignment">Assignment</option>
                <option value="Project">Rental</option>
                <option value="Notes">Notes</option>
                <option value="Canteen">Canteen</option>
              </select>
            </div>

            {/* 4. DESCRIPTION */}
            <div>
              <label className="block text-xs font-black uppercase mb-1 text-gray-500 italic">04. Description</label>
              <textarea name="description" rows={5} value={formData.description} onChange={handleInputChange} className="w-full border-2 border-black p-3 rounded-sm focus:outline-none focus:border-violet-500 leading-relaxed font-medium"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 5. DEADLINE */}
              <div>
                <label className="block text-xs font-black uppercase mb-1 text-gray-500 italic">05. Deadline</label>
                <input type="datetime-local" name="deadline" value={formData.deadline} onChange={handleInputChange} className="w-full border-2 border-black p-3 rounded-sm focus:outline-none focus:border-violet-500" />
              </div>

              {/* 6. COST */}
              <div>
                <label className="block text-xs font-black uppercase mb-1 text-gray-500 italic">06. Cost (₹)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 font-bold text-violet-500">₹</span>
                  <input type="number" name="cost" value={formData.cost} onChange={handleInputChange} className="w-full border-2 border-black p-3 pl-8 rounded-sm focus:outline-none focus:border-violet-500 font-black text-lg" />
                </div>
              </div>
            </div>

            {/* 7. RESOURCE LINKS */}
            <div>
              <label className="block text-xs font-black uppercase mb-2 text-gray-500 italic">07. Resource Links</label>
              <div className="space-y-3">
                {formData.links.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="url" value={link} onChange={(e) => handleLinkChange(index, e.target.value)} className="flex-1 border-2 border-black p-2 text-sm rounded-sm focus:outline-none focus:bg-violet-50" />
                    {formData.links.length > 0 && (
                      <button type="button" onClick={() => handleRemoveLink(index)} className="px-4 border-2 border-black hover:bg-red-500 hover:text-white transition-colors font-bold">✕</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={handleAddLink} className="text-[10px] font-black uppercase underline decoration-violet-500 decoration-2 underline-offset-4 hover:text-violet-500 transition-all">
                  + Add New Source Link
                </button>
              </div>
            </div>
          </div>

          {error && <div className="p-3 border-2 border-black bg-red-100 text-red-600 font-bold text-xs">{error}</div>}

          {/* Action Buttons */}
          <div className="pt-8 flex flex-col md:flex-row gap-4">
            <button 
              type="submit"
              disabled={submitting}
              className={`flex-2 bg-violet-500 text-black border-4 border-black p-4 font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${submitting ? 'opacity-50' : ''}`}
            >
              {submitting ? 'Updating...' : 'Update Post'}
            </button>
            <button 
              type="button"
              onClick={Delete}
              className="flex-1 bg-white text-black border-4 border-black p-4 font-black uppercase text-xl hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <div>
        <Bids prog={formData.progress} ></Bids>
      </div>
    </div>
  );
}