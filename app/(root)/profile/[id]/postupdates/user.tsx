import React from 'react'
import { useEffect,useState } from 'react'
import { getUser } from '@/app/lib/data';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function User({id}:any) {
  const router = useRouter();
        const [bidder,setbidder]=useState<any>(null);
        const [loading, setLoading] = useState(true);
  
                const [chatLoading, setChatLoading] = useState(false);
        const API_BASE: any = process.env.NEXT_PUBLIC_API_BASE_URL;
        const chatup = async() => {
                  setChatLoading(true);
                  try {
                    const chat = await getUser();
                    if (!chat?.id) {
                      console.error("User not authenticated");
                      return;
                    }
        
                    const token = localStorage.getItem("token");
                    const res = await fetch(`${API_BASE}/chats/checkchat`, {
                      method: "POST",
                      headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        user1: chat.id,
                        user2: id
                      })
                    });
        
                    if (!res.ok) {
                      const errorData = await res.text();
                      throw new Error(`Failed to check or create chat: ${res.status}`);
                    }
        
                    router.push(`/chats`);
                  } catch (err) {
                    console.error("Chat error:", err);
                    alert("Failed to open chat. Please try again.");
                  } finally {
                    setChatLoading(false);
                  }
                };
        
        useEffect(()=>{
            const fetchBidder=async()=>{
                try {
                    const data = await fetch(`${API_BASE}/bids/bidder/${id}`);
                    if (!data.ok) throw new Error("Failed to fetch");
                    const json = await data.json();
                    // Handle if API returns an array
                    const bidderData = Array.isArray(json) ? json[0] : json;
                    setbidder(bidderData);
                    console.log("Fetched bidder:", bidderData);
                } catch (error) {
                    console.error("Error fetching bidder:", error);
                } finally {
                    setLoading(false);
                }
            };
            if (id) fetchBidder();
        }, [id]); // Add dependency array to prevent infinite loop

        if (loading) return <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-black animate-pulse"></div>;
        if (!bidder) return <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-black flex-shrink-0"></div>;

  return (

    <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row gap-1 items-center'>
      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-black  overflow-hidden">
                 {bidder?.image_url ? (
                    <img src={bidder.image_url} alt={bidder.name} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-violet-200 text-violet-800">
                      {bidder?.name?.charAt(0).toUpperCase()}
                    </div>
                 )}
              </div>
              <div>{bidder?.name}</div>
             </div>
              {/* Chats */}
               <button onClick={chatup} disabled={chatLoading} title="Messages" className="p-2 text-gray-400 hover:text-violet-500 disabled:opacity-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${chatLoading ? 'animate-pulse' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </button>
    </div>
  )
}

export default User
