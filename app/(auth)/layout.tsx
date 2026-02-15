import React from "react";
import Image from "next/image";
import GoogleAuthProvider from "@/components/GoogleAuthProvider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		    <div className='bg-white min-h-screen w-screen flex justify-center items-center flex-col relative p-4 sm:p-6'>
                <div className='w-full sm:w-[90%] md:w-[85%] lg:w-[80%] h-auto sm:h-[85%] md:h-[80%] rounded-lg sm:rounded-xl shadow-2xl flex justify-center items-end relative z-10 bg-white'>
                    <div className='flex flex-col md:flex-row p-1 sm:p-2 relative h-full w-full'>
           {/* Intro Graphics Section - Visible on all screen sizes */}
           <section className="flex relative rounded-xl md:rounded-2xl h-48 sm:h-64 md:h-full w-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex-col justify-center items-center overflow-hidden shadow-2xl">
      {/* Header Copy - Focused on Value/Outcome */}
      <div className="relative z-10 h-full w-full flex flex-col justify-center items-center p-4">
         <img src="/IntroGraphics.svg" alt="Welcome" className="w-full h-full object-contain" />
      </div>
    </section>
    
            {/* Auth Content Section */}
            <section className='rounded-sm h-full w-full p-2 sm:p-3 md:p-2 flex flex-col'> 
             <div className="p-1 sm:p-2 flex justify-center sm:justify-start">
                  <Image src="/logo-1.svg" alt="logo" width={140} height={60} className="sm:w-[160px] sm:h-[70px] md:w-[180px] md:h-[80px] p-1 object-contain bg-gradient-to-r from-purple-400 to-purple-600" />
               </div>
             <GoogleAuthProvider>
               {children}
             </GoogleAuthProvider>
            </section>
                </div>
      </div>
      
      {/* Bottom Logo - Responsive positioning */}
      <div className='absolute left-1/2 bottom-2 sm:bottom-5 -translate-x-1/2 flex flex-col justify-end items-center w-[80%] sm:w-[60%] h-auto sm:h-[21%] rounded-lg sm:rounded-xl z-0 shadow-xl py-2 sm:pb-2'>
        <Image src="/logo-2.svg" alt="logo" width={120} height={40} className="sm:w-[150px] sm:h-[45px] md:w-[180px] md:h-[50px] object-contain" />
      </div>
    </div>
	);
};

export default AuthLayout;
