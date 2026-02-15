"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

// 1. Define the shape of your User data
interface User {
  id: number;
  name: string;
  email: string;
  image?: string; 
}

function Accounts() {
  const [userData, setUserData] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initLayout = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      // Decode token to get current user ID
      try {
        const decoded: any = jwtDecode(token);
        const userId = decoded.user_id || decoded.id;
        setCurrentUserId(userId);
        console.log("👤 Current User ID:", userId);
      } catch (err) {
        console.error("❌ Failed to decode token", err);
        router.push("/login");
        return;
      }

      // Fetch contacts list
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
            console.log("📋 Loaded contacts:", json.length);
          }
        } else if (response.status === 401) {
          console.error("❌ Unauthorized - redirecting to login");
          router.push("/login");
        }
      } catch (error) {
        console.error("❌ Failed to fetch accounts", error);
      }
    };
    initLayout();
  }, [router]);

  // --- UPDATED NAVIGATION LOGIC WITH CHECKCHAT ---
  const handleStartChat = async (receiverId: number) => {
    if (!currentUserId) {
      console.error("❌ Current user ID not available");
      alert("Please refresh the page and try again.");
      return;
    }

    if (loadingUserId !== null) {
      console.log("⏳ Already processing a chat request");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found");
      router.push("/login");
      return;
    }

    setLoadingUserId(receiverId);

    try {
      // 1. Call checkchat to initialize the room and update contacts
      console.log("🔄 Initializing chat with user", receiverId);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/checkchat`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user1: currentUserId,
          user2: receiverId
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Chat initialized successfully");
        console.log("🏠 Room ID:", data.room_id);
        
        // 2. Save receiver ID to localStorage
        localStorage.setItem("chat_receiver_id", receiverId.toString());
        
        // 3. Navigate to chat
        router.push("/chats");
      } else {
        const error = await response.json();
        console.error("❌ Failed to initialize chat:", error.message);
        alert(`Failed to start chat: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("❌ Error starting chat:", error);
      alert("Failed to start chat. Please check your connection and try again.");
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="flex flex-col w-full bg-gradient-to-b from-white to-violet-50/20">
      {userData.map((user, index) => {
        const isLoading = loadingUserId === user.id;
        
        return (
          <div 
            key={user.id}
            onClick={() => handleStartChat(user.id)}
            style={{
              animation: `slideIn 0.4s ease-out ${index * 0.05}s both`,
              opacity: isLoading ? 0.6 : 1,
              pointerEvents: loadingUserId !== null ? "none" : "auto"
            }}
            className="group flex flex-row gap-2 sm:gap-3 md:gap-4 items-center p-2 sm:p-3 md:p-5 hover:bg-violet-50/60 cursor-pointer border-b border-gray-100 transition-all duration-300"
          >
            {/* Avatar Click: Goes to Profile Review */}
            <div onClick={(e) => e.stopPropagation()}>
              <Link href={`/chats/${user.id}/review`}>
                <div className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg shrink-0 overflow-hidden relative hover:scale-110 hover:shadow-lg hover:shadow-violet-500/50 hover:ring-2 md:hover:ring-4 hover:ring-violet-300 transition-all duration-300">
                  {user.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="font-black text-sm sm:text-lg md:text-xl">
                      {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* NAME SECTION */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 truncate group-hover:text-violet-700 transition-colors duration-300">
                {user.name}
              </h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">{user.email}</p>
            </div>

            {/* Loading indicator - only for this specific user */}
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-violet-600"></div>
            )}
          </div>
        );
      })}

      {userData.length === 0 && (
        <div className="p-4 sm:p-6 md:p-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm md:text-base font-medium">
            No contacts yet.<br/>
            <span className="text-[10px] sm:text-xs md:text-sm">Start chatting with someone to add them to your contacts!</span>
          </p>
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