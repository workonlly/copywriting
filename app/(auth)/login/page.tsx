'use client';

import { useRouter } from 'next/navigation';
import GoogleLoginBtn from '@/components/GoogleLoginBtn';

function LoginPage() {
  const router = useRouter();

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md space-y-6">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Welcome{' '}
              <span className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white px-2 py-1 rounded">
                BACK
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4">
              Sign in with your Google account
            </p>
          </div>

          {/* Login Button */}
          <div className="w-full flex flex-col items-center gap-4 pt-2">
            <GoogleLoginBtn />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
