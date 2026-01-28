"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import User from './user';

interface BidType {
  id: number;
  amount: string;
  message: string;
  created_at: string;
  bidder_id: number;
}

function Bid({prog}: {prog?: string}) {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  
  const [bids, setBids] = useState<BidType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAcceptBid = async (Id: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/bids/assigning/${Id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ job_id: id })
      });

      if (!res.ok) throw new Error("Failed to accept bid");
      
      alert("Bid accepted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Error accepting bid:", error);
      alert("Failed to accept bid");
    }
  };

  const completefunction = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/bids/complete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error response:", errorText);
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }
      router.push("/profile");
      alert("Job marked as complete!");
    } catch (error) {
      console.error("Error marking job as complete:", error);
    }
  };

  useEffect(() => {
    const fetchBids = async () => {
      try {
        // Ensure your backend sends the JOINED data (bids + user info)
        const res = await fetch(`${API_BASE}/bids/job/${id}`);
        if (!res.ok) throw new Error("Failed to load bids");
        const data = await res.json();
        setBids(data);
      } catch (error) {
        console.error("Error fetching bids:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBids();
  }, [id, API_BASE]); 

  if (loading) return <div className="p-4 text-center font-bold">Loading bids...</div>;

  return (
    <div className="p-4">
      <h3 className="text-lg font-black uppercase italic tracking-tighter mb-6 flex items-center gap-2">
        Bids Received <span className="bg-black text-white text-xs rounded-full px-2 py-1 not-italic">{bids.length}</span>
      </h3>

      {/* GRID LAYOUT FOR SQUARE CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        
        {bids.map((bid) => (
            
          <div 
            key={bid.id} 
            className="aspect-square flex flex-col justify-between bg-white border-4 border-black p-3 shadow-[6px_6px_0px_0px_rgba(124,58,237,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-sm"
          >
            <User  id={bid.bidder_id}/>

            {/* Middle: Message */}
            <div className="flex-1 py-3 overflow-hidden">
              <p className="text-xs text-gray-600 italic leading-relaxed line-clamp-3">
                "{bid.message || "No message attached."}"
              </p>
            </div>

            {/* Bottom: Price & Action */}
            <div className="space-y-2">
              <div className="border-t-2 border-dashed border-gray-300 pt-3 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-gray-400">Offer</span>
                <span className="text-xl font-black text-violet-600">₹{bid.amount}</span>
              </div>
              {prog?.trim() === "initiated"? 
               <button
                onClick={() => handleAcceptBid(bid.bidder_id)}
                className="w-full bg-violet-500 text-white text-[10px] font-black uppercase px-2 py-2 rounded hover:bg-black hover:text-white transition-colors"
              >
                Accept Bid
              </button>
              : 
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">Job in Progress</p>
                <button
                  onClick={completefunction}
                  className="w-full bg-violet-500 text-white hover:bg-black hover:text-white text-[10px] font-black uppercase px-2 py-2 rounded  "
                >
                  Completed
                </button>
              </div>
              
              }
             
            </div>

          </div>
        ))}

        {bids.length === 0 && (
          <div className="col-span-full py-10 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-400 font-medium">No bids have been placed yet.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Bid;