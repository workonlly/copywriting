import React from "react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		    <div className='bg-white h-screen w-screen flex justify-center items-center flex-col relative'>
                <div className='w-[80%] h-[80%] rounded-xl shadow-2xl  flex justify-center items-end relative z-10 bg-white'>
                    <div className='flex md:flex-row sm:flex-col  p-2 relative h-full w-full'>
           <section className="relative rounded-2xl h-full w-full bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 flex flex-col justify-center items-start  overflow-hidden shadow-2xl">

      {/* Header Copy - Focused on Value/Outcome */}
      <div className="relative z-10  h-full w-full flex flex-col justify-center items-start ">
         <img src="/introGraphics.svg" alt="" />
      </div>
    </section>
            <section className=' rounded-sm h-full w-full  p-2 flex flex-col'> 
             <div className="p-2 ">
                  <Image src="/copy-logo.png" alt="logo" width={120} height={50} className="w-auto h-auto object-contain  bg-gradient-to-r from-purple-400 to-purple-600 " />
               </div>
             {children}
            </section>
                </div>
      </div>
      <div className='absolute left-1/2 bottom-5  -translate-x-1/2 flex flex-col justify-end items-center  w-[60%] h-[21%] rounded-xl z-0 shadow-xl pb-2'>
        <Image src="/copy-logo.png" alt="logo" width={120} height={50} className="w-auto h-auto object-contain " />
      </div>
    </div>
	);
};

export default AuthLayout;
