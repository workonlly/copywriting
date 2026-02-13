'use client';

import { useRouter } from 'next/navigation';
import GoogleLoginBtn from '@/components/GoogleLoginBtn';

function LoginPage() {
  const router = useRouter();

  return (
    <>
      <div className="">
        <div className="text-5xl font-bold">
          Welcome{' '}
          <span className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white">
            BACK
          </span>
        </div>
        <div className="text-xl p-1">Sign in with your Google account</div>
        <div className="mt-6 w-full max-w-md mx-auto flex flex-col items-center gap-6">
          <GoogleLoginBtn />

        </div>
      </div>
    </>
  );
}

export default LoginPage;
