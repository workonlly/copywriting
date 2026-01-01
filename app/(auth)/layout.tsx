import React from "react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		    <div className='bg-white h-screen w-screen flex justify-center items-center flex-col relative'>
                <div className='w-[70%] h-[70%] rounded-xl shadow-2xl  flex justify-center items-end relative z-10 bg-white'>
                    <div className='flex md:flex-row sm:flex-col  p-2 relative h-full w-full'>
           <section className="relative rounded-2xl h-full w-full bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 flex flex-col justify-center items-start p-8 overflow-hidden shadow-2xl">
      
      {/* Decorative Background Elements (Subtle Glows) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      {/* Header Copy - Focused on Value/Outcome */}
      <div className="relative z-10 mb-8 max-w-xs">
        <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight leading-tight">
          Unlock your <br/> next experience.
        </h2>
        <p className="text-orange-100 text-sm font-medium leading-relaxed">
          From application to access in minutes. Join our trusted renting community today.
        </p>
      </div>

      {/* Steps Container */}
      <div className="relative z-10 flex gap-3 w-full">
        
        {/* Service 1: Assignment Rental */}
        <div className="group flex-1 rounded-xl bg-white shadow-xl shadow-orange-900/20 p-4 flex flex-col items-start border border-white transform scale-105 transition-all duration-300">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-600 text-white text-sm font-bold mb-3 shadow-md">
            1
          </div>
          <div className="font-bold text-gray-900 text-sm mb-1">Assignment Rental</div>
          <p className="text-[10px] text-gray-500 font-medium leading-tight">
            Rent ready-made assignments for your coursework.
          </p>
        </div>

        {/* Service 2: Canteen Rental */}
        <div className="flex-1 rounded-xl bg-white/10 backdrop-blur-md p-4 flex flex-col items-start border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white text-sm font-bold mb-3 border border-white/30">
            2
          </div>
          <div className="font-bold text-white text-sm mb-1">Canteen Rental</div>
          <p className="text-[10px] text-orange-100/80 font-medium leading-tight">
            Book canteen space for your events or needs.
          </p>
        </div>

        {/* Service 3: Project & Report Help */}
        <div className="flex-1 rounded-xl bg-white/10 backdrop-blur-md p-4 flex flex-col items-start border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white text-sm font-bold mb-3 border border-white/30">
            3
          </div>
          <div className="font-bold text-white text-sm mb-1">Project & Report Help</div>
          <p className="text-[10px] text-orange-100/80 font-medium leading-tight">
            Get expert help with your projects and reports.
          </p>
        </div>

      </div>
    </section>
            <section className=' rounded-sm h-full w-full  p-2 flex flex-col'> 
             <div className="p-2 ">
                  <Image src="/copy-logo.png" alt="logo" width={120} height={50} className="w-auto h-auto object-contain  bg-gradient-to-r from-orange-400 to-orange-600 " />
               </div>
            
             {children}
            </section>
                </div>
        
      </div>
      <div className='absolute left-1/2 bottom-10  -translate-x-1/2 flex flex-col justify-end items-center  w-[60%] h-[21%] rounded-xl z-0 shadow-xl pb-2'>
        <Image src="/copy-logo.png" alt="logo" width={120} height={50} className="w-auto h-auto object-contain " />
      </div>
    </div>
	);
};

export default AuthLayout;
