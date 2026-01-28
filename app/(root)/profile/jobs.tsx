import React, { use } from 'react'
import { useState,useEffect } from 'react'
import { getUser } from '@/app/lib/data';
import Link from 'next/link';

function Jobs() {
    const API_BASE: any = process.env.NEXT_PUBLIC_API_BASE_URL;
    const[posts,setposts]=useState<any>(null);
    const[loading,setloading]=useState(true);
    useEffect(()=>{
      const jobs=async()=>{
         const id1=await getUser();
            const id=id1?.id;
        const data =await fetch(`${API_BASE}/calls/assign/${id}`);
        const json = await data.json();
        setposts(json);
        setloading(false);
      };
      jobs();
    });
  return (
        <div className="p-2">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-gray-500 font-medium">Loading posts...</p>
        ) : (
          posts.map((post: any) => {
            const formattedDate = new Date(post.deadline).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            });
            
            return (
            <Link href={`/chats`} key={post.id}>
              <div className="w-full h-full border-2 border-black rounded-sm bg-white flex flex-col group hover:shadow-[6px_6px_0px_0px_rgba(139,92,246,1)] transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                
                {/* Image Section */}
                <div className="relative w-full aspect-video border-b-2 border-black overflow-hidden bg-gray-100">
                  <span className="absolute top-2 right-2 z-10 bg-black text-white text-[10px] font-black uppercase px-2 py-1 tracking-wider">
                    {post.type}
                  </span>
                  <img 
                    src={post.image_url && post.image_url.length > 0 ? post.image_url[0] : "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80"}
                    alt={post.heading} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow space-y-3">
                  
                  {/* Headline */}
                  <h3 className="text-lg font-black text-black leading-tight line-clamp-1 uppercase">
                    {post.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed flex-grow">
                    {post.description}
                  </p>

                  {/* Cost and Deadline */}
                  <div className="flex items-end justify-between pt-4 border-t-2 border-dashed border-gray-200">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-violet-600 tracking-widest">Budget</span>
                      <span className="text-xl font-black text-black">₹{post.cost}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Due Date</span>
                      <span className="text-sm font-bold text-gray-800">{formattedDate}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="pt-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded tracking-wider ${
                      post.progress === 'initiated' ? 'bg-green-100 text-green-800' :
                      post.progress === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.progress || 'Active'}
                    </span>
                  </div>

                  {/* Submission Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/chats`;
                    }}
                    className="w-full mt-auto bg-black text-white py-3 font-black uppercase text-sm tracking-widest hover:bg-violet-500 hover:text-white transition-colors rounded-sm"
                  >
                    Submit / Update
                  </button>
                </div>

              </div>
            </Link>
            )
          })
        )}
      </div>

      {!loading && posts.length === 0 && (
        <p className="text-gray-500">No jobs found in the database.</p>
      )}
    </div>
  )
}

export default Jobs
