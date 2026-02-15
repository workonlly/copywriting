import React, { use } from 'react'
import { useState,useEffect } from 'react'
import { getUser } from '@/app/lib/data';
import JobCardi from './card';

function Posts() {
    const API_BASE: any = process.env.NEXT_PUBLIC_API_BASE_URL;
    const[posts,setposts]=useState<any>([]);
    const[loading,setloading]=useState(true);
    useEffect(()=>{
      const jobs=async()=>{
         const id1=await getUser();
            const id=id1?.id;
        const data =await fetch(`${API_BASE}/calls/${id}`);
        const json = await data.json();
        setposts(Array.isArray(json) ? json : []);
        setloading(false);
      };
      jobs();
    }, []);
  return (
        <div className="p-2">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-gray-500 font-medium">Loading posts...</p>
        ) : (
          posts.map((post: any) => (
            <JobCardi 
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

export default Posts
