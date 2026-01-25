'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { apiPost } from '@/app/lib/api'; // adjust path if needed

function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await apiPost<{
        token: string;
        user: { id: number; email: string };
      }>('/auth/login', { email, password });
      localStorage.setItem('token', res.token);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="">
        <div className="text-5xl font-bold">
          Welcome{' '}
          <span className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white">
            BACK
          </span>
        </div>
        <div className="text-xl  p-1">Please sign in to your account</div>
        <div className="mt-6 w-full max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <div className="flex flex-col gap-1">
              <label
                htmlFor="login-email"
                className="text-sm font-semibold "
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                className="border-2 text-black border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="login-password"
                className="text-sm font-semibold "
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                className="border-2 text-black border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="flex justify-center ">
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-500 hover:to-purple-700 transition-colors shadow-xl hover:shadow-black/40 disabled:opacity-60"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          <div className="mt-1 flex items-center justify-center text-gray-700 text-base">
            <span>Don't have an ID?</span>
            <button
              type="button"
              className="ml-2 text-purple-500 font-semibold text-lg hover:underline focus:outline-none transition-colors"
              onClick={() => router.push('/signup')}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
