import React from "react";
import {useRouter} from "next/router"
import CybornHeader from "/components/CybornHeader";
import CybornFooter from "/components/CybornFooter";
const Error = () => {
  const router = useRouter();
    return (
      <div>
      <CybornHeader />
      <section className="relative bg-background">

        <img
          className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full"
          src="/Game.png"
        />


        <div className="hidden sm:block sm:inset-0 sm:absolute"></div>

        <div className="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
                <img className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" alt="" />
                <img className="hidden md:block lg:hidden" src="https://i.ibb.co/c1ggfn2/Group-193.png" alt="" />
                <img className="md:hidden" src="https://i.ibb.co/8gTVH2Y/Group-198.png" alt="" />
            </div>
            <div className="w-full lg:w-1/2">
                <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-white">Looks like you have found the doorway to the great nothing</h1>
                <p className="py-4 text-xl font-medium text-white">The content you arere looking for doesn’t exist. Either it was removed, or you mistyped the link.</p>
                <p className="py-2 text-xl font-medium text-white">Sorry about that! Please visit our hompage to get where you need to go.</p>
                <button onClick={()=>{router.push("/")}} className="w-full lg:w-auto my-4 rounded-md font-medium shadow-glow px-1 sm:px-16 py-5 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Go back to Homepage</button>
            </div>
        </div>
        </div>

        </section>
        <CybornFooter />
        </div>
    );
};

export default Error;
