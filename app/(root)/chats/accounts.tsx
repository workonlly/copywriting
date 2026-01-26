"use client";
import { useState, useEffect } from "react";
import { getUser } from "@/app/lib/data";
function Accounts() {
     const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const initLayout = async () => {
      const data = await getUser();
      setUserData(data);
    };
    initLayout();
  }, []);

  return (
    <div className="flex flex-row gap-3 items-center p-4 hover:bg-violet-50 cursor-pointer border-b border-gray-100 transition-colors">
            <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {userData?.name ? userData.name.charAt(0).toUpperCase() : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 fill-current">
          <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
        </svg>
      )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate text-gray-900">{userData?.name}</h3>
            </div>
          </div>
  )
}

export default Accounts
