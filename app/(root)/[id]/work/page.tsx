'use client';

import{ useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Bid from './bid';


interface Job {
  key: number;
  id: number;
  headline: string;
  description: string;
  cost: number;
  type: string;
  deadline: string;
  location: string;
  status?: string; 
  progress?: string;
  image_url: string[];
  links: string[];
  created_at: string;
}

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        
        const url = `${API_BASE}/calls/work/${id}`;
        console.log('Fetching from URL:', url);
        
        const res = await fetch(url, {
          cache: 'no-store',
        });

        console.log('Response status:', res.status);

        if (!res.ok) {
          throw new Error(`Failed to fetch job details (Status: ${res.status})`);
        }

        const data = await res.json();
      
        const jobData = Array.isArray(data) ? data[0] : data;
        
        if (!jobData || Object.keys(jobData).length === 0) {
          throw new Error('API returned empty data');
        }
        
        // Map API response to our interface (API uses 'heading', we use 'headline')
        const mappedJob: Job = {
          ...jobData,
          headline: jobData.heading || jobData.headline,
          key: jobData.id,
        };
        
        setJob(mappedJob);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchJob();
    }
     
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-2">Loading job details...</p>
          <p className="text-sm text-gray-400">ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-2">{error || 'Job not found'}</p>
          <p className="text-sm text-gray-500 mb-4">Check the browser console for more details</p>
          <Link href="/" className="text-blue-600 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(job.deadline).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });


  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-1">


        <div className="bg-white rounded-lg shadow-lg border border-violet-300 overflow-hidden">
          
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-2 mb-3">
              <span className="font-bold text-xl">TYPE : </span>
              <span className="bg-violet-500 text-xl text-white  px-2  rounded">
                {job.type}
              </span>
              <span className="font-bold text-xl">STATUS : </span> 
              <span className=" text-white  text-xl bg-violet-500 px-2  rounded">
                 {job.progress}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {job.headline}
            </h1>
            
            <p className="text-2xl font-semibold text-black"><span className='text-gray-700 font-bold'>DESIRED COST </span> <span className=' text-xl bg-black text-white rounded-sm p-1'>₹{job.cost}</span></p>
          </div>

          {job.image_url && job.image_url.length > 0 && (
            <div className="p-6 border-b border-gray-200">
              {job.image_url.length >0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {job.image_url.map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={`Gallery ${i}`} 
                      className="w-full object-contain rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="p-6 space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {job.description || "No description provided."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {job.type =="Canteen"?"":
              <div>
                <p className="text-sm text-gray-500 mb-1">Deadline</p>
                <p className="font-medium text-gray-900">{formattedDate}</p>
              </div>
              }
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-medium text-gray-900">{job.location || "Remote"}</p>
              </div>
            </div>

            {job.links && job.links.length > 0  && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Links</h3>
                <ul className="space-y-2">
                  {job.links.map((link, i) => (
                    <li key={i}>
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline text-sm break-all"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4">
              <div className="flex justify-center w-full">
                {job.progress == "initiated"?
                <Link href='bid'
                  className="w-full max-w-xs text-center bg-violet-500 text-white py-3 rounded-lg hover:bg-black hover:text-white  transition-colors font-medium">
                  Place a Bid
                </Link>
                :
                <div className="w-full max-w-xs text-center bg-violet-500 text-white py-3 rounded-lg hover:bg-black hover:text-white opacity-50 transition-colors font-medium cursor-not-allowed">
                Bidding Closed
                </div>
                }
                
              </div>
              <p className="text-center text-xs text-gray-500 mt-3">
                Posted on {new Date(job.created_at).toLocaleDateString()}
              </p>
            </div>  
          </div>

           <div>
              <Bid></Bid>
           </div>
           
        </div>
      </div>
    </div>
  );
}