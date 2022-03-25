import React from "react";
 function Newsletter(){
   return(
     <div>
          <div className="mx-4 md:mx-12 py-8 md:py-12 grid place-content-center px-4 md:px-0">
              <div className="lg:flex justify-start lg:gap-28">
                  <div className>
                      <h1 className="font-bold text-5xl text-white">Newsletter</h1>
                      <p className="pt-8 md:pt-4 text-white">Sign up for our newsletter and get weekly updates. We only send emails about our latest products on the market once a week every Friday.</p>
                      <div className="mt-8 md:flex justify-start md:gap-4">
                          <input type="email" placeholder="Your Email" className="placeholder-gray-600 w-full md:w-1/2 p-4 grid place-items-center border rounded-md focus:outline-none" />
                          <button className="w-full md:w-auto bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-black px-8 py-4 rounded-md hover:bg-indigo-700 grid place-items-center font-semibold mt-4 md:mt-0 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Subscribe</button>
                      </div>
                      <p className="pt-4 text-xs text-white">Read our <u className="cursor-pointer no-underline hover:underline">privacy policy</u></p>
                  </div>
                  <div className="pt-8 lg:pt-0">
                      <img src="/ark.png" width={200} height={250} className="rounded-full hidden lg:block" />
                      <img src="/ark.png" width={200} height={250} className="rounded-full hidden sm:block lg:hidden" />
                      <img src="/ark.png" width={200} height={250} className="rounded-full sm:hidden" />
                  </div>
              </div>
          </div>
      </div>

   )
 }

 export default Newsletter;
