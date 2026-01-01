import React from 'react'
import Navbar from '../navbar'

function page() {
  return (
    <div>
      <Navbar></Navbar>
      <div className='text-3xl font-bold mx-5 bg-gradient-to-r from-orange-400 to-orange-600 text-white p-2'>
        Profile
      </div>
      <div>
        <div><img src="" alt="" /></div>
        <div>Name: </div>
        <div>Email: </div>
        <div>Member since: </div>
        
      </div>
    </div>
  )
}

export default page
