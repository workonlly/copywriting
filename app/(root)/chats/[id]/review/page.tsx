"use client";
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';

interface Comment {
  id: number;
  user_id: number;
  comment: string;
  created_at: string;
}

function ReviewPage() {
  const params = useParams();
  const id = params.id as string;
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const data = await fetch(`${API_BASE}/conversation/review/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!data.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const json = await data.json();
        setComments(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReviews();
  }, [id, API_BASE]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block">
          <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-3 font-medium">Loading reviews...</p>
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
          Reviews
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          {comments.length} review{comments.length !== 1 ? 's' : ''} from clients
        </p>
      </div>

      {/* Reviews List */}
      {comments.length === 0 ? (
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
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M7.5 0A1.5 1.5 0 006 1.5v13.5A1.5 1.5 0 007.5 16h9a1.5 1.5 0 001.5-1.5V7.5A1.5 1.5 0 0016.5 6h-5.25m0-3h-5.5a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5h-5.25m0 0a1.5 1.5 0 00-1.5 1.5m0 0h1.5m-1.5 0h-5.25m0 0h-1.5m1.5 0v1.5m-1.5-1.5h5.25m0 0h1.5"
            />
          </svg>
          <p className="text-gray-400 font-medium text-lg">No reviews yet</p>
          <p className="text-gray-500 text-sm mt-1">Start building your reputation by completing jobs</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((review) => (
            <div
              key={review.id}
              className="bg-white border-4 border-black rounded-sm shadow-[6px_6px_0px_0px_rgba(124,58,237,1)] hover:shadow-[3px_3px_0px_0px_rgba(124,58,237,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] p-6"
            >
              {/* Review Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase text-gray-400">Review</p>
                </div>
                <p className="text-xs text-gray-400 italic ml-2 whitespace-nowrap">
                  {formatDate(review.created_at)}
                </p>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <p className="text-sm text-gray-700 leading-relaxed break-words">
                  {review.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Section */}
      {comments.length > 0 && (
        <div className="mt-8 p-4 bg-violet-50 border-2 border-violet-200 rounded-lg">
          <h3 className="font-bold text-violet-900 mb-2">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-violet-600 font-semibold uppercase">Total Reviews</p>
              <p className="text-2xl font-black text-violet-700">{comments.length}</p>
            </div>
            <div>
              <p className="text-xs text-violet-600 font-semibold uppercase">Latest Review</p>
              <p className="text-sm text-violet-700 font-semibold">
                {formatDate(comments[0].created_at)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;