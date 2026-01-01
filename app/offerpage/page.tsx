'use client';

import React, { useState } from 'react';

// --- SVGs for Icons ---
const Icons = {
  MapPin: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
  ),
  Bookmark: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  ),
  Star: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>
  ),
  User: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  ),
  DocumentPlaceholder: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M8 6h8" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
      <path d="M4 18l16 0" strokeDasharray="2 2"/>
    </svg>
  )
};

// --- Mock Data ---
const similarOffers = [
  { id: 1, pages: 12, price: 155, deadline: '02:25 PM 16/12/25' },
  { id: 2, pages: 12, price: 155, deadline: '02:25 PM 16/12/25' },
  { id: 3, pages: 12, price: 155, deadline: '02:25 PM 16/12/25' },
  { id: 4, pages: 12, price: 155, deadline: '02:25 PM 16/12/25' },
  { id: 5, pages: 12, price: 155, deadline: '02:25 PM 16/12/25' },
];

export default function JobDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);

  // Array of placeholder logic to simulate multiple images
  const images = [0, 1, 2, 3, 4]; 

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans text-slate-900">
      
      {/* Top Section: Split Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        
        {/* LEFT COLUMN: Image Gallery */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="relative w-full aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
             <Icons.DocumentPlaceholder className="w-32 h-32 text-slate-300" />
             {/* Pagination Dots (Mock) */}
             <div className="absolute bottom-4 flex gap-1">
                {images.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full ${idx === selectedImage ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}></div>
                ))}
             </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-20 h-24 rounded-md border-2 overflow-hidden flex items-center justify-center bg-slate-50 ${selectedImage === idx ? 'border-indigo-500' : 'border-transparent'}`}
              >
                <Icons.DocumentPlaceholder className="w-8 h-8 text-slate-300" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className="flex flex-col">
          
          {/* Header Row */}
          <div className="flex justify-between items-start mb-1">
            <span className="text-gray-400 text-sm font-medium">Math's Assignment</span>
            <div className="flex items-center text-indigo-700 text-sm font-semibold bg-indigo-50 px-2 py-1 rounded-full">
              <Icons.MapPin className="w-4 h-4 mr-1" />
              3.2 km
            </div>
          </div>

          {/* Title & Price */}
          <div className="flex justify-between items-baseline mb-2">
            <h1 className="text-3xl font-bold">16 Pages</h1>
            <span className="text-2xl font-bold">₹120</span>
          </div>

          <p className="text-xs font-semibold text-gray-800 mb-6">
            Deadline: 12:00 AM 14/12/2024
          </p>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Nibh turpis nibh laoreet ornare. 
              Amet enim nunc quam tristique in fringilla in. Tempus eu vestibulum 
              suspendisse nam enim in interdum nisi venenatis. Egestas amet nisl turpis 
              nec quam ipsum sed feugiat.
            </p>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
               <Icons.User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Vishal Sharma</span>
                <div className="flex items-center text-yellow-500 text-xs font-bold bg-yellow-50 px-1 rounded">
                  <span className="mr-0.5">4.7</span>
                  <Icons.Star className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <p className="text-xs text-red-500 font-medium mb-8">
            Application will be close in 2 hours
          </p>

          {/* Actions */}
          <div className="mt-auto flex gap-4 items-center">
             {/* Bookmark (Floating style based on image) */}
             <button className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Icons.Bookmark className="w-5 h-5 text-gray-600" />
             </button>

             <button className="flex-1 py-3 px-6 rounded-xl border border-gray-200 font-bold text-sm hover:bg-gray-50 transition-colors">
               Counter Offer
             </button>
             
             <button className="flex-1 py-3 px-6 rounded-xl bg-[#B8B8F3] text-indigo-950 font-bold text-sm hover:bg-[#a5a5e8] transition-colors shadow-lg shadow-indigo-100">
               Apply
             </button>
          </div>

        </div>
      </div>

      {/* Bottom Section: Similar Offers */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Similar Offers</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {similarOffers.map((offer, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 hover:shadow-md transition-shadow cursor-pointer">
              {/* Card Image */}
              <div className="aspect-square bg-slate-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                 <div className="w-full h-full opacity-10 flex items-center justify-center bg-blue-100">
                    <svg className="w-12 h-12 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                 </div>
              </div>
              
              {/* Card Details */}
              <div className="px-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">Pages {offer.pages}</span>
                  <span className="font-bold text-sm">₹{offer.price}</span>
                </div>
                <div className="text-[10px] text-gray-500 leading-tight">
                  <span className="block">Deadline</span>
                  <span>{offer.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}