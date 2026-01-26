"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Jobs from './jobs';
import Bids from './bids';
import Posts from './posts';
import { getUser } from '@/app/lib/data';

const ProfilePage: React.FC = () => {
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
    };

    initProfile();
  }, [router]);

  // Loading state prevents "undefined" errors below
  if (loading) return <div className="p-20 text-center font-bold">Loading...</div>;
  if (!userData) return null;

  // Destructure for cleaner JSX
    const {
      name,
      email,
      bio,
      active_requests,
      token,
      completed_requests,
      image_url,
    } = userData;

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        
        {/* 1. Main Info Card */}
        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 bg-violet-500 text-white rounded-full flex items-center justify-center text-5xl font-bold shadow-lg">
              {image_url ? (
                <img
                  src={image_url}
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-white text-5xl font-bold">
                  {name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-1">{name}</h1>
              <p className="text-gray-500 text-sm font-medium">{email}</p>
              {bio && <p className="mt-3 text-gray-600 max-w-lg">{bio}</p>}
            </div>
          </div>
        </div>
        {/* 2. Quick Stats Section */}
        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <StatCard value={active_requests} label="Active Requests" />
            <StatCard value={token} label="Credits" />
            <StatCard value={completed_requests} label="Completed" />
          </div>
        </div>
    
        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-6 overflow-auto">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Assigned Jobs</h3>
            <Jobs/>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Bids</h3>
           <Bids></Bids>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your posts</h3>
           <Posts></Posts>
        </div>

      </div>
    </div>
  );
};

// Reusable Stat Component
const StatCard = ({ value, label }: { value: any, label: string }) => (
  <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg text-center">
    <p className="text-3xl font-bold text-violet-600">{value || "0"}</p>
    <p className="text-xs uppercase font-semibold text-gray-500 mt-1">{label}</p>
  </div>
);

export default ProfilePage;