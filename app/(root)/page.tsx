
'use client';
import React from 'react'
import JobCard from './card'
import { useEffect,useState } from 'react'
import Link from 'next/link';
import { useCollege } from '@/components/CollegeContext';

const API_BASE: any = process.env.NEXT_PUBLIC_API_BASE_URL;
function page() {
 const [posts,setposts]=useState<any>(null);
 const [loading,setloading]=useState(true);
 const { college } = useCollege(); // Get selected college from context

 useEffect(()=>{
    const ftcha=async ()=>{
      const data = await fetch(`${API_BASE}/calls/assignment`);
      const json = await data.json();
      setposts(json);
      setloading(false);
    }
    ftcha();
  },[]);

  // Filter posts by selected college
  const filteredPosts = posts?.filter((post: any) => 
    post.location === college.college
  ) || [];

  return (
    <div className="p-2">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <p className="text-gray-500 font-medium">Loading posts...</p>
        ) : (
          filteredPosts.map((post: any) => (
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

      {!loading && filteredPosts.length === 0 && (
        <p className="text-gray-500">No post found<Link href="/postpage" className="px-2 py-2 rounded-lg  text-violet-500 underline font-bold text-2xs  transition-all mr-2">
                                      Create a post. It's free!
                                    </Link></p>
      )}
    </div>
  )
}

export default page
