"use client";
import React from 'react';

interface JobCardProps {
  id:number;
  headline: string;
  description: string;
  cost: number;
  type: string; // Changed from boolean to string matches DB ('Assignment', etc.)
  deadline: string;
  image_url: string[]; // Matches backend array format
  progress?: string;
  location:string;
}

const JobCard: React.FC<JobCardProps> = ({ 
  id,
  headline, 
  description, 
  cost, 
  deadline,
  image_url = [],
  type
}) => {
  
  // 1. Safe Image Logic: Get first image or use fallback
  const displayImage = image_url && image_url.length > 0 
    ? image_url[0] 
    : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80";

  // 2. Date Formatter
  const formattedDate = new Date(deadline).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    /* Container Fix: 
      - Removed w-[30%] -> Use w-full so it fills the parent Grid cell.
      - Added h-full -> Ensures all cards in a row are the same height.
    */
    <div className="w-full h-full border-2 border-black rounded-sm bg-white flex flex-col group hover:shadow-[6px_6px_0px_0px_rgba(139,92,246,1)] transition-all duration-200 hover:-translate-y-1">
      
      {/* 1. Image Section */}
      <div className="relative w-full aspect-video border-b-2 border-black overflow-hidden bg-gray-100">
        <span className="absolute top-2 right-2 z-10 bg-black text-white text-[10px] font-black uppercase px-2 py-1 tracking-wider">
          {type}
        </span>
        <img 
          src={displayImage} 
          alt={headline} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 2. Content Section */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Headline */}
        <h3 className="text-lg font-black text-black leading-tight line-clamp-1 uppercase">
          {headline}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Cost and Deadline */}
        <div className="flex items-end justify-between pt-4 border-t-2 border-dashed border-gray-200">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-violet-600 tracking-widest">Budget</span>
            <span className="text-xl font-black text-black">₹{cost}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Due Date</span>
            <span className="text-sm font-bold text-gray-800">{formattedDate}</span>
          </div>
        </div>

        {/* 3. Bid Button */}
        <a
        href={`${id}/work`}
        className="w-full mt-auto bg-black text-white py-3 font-black uppercase text-sm tracking-widest hover:bg-violet-500 hover:text-white transition-colors">
          View Details
        </a>
      </div>
    </div>
  );
};

export default JobCard;