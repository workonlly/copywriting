"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router

// 1. Define the shape of your User data
interface User {
  id: number;
  name: string;
  email: string;
  image?: string; // Optional: In case some users have profile pics
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
          // Ensure we are setting an array
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

  return (
    <div className="flex flex-col w-full">
      {/* 2. Map through the array to render each user */}
      {userData.map((user) => (
        <div 
          key={user.id} // Unique key is required for lists
          onClick={() => router.push(`/chats?id=${user.id}`)} // Navigate on click
          className="flex flex-row gap-3 items-center p-4 hover:bg-violet-50 cursor-pointer border-b border-gray-100 transition-colors"
        >
          
          {/* AVATAR SECTION */}
          <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold text-lg shrink-0 overflow-hidden relative">
            
            {/* Logic: If image exists, show it. Otherwise show First Letter */}
            {user.image ? (
              <img 
                src={user.image} 
                alt={user.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span>
                {/* Safe check: Ensure name exists before getting charAt */}
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </span>
            )}
            
          </div>

          {/* NAME SECTION */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm truncate text-gray-900">
              {user.name}
            </h3>

          </div>
          
        </div>
      ))}

      {/* Empty State Message */}
      {userData.length === 0 && (
        <div className="p-4 text-center text-gray-400 text-sm">
          No contacts found.
        </div>
      )}
    </div>
  );
}

export default Accounts;