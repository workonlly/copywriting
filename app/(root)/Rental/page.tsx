
'use client';
import React from 'react'
import JobCard from '../card'
import { useEffect,useState } from 'react'
const API_BASE: any = process.env.NEXT_PUBLIC_API_BASE_URL;
function page() {
 const [posts,setposts]=useState<any>(null);
 const [loading,setloading]=useState(true);
 useEffect(()=>{
   const ftcha=async ()=>{
      const data = await fetch(`${API_BASE}/calls/rental`);
      const json = await data.json();
      setposts(json);
      setloading(false);
    }
    ftcha();
  },[]);
  return (
    <div className="p-2">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-gray-500 font-medium">Loading posts...</p>
        ) : (
          posts.map((post: any) => (
            <JobCard 
              key={post.id}
              id={post.id}
              image_url={post.image_url}
              headline={post.heading} 
              description={post.description}
              cost={post.cost}
              deadline={post.deadline}
              type={post.type}
              progress={post.progress}
               location={post.location}
            />
          ))
        )}
      </div>

      {!loading && posts.length === 0 && (
        <p className="text-gray-500">No jobs found in the database.</p>
      )}
    </div>
  )
}

export default page
