import React from 'react'
import Image from 'next/image'

function page() {
  return (
   <>
   <div>
      <div className='text-5xl font-bold'>SIGN <span className='text-5xl text-orange-500'> /</span> UP</div>
      <div>
        <div className='font-semibold'>Create an account</div>
        <div>
          <form action="" className="flex flex-col gap-4 w-full max-w-md mt-4">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="signup-name" className="text-xs font-semibold">Name</label>
                <input id="signup-name" type="text" className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-orange-500 text-sm" placeholder="Enter your name" required />
              </div>
              <div className="flex flex-col justify-end gap-1  ">
                <div className="flex flex-col items-center justify-end gap-2 ">
                  <label htmlFor="signup-pic" className="cursor-pointer">
                    <span className="block w-8 h-8 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center hover:bg-orange-200 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.25a8.38 8.38 0 0115 0" />
                      </svg>
                    </span>
                  </label>
                  <input
                    id="signup-pic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="signup-email" className="text-xs font-semibold">Email</label>
              <input id="signup-email" type="email" className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-orange-500 text-sm" placeholder="Enter your email" required />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="signup-password" className="text-xs font-semibold">Password</label>
              <input id="signup-password" type="password" className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-orange-500 text-sm" placeholder="Create a password" required />
            </div>
            <div className="flex justify-center mt-2">
              <button type="submit" className="w-1/2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-colors shadow-xl hover:shadow-black/40">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
   </div>
   </>
  )
}

export default page
