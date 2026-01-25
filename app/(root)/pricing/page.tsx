"use client";

import React, { useState, useEffect } from 'react';
import CreditDisplay from '../pricing/credits';

function DynamicPricingPage() {
  const [tokens, setTokens] = useState(10);
  const [price, setPrice] = useState(10);

  // 1 Token = 1 Rupee logic
  useEffect(() => {
    setPrice(tokens);
  }, [tokens]);

  const handleInputChange = (e:any) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      setTokens(0);
    } else {
      setTokens(value);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">
            Top Up <span className="text-violet-500 underline decoration-black">Credits</span>
          </h1>
          <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">
            1 Credit = ₹1.00 INR
          </p>
               <div>
            <CreditDisplay  />
               </div>
        </div>

        {/* Dynamic Calculator Box */}
        <div className="border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white relative overflow-hidden">
          {/* Accent Corner */}
          <div className="absolute top-0 right-0 bg-violet-500 w-16 h-16 [clip-path:polygon(100%_0,0_0,100%_100%)] border-l-4 border-b-4 border-black"></div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Input Side */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-black uppercase mb-3 tracking-tight">
                Enter Amount of Tokens
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  value={tokens}
                  onChange={handleInputChange}
                  className="w-full border-4 border-black p-5 text-4xl font-black focus:outline-none focus:bg-orange-50 transition-colors"
                  placeholder="0"
                  min="0"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-400 uppercase text-xs">
                  Tokens
                </div>
              </div>
              <p className="mt-4 text-gray-500 text-sm font-medium">
                * No minimum purchase required.
              </p>
            </div>

            {/* Equals Symbol */}
            <div className="text-4xl font-black md:mt-6">
              =
            </div>

            {/* Result Side */}
            <div className="flex-1 w-full bg-black text-white p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(139,92,246,1)]">
              <label className="block text-[10px] font-black uppercase mb-1 text-violet-500 tracking-widest">
                Total Payable
              </label>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">₹{price}</span>
                <span className="text-lg font-bold text-violet-500 italic">INR</span>
              </div>
            </div>
          </div>

          {/* Quick Add Buttons */}
          <div className="mt-10 flex flex-wrap gap-3">
            {[10, 25, 50, 100].map((amt) => (
              <button 
                key={amt}
                onClick={() => setTokens(amt)}
                className="px-4 py-2 border-2 border-black font-black text-sm hover:bg-violet-500 transition-all active:translate-y-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
              >
                +{amt}
              </button>
            ))}
            <button 
              onClick={() => setTokens(0)}
              className="px-4 py-2 border-2 border-black font-black text-sm hover:bg-gray-200 transition-all text-black"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button 
            disabled={tokens <= 0}
            className={`w-full md:w-auto bg-black text-white px-16 py-5 font-black uppercase text-xl tracking-tighter transition-all border-4 border-black shadow-[10px_10px_0px_0px_rgba(139,92,246,1)] 
              ${tokens > 0 
                ? 'hover:bg-violet-500 hover:text-black active:shadow-none active:translate-x-1 active:translate-y-1 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed'
              }`}
          >
            Buy {tokens} Credits Now
          </button>
        </div>

      </div>
    </div>
  );
}

export default DynamicPricingPage;