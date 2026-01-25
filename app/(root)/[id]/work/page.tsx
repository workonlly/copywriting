import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 1. Define Interface matching your DB Schema
interface Job {
 key:number;
  id: number;
  headline: string;
  description: string;
  cost: number;
  type: string;
  deadline: string;
  location: string;
  status?: string; 
  progress?: string;
  image_url: string[];
  links: string[];
  created_at: string;
}

// 2. Fetch Data Function
async function getJob(id: string): Promise<Job> {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
  
  // Requires the backend route: app.get("/post/service/:id", ...)
  const res = await fetch(`${API_BASE}/calls/${id}`, {
    cache: 'no-store', // Ensures fresh data on every load
  });

  if (!res.ok) {
    if (res.status === 404) return notFound();
    throw new Error('Failed to fetch job details');
  }

  return res.json();
}

// 3. Main Component
// FIX: Params is now a Promise in Next.js 15
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  
  // Await the params to get the ID
  const { id } = await params;
  
  // Fetch job using the ID
  const job = await getJob(id);

  // Helper for Date
  const formattedDate = new Date(job.deadline).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Helper for Status Colors
  const status = job.progress || job.status || 'initiated';
  const statusColor = 
    status === 'completed' ? 'bg-green-400' : 
    status === 'pending' ? 'bg-yellow-400' : 
    'bg-gray-200';

  return (
    <div className="min-h-screen bg-violet-50 p-6 md:p-12 font-sans text-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link href="/feed" className="inline-block mb-8 font-black uppercase text-sm tracking-widest hover:text-violet-600 transition-colors">
          ← Back to Feed
        </Link>

        {/* Main Card Container */}
        <div className="border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          
          {/* --- HEADER SECTION --- */}
          <div className="border-b-4 border-black p-8 md:p-12 bg-black text-white flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="bg-violet-500 text-black text-xs font-black px-3 py-1 uppercase tracking-wider border-2 border-transparent">
                  {job.type}
                </span>
                <span className={`${statusColor} text-black text-xs font-black px-3 py-1 uppercase tracking-wider border-2 border-transparent`}>
                  {status}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none break-words">
                {job.headline}
              </h1>
            </div>
            
            <div className="flex flex-col md:items-end">
               <p className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-1">Budget</p>
               <p className="text-5xl font-black tracking-tight">₹{job.cost}</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            
            {/* --- LEFT COLUMN: IMAGES --- */}
            <div className="w-full lg:w-5/12 border-b-4 lg:border-b-0 lg:border-r-4 border-black p-8 bg-gray-50">
               {/* Main Image */}
               <div className="border-4 border-black aspect-square overflow-hidden mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] bg-white relative">
                 {job.image_url && job.image_url.length > 0 ? (
                   <img 
                     src={job.image_url[0]} 
                     alt="Main visual" 
                     className="w-full h-full object-cover" 
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold uppercase">No Image</div>
                 )}
               </div>

               {/* Thumbnails */}
               {job.image_url && job.image_url.length > 1 && (
                 <div className="grid grid-cols-3 gap-4">
                   {job.image_url.slice(1).map((img, i) => (
                     <div key={i} className="border-2 border-black aspect-square overflow-hidden hover:opacity-80 cursor-pointer bg-white">
                       <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                     </div>
                   ))}
                 </div>
               )}
            </div>

            {/* --- RIGHT COLUMN: DETAILS --- */}
            <div className="w-full lg:w-7/12 p-8 md:p-12 space-y-10">
              
              {/* Description */}
              <div>
                <h3 className="font-black uppercase text-xl mb-4 decoration-violet-500 underline decoration-4 underline-offset-4">
                  The Brief
                </h3>
                <p className="text-lg text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
                  {job.description || "No description provided."}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-black p-4 bg-violet-50">
                  <p className="text-xs font-black uppercase text-gray-500 mb-1">Deadline</p>
                  <p className="font-bold text-xl">{formattedDate}</p>
                </div>
                <div className="border-2 border-black p-4 bg-violet-50">
                  <p className="text-xs font-black uppercase text-gray-500 mb-1">Location</p>
                  <p className="font-bold text-xl">{job.location || "Remote"}</p>
                </div>
              </div>

              {/* Links Section */}
              {job.links && job.links.length > 0 && job.links[0] !== "" && (
                <div>
                   <h3 className="font-black uppercase text-sm mb-3 text-gray-500 border-b-2 border-gray-200 pb-1 inline-block">
                     Attachments & Links
                   </h3>
                   <ul className="space-y-3">
                     {job.links.map((link, i) => (
                       <li key={i} className="flex items-center gap-2">
                         <span className="text-violet-500">🔗</span>
                         <a href={link} target="_blank" rel="noopener noreferrer" className="text-black font-bold hover:bg-violet-200 px-1 transition-colors break-all underline decoration-2 decoration-violet-300">
                           {link}
                         </a>
                       </li>
                     ))}
                   </ul>
                </div>
              )}

              {/* Action Area */}
              <div className="pt-6 mt-6 border-t-2 border-dashed border-gray-300">
                 <button className="w-full bg-black text-white text-2xl font-black uppercase py-5 hover:bg-violet-500 hover:text-white transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 border-2 border-transparent">
                   Place a Bid
                 </button>
                 <p className="text-center text-xs font-bold uppercase text-gray-400 mt-4 tracking-widest">
                   Posted on {new Date(job.created_at).toLocaleDateString()}
                 </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}