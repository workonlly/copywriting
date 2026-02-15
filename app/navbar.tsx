"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { getUser } from './lib/data';
import ExploreColleges from './colegesearch';

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const initNavbar = async () => {
      try {
        const data = await getUser();
        if (data) {
          setUserData(data);
        } else {
          
        }
      } catch (error) {
        // User not authenticated, redirect to login
        console.log("User not authenticated, redirecting to login");

      }
    };
    initNavbar();
  }, []);

  // Helper for the profile icon/initials
  const ProfileBubble = () => (
    <div className="flex items-center justify-center min-w-[36px] h-9 rounded-full bg-violet-100 text-violet-700 font-bold border border-violet-200 group-hover:bg-violet-600 group-hover:text-white transition-all">
      {userData?.name ? userData.name.charAt(0).toUpperCase() : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
          <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
        </svg>
      )}
    </div>
  );

  return (
    <>
      <div className='flex flex-row justify-between items-center mx-5 py-3 border-b border-gray-50 bg-white sticky top-0 z-50'>
        {/* Left: Logo */}
        <div className='flex flex-row items-center gap-4'>
          <Link href="/">
            <Image src="/logo-2.svg" alt="logo" width={180} height={80} className="p-1 object-contain   " />
          </Link>
         <div className="hidden lg:block">
          <ExploreColleges />
         </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/postpage" className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all mr-2">
              + Post Job
            </Link>

            <div className="flex items-center gap-1 border-l pl-2 border-gray-100">
              {/* Pricing */}
              <Link href="/pricing" title="Pricing" className="p-2 text-gray-400 hover:text-violet-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </Link>

              {/* Chats */}
              <Link href="/chats" title="Messages" className="p-2 text-gray-400 hover:text-violet-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </Link>

              {/* Full Profile Link with Name */}
              <a href="/profile" className="flex items-center gap-2 ml-2 group p-1 pr-3 rounded-full hover:bg-gray-50 transition-all">
               {userData?.image_url ? (
                    <img 
                      src={userData.image_url} 
                      alt="Profile Picture" 
                      className="w-9 h-9 rounded-full object-cover" 
                    />
                  ) : (
                    <ProfileBubble />
                  )}
                {userData?.name && (
                  <span className="text-sm font-bold text-gray-700 group-hover:text-violet-600 transition-colors whitespace-nowrap">
                    {userData.name}
                  </span>
                )}
              </a>
            </div>
          </div>

          {/* Mobile Profile & Burger Combo */}
          <div className="flex md:hidden items-center gap-2 bg-gray-50 p-1 rounded-full border border-gray-100">
            <a href="/profile">
              {userData?.image_url ? (
                    <img 
                      src={userData.image_url} 
                      alt="Profile Picture" 
                      className="w-9 h-9 rounded-full object-cover" 
                    />
                  ) : (
                    <ProfileBubble />
                  )}
            </a>
            <button
              onClick={toggleMenu}
              className="p-1.5 rounded-full text-gray-600 hover:bg-white hover:shadow-sm transition-all"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                ) : (
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Explore Colleges Row - Mobile Only */}
      <div className="lg:hidden w-full bg-white border-b border-gray-100 px-3 py-2">
        <ExploreColleges />
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-200 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col p-4 space-y-2">
            <Link href="/postpage" className="p-3 bg-violet-600 text-white rounded-xl text-center font-bold text-sm shadow-md" onClick={() => setIsOpen(false)}>
              Post a New Job
            </Link>
            <Link href="/chats" className="p-3 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-3 font-medium" onClick={() => setIsOpen(false)}>
               Messages
            </Link>
            <Link href="/pricing" className="p-3 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-3 font-medium" onClick={() => setIsOpen(false)}>
               Pricing & Credits
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar;