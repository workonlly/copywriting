
import React, { useState } from 'react';
import { indianColleges } from './colleges'; // Your college list
import { useCollege } from '@/components/CollegeContext';

const ExploreColleges = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { college, setCollege } = useCollege();

  // Filter logic: Search by name OR keyword
  const filteredColleges = query === "" 
    ? [] 
    : indianColleges.filter((item) => 
        item.college.toLowerCase().includes(query.toLowerCase()) ||
        item.keyword.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10); // Limit to 10 results for performance

  return (
    <>
      {/* --- DESKTOP BUTTON --- */}
      <div 
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex flex-row gap-2 items-center px-3 py-1.5 rounded-full bg-gray-50 text-gray-500 hover:text-violet-600 font-medium cursor-pointer transition-all border border-transparent hover:border-violet-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <span className='text-xs'>{college?.college || 'Select College'}</span>
      </div>

      {/* --- MOBILE BUTTON --- */}
      <div 
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex flex-row gap-2 items-center px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-violet-50 hover:text-violet-600 font-medium cursor-pointer transition-all border border-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <span className='text-sm flex-1'>{college?.college || 'Select Your College'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* --- THE SEARCH MODAL --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/20 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b">
              <input 
                autoFocus
                type="text"
                placeholder="Search by college name or city..."
                className="w-full p-2 outline-none text-gray-700"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((col) => (
                  <div 
                    key={col.id}
                    onClick={() => {
                      setCollege(col); // Update global college state with full object
                      setIsOpen(false);
                    }}
                    className="p-4 hover:bg-violet-50 cursor-pointer border-b last:border-0"
                  >
                    <p className="text-sm font-semibold text-gray-800">{col.college}</p>
                    <p className="text-xs text-violet-500 uppercase">{col.keyword}</p>
                  </div>
                ))
              ) : (
                query && <div className="p-10 text-center text-gray-400">No colleges found</div>
              )}
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full p-3 text-sm text-gray-500 bg-gray-50 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreColleges;