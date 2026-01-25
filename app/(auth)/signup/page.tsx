'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from "react";
import { apiPost } from '@/app/lib/api';

function Page() {
  const router = useRouter();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [pic, setpic] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlesumbit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (pic) formData.append("pic", pic);

      const res = await apiPost<{ token: string; user: any }>(
        "/auth/signup",
        formData,
        { isFormData: true }
      );

      localStorage.setItem("token", res.token);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className='text-5xl font-bold'>
          SIGN <span className='text-5xl text-purple-500'> /</span> UP
        </div>

        <div>
          <div className='font-semibold'>Create an account</div>

          <form onSubmit={handlesumbit} className="flex flex-col gap-4 w-full max-w-md mt-4">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="signup-name" className="text-xs font-semibold">Name</label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500 text-sm"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="flex flex-col justify-end gap-1">
                <div className="flex flex-col items-center justify-end gap-2">
                  <label htmlFor="signup-pic" className="cursor-pointer">
                    <span className="w-8 h-8 rounded-full bg-purple-100 border-2 border-purple-400 flex items-center justify-center hover:bg-purple-200 transition">
                      {pic ? (
                        <span className="text-[10px] font-bold text-green-600">FILLED</span>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.25a8.38 8.38 0 0115 0" />
                        </svg>
                      )}
                    </span>
                  </label>

                  <input
                    id="signup-pic"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setpic(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="signup-email" className="text-xs font-semibold">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500 text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="signup-password" className="text-xs font-semibold">Password</label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500 text-sm"
                placeholder="Create a password"
                required
              />
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <div className="flex justify-center mt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-500 hover:to-purple-700 transition-colors shadow-xl hover:shadow-black/40"
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-1 flex items-center justify-center text-gray-700 pr-[50px]">
            <span>Have an ID?</span>
            <button
              type="button"
              className="text-purple-500 font-semibold text-lg hover:underline focus:outline-none transition-colors"
              onClick={() => router.push('/login')}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
