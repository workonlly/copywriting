"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

// 1. Define the shape of your User data
interface User {
  id: number;
  name: string;
  email: string;
  image?: string; 
}

function Accounts() {
  const [userData, setUserData] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const initLayout = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversation/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json)) {
            setUserData(json);
          }
        }
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };
    initLayout();
  }, []);

  // --- NEW NAVIGATION LOGIC ---
  const handleStartChat = (userId: number) => {
    // 1. Save the ID strictly to browser storage (Invisible to URL)
    localStorage.setItem("chat_receiver_id", userId.toString());
    
    // 2. Navigate cleanly (URL stays just "/chats")
    router.push("/chats");
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-violet-50/20">
      {userData.map((user, index) => (
        <div 
          key={user.id}
          // --- UPDATED CLICK HANDLER ---
          onClick={() => handleStartChat(user.id)}
          style={{
            animation: `slideIn 0.4s ease-out ${index * 0.05}s both`
          }}
          className="group flex flex-row gap-4 items-center p-5 hover:bg-violet-50/60 cursor-pointer border-b border-gray-100 transition-all duration-300"
        >
          {/* Avatar Click: Goes to Profile Review (Still keeps ID in URL for deep linking if needed) */}
          <div onClick={(e) => e.stopPropagation()}>
            <Link href={`/chats/${user.id}/review`}>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden relative hover:scale-110 hover:shadow-lg hover:shadow-violet-500/50 hover:ring-4 hover:ring-violet-300 transition-all duration-300">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="font-black text-xl">
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </span>
                )}
              </div>
            </Link>
          </div>

          {/* NAME SECTION */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base text-gray-900 truncate group-hover:text-violet-700 transition-colors duration-300">
              {user.name}
            </h3>
          </div>
        </div>
      ))}

      {userData.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-400 text-base font-medium">No contacts found.</p>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Accounts;