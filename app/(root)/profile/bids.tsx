"use client";
import React, { useState, useEffect } from 'react';
import { getUser } from '@/app/lib/data';

function Bids() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Bids and their corresponding Job data
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const user = await getUser();
        if (!user?.id) return;

        const res = await fetch(`${API_BASE}/calls/bids/${user.id}`);
        const json = await res.json();
        
        const bidsArray = Array.isArray(json) ? json : [json];
        
        // Fetch job data for each bid
        const bidsWithJobs = await Promise.all(
          bidsArray.map(async (bid) => {
            const jobRes = await fetch(`${API_BASE}/calls/work/${bid.job_id}`);
            const jobJson = await jobRes.json();
            const jobData = Array.isArray(jobJson) ? jobJson[0] : jobJson;
            
            return {
              ...bid,
              heading: jobData?.heading 
            };
          })
        );
        
        setBids(bidsWithJobs);
      } catch (error) {
        console.error("Error loading bids:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, [API_BASE]);

  // 2. Handle Delete Logic
  const handleDelete = async (bidId: number) => {
    if(!confirm("Are you sure you want to withdraw this bid?")) return;

    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/bids/${bidId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
            // Remove from UI immediately
            setBids(prev => prev.filter(bid => bid.id !== bidId));
        } else {
            alert("Failed to delete bid");
        }
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-6">
        My Active Bids
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-gray-400 font-medium">Loading bids...</p>
        ) : (
          bids.map((bid: any) => (
            <div 
              key={bid.id}
              className="relative bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
            >
              
              {/* DELETE BUTTON (Top Right) */}
              <button 
                onClick={() => handleDelete(bid.id)}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white font-bold border-2 border-black hover:bg-red-600 transition-colors z-10"
                title="Withdraw Bid"
              >
                ✕
              </button>

              {/* JOB TITLE (Context) */}
              <div className="mb-4 pr-8">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Job Post</p>
                <h3 className="font-bold text-lg leading-tight truncate">
                  {bid.heading }
                </h3>
              </div>

              {/* BID AMOUNT */}
              <div className="flex items-end gap-2 mb-4 border-b-2 border-dashed border-gray-200 pb-4">
                <span className="text-3xl font-black text-violet-600">₹{bid.amount}</span>
                <span className="text-xs text-gray-500 font-medium mb-1.5">offered</span>
              </div>

              {/* MESSAGE */}
              <div className="bg-gray-50 p-3 border-l-4 border-gray-300">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Your Message</p>
                <p className="text-sm text-gray-600 italic line-clamp-3">
                  "{bid.message || "No message provided."}"
                </p>
              </div>

              {/* DATE FOOTER */}
              <div className="mt-4 pt-2 flex justify-between items-center text-[10px] font-mono text-gray-400">
                <span>ID: #{bid.id}</span>
                <span>{new Date(bid.created_at).toLocaleDateString()}</span>
              </div>

            </div>
          ))
        )}
      </div>

      {!loading && bids.length === 0 && (
        <div className="p-10 text-center border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-400">No active bids found.</p>
        </div>
      )}
    </div>
  );
}

export default Bids;