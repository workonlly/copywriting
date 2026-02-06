"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import User from './user';

interface JobType {
  id: number;
  title?: string;
  description?: string;
  created_at?: string;
  progress?: string;
  assigned_user_id?: number;
}

interface UserType {
  id: number;
  name: string;
  email?: string;
  image_url?: string;
  profile_pic?: string;
  avatar?: string;
}

function Bidrun({prog}: {prog?: string}) {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
  
  const [assignedUser, setAssignedUser] = useState<UserType | null>(null);
  const [jobDetails, setJobDetails] = useState<JobType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);
  const [review, setReview] = useState("");

  

  // Get user image
  const getUserImage = (user: UserType | null) => {
    if (!user) return null;
    return user.image_url || user.profile_pic || user.avatar || null;
  };

  // Complete job
  const completeJob = async () => {
    if (!jobId) return;
    if (!window.confirm("Are you sure you want to mark this job as complete?")) return;

    setCompleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/bids/complete/${jobId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          review: review || ""
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error response:", errorText);
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }

      alert("Job marked as complete!");
      router.push("/profile");
    } catch (error) {
      console.error("Error marking job as complete:", error);
      alert("Failed to complete job. Please try again.");
    } finally {
      setCompleting(false);
    }
  };

  // Fetch job and assigned user
  useEffect(() => {
    const fetchJobData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/bids/completed/${jobId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load job details");
        }
        
        const data = await res.json();
        
        // Backend returns user object for the assigned user
        if (data && typeof data === 'object') {
          setAssignedUser(data);
        } else if (Array.isArray(data) && data.length === 0) {
          setError("No pending jobs found");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError("Failed to load job details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [API_BASE]);

  // Loading state
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block">
          <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-3 font-medium">Loading bids...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter">
          Complete Your Work
        </h2>
        <p className="text-gray-500 text-sm mt-2">Review and finalize the job with your assigned freelancer</p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="p-8 text-center">
          <div className="inline-block">
            <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-3 font-medium">Loading job details...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="p-8 text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <p className="text-red-600 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Content - Single Card */}
      {!loading && !error && assignedUser && (
        <div className="max-w-2xl">
          <div className="bg-white border-4 border-black rounded-sm shadow-[6px_6px_0px_0px_rgba(124,58,237,1)] overflow-hidden">
            {/* Card Header - Assigned User Info */}
            <div className="p-6 border-b-2 border-gray-100 bg-gradient-to-r from-white to-violet-50">
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-200 to-violet-400 border-3 border-black overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {getUserImage(assignedUser) ? (
                    <img
                      src={getUserImage(assignedUser)!}
                      alt={assignedUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-lg text-violet-800">
                      {assignedUser.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-lg uppercase">
                    {assignedUser.name || "Freelancer"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {assignedUser.email || "No email provided"}
                  </p>
                  <p className="text-xs text-gray-400 italic mt-1">
                    Assigned to complete this job
                  </p>
                </div>
                {/* Message Icon */}
                <Link
                  href={`/chats/${assignedUser.id}`}
                  title="Send Message"
                  className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded transition-colors flex-shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Job Details Section */}
            <div className="p-6 border-b-2 border-gray-100">
              <p className="text-xs font-bold uppercase text-gray-400 mb-3">Job Details</p>
              <div className="space-y-3 bg-gray-50 p-4 rounded border border-gray-200">
                <div>
                  <p className="text-xs uppercase text-gray-500 font-semibold">Status</p>
                  <p className="text-sm text-gray-700 mt-1 font-semibold">
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold">
                      In Progress
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Review & Feedback Section */}
            <div className="p-6 border-b-2 border-gray-100">
              <label className="text-xs font-bold uppercase text-gray-400 block mb-3">
                Review & Feedback
              </label>
              <div className="relative">
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your feedback about the work completed... (optional)"
                  maxLength={500}
                  className="w-full text-sm border-2 border-gray-300 rounded p-3 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100 resize-none h-32"
                />
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {review.length}/500 characters
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 space-y-3 bg-gray-50 border-t-2 border-gray-100">
              <button
                onClick={completeJob}
                disabled={completing}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-400 text-white font-black uppercase text-sm py-3 rounded transition-all flex items-center justify-center gap-2"
              >
                {completing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Completing Job...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Mark Job as Complete
                  </>
                )}
              </button>
             
            </div>
          </div>

          {/* Info Box */}
          
        </div>
      )}

      {/* No jobs state */}
      {!loading && !error && !assignedUser && (
        <div className="py-16 text-center border-4 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 font-medium text-lg">No pending jobs</p>
          <p className="text-gray-500 text-sm mt-1">You don't have any jobs waiting to be completed</p>
          <button
            onClick={() => router.push("/profile")}
            className="mt-4 px-6 py-2 bg-violet-600 text-white rounded font-semibold hover:bg-violet-700"
          >
            Back to Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Bidrun;