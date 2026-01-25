"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Importing your custom data fetcher
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
    <div className="min-h-screen bg-white text-black font-sans">
      {/* 1. Header */}
      <header className="w-full border-b border-gray-200 px-6 py-12 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-violet-500 text-white rounded-sm flex items-center justify-center text-5xl font-bold shadow-sm">
            {image_url ? (
              <img
                src={image_url}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-5xl font-bold">
                {name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight mb-2">{name}</h1>
            <p className="text-gray-500 text-lg font-medium">{email}</p>
            {bio && <p className="mt-4 text-gray-600 max-w-md">{bio}</p>}
          </div>
        </div>
      </header>

      {/* 2. Main Content Grid */}
      <main className="max-w-6xl mx-auto px-3 py-12 md:px-12 grid md:grid-cols-[300px_1fr] gap-12">
        
        {/* Left Column: Stats */}
        <section className="space-y-8">
          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-xs font-black uppercase text-violet-500 tracking-widest mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <StatCard value={active_requests} label="Active Requests" />
              <StatCard value={token} label="Credits" />
              <StatCard value={completed_requests} label="Completed" />
            </div>
          </div>
        </section>

        {/* Right Column: Details */}
        <section className="space-y-6">
           <h2 className="text-2xl font-bold border-b-2 border-black pb-2">Your Reviews</h2>
           <div className="py-10 text-gray-400 italic">No reviews found yet.</div>
        </section>
      </main>
    </div>
  );
};

// Reusable Stat Component to keep the main code clean
const StatCard = ({ value, label }: { value: any, label: string }) => (
  <div className="p-4 bg-gray-50 rounded-sm">
    <p className="text-2xl font-bold">{value || "0"}</p>
    <p className="text-[10px] uppercase font-bold text-gray-400">{label}</p>
  </div>
);

export default ProfilePage;