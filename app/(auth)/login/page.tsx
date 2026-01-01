import React from 'react'
import Image from 'next/image'


function page() {
  return (
<>
 <div className=''>
  <div className='text-5xl font-bold'>Welcome <span className=' bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white'>BACK</span></div>
  <div className='text-xl  p-1'>Please sign in to your account</div>
  <div className='mt-6 w-full max-w-md mx-auto'>
    <form action="" className='flex flex-col gap-4 w-full'>
      <div className='flex flex-col gap-1'>
        <label htmlFor="login-email" className='text-sm font-semibold '>Name/Email</label>
        <input id="login-email" type="text" className='border-2 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your email' required />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor="login-password" className='text-sm font-semibold '>Password</label>
        <input id="login-password" type="password" className='border-2 text-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your password' required />
      </div>
      <div className='flex justify-center '>
        <button type="submit" className='w-1/2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-orange-500 hover:to-orange-700 transition-colors shadow-xl hover:shadow-black/40'>Login</button>
      </div>
    </form>
  </div>
 </div>
</>
  )
}

export default page
