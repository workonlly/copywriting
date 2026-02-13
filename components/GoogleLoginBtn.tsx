'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiPost } from '@/app/lib/api';

export default function GoogleLoginBtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError(null);
      const { credential } = credentialResponse;

      // Send the credential token to your backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      }).then((res) => res.json());

      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      
      // Redirect to home after successful login
      setTimeout(() => {
        router.push('/');
      }, 500);
    } catch (err: any) {
      const errorMsg = err.message || 'Google login failed';
      setError(errorMsg);
      console.error('Google login failed:', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Failed to load Google login. Please try again.');
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full max-w-sm">
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center z-10">
              <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
          )}
          <div className="flex justify-center [&>div]:!w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              width="100%"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="w-full max-w-sm bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
