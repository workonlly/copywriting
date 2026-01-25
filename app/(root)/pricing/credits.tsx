"use client";

import { getUser } from '@/app/lib/data';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CreditDisplay = () => {
 const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const initProfile = async () => {
      try {
        // 2. Use your helper function from @/app/lib/data
        const data = await getUser();
        
        if (data) {
          setUserData(data);
        } else {
          // If getUser returns null (e.g. invalid token), redirect
          router.push("/login");
        }
      } catch (err) {
        console.error("Profile load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    initProfile();
  },[]);
       // Loading state prevents "undefined" errors below
  if (loading) return <div className="p-20 text-center font-bold">Loading...</div>;
  if (!userData) return null;

  // Destructure for cleaner JSX
    const {
      name,
      token,
      
    } = userData;
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-sm bg-white hover:border-violet-500 transition-colors cursor-default">
      {/* SVG Icon */}
     
      
      {/* Label and Amount */}
      <div className="flex items-center gap-1.5">
        <span className="text-md font-bold  text-black ">{name} </span>
        <span className="text-sm font-medium text-gray-600">you have </span>
        <span className="text-sm font-bold text-black">{token}</span>
         <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-5 h-5 text-violet-500"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
         <span className="text-sm font-medium text-gray-600">Credits available</span>
      </div>
    </div>
  );
};

export default CreditDisplay;