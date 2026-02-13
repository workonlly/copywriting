'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function BidPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API_BASE}/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_id: parseInt(jobId),
          amount: parseFloat(amount),
          message: message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to place bid');
      }

      const tokenDeductionRes = await fetch(`${API_BASE}/payment/minusone`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      setSuccess(true);
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-violet-500 p-6">
        <div className="bg-white rounded-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bid Placed Successfully! 1 token deducted</h2>
          <p className="text-gray-600 mb-4">Redirecting back to job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white rounded-lg shadow-lg border border-violet-300 p-8">
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Place a Bid</h1>
          <p className="text-gray-600 mb-6">Submit your bid for this job</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Bid Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-gray-900 mb-2">
                Your Bid Amount *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-700">₹</span>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter your bid amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter the amount in rupees</p>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Cover Letter / Message (Optional)
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the employer why you're the best fit for this job..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">Max 500 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !amount}
              className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-black transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Bid...' : 'Place Bid'}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default BidPage;
