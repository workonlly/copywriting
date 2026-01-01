import React from 'react'
import Image from 'next/image'

function Navbar() {
  return (
    <div className='flex flex-row justify-between items-center mx-5  '>
      <div className='flex flex-row items-center'>
        <div className="p-2 ">
         <Image src="/copy-logo.png" alt="logo" width={120} height={50} className="w-auto h-auto object-contain  " />
          </div>
        <div>Location</div>
      </div>

      <div className='flex flex-row items-center gap-3'>
        <div>post your rental job</div>
        <div>Account</div>
        <div>notification</div>
      </div>
    </div>
  )
}

export default Navbar
