import React from "react";

function Arkhammcarousel(){
  return(

      <div id="default-carousel" data-carousel="slide" className="bg-gradient-to-r from-lime-400 via-lime-200 to-lime-400 relative">

          <div className="bg-lime overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">

          <div className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-0" data-carousel-item="active">
          </div>

          <div className="duration-700 ease-in-out absolute inset-0 transition-all transform translate-x-full" data-carousel-item="">
          </div>

          <div className="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="">
          </div>

          <div className="hidden duration-700 ease-in-out absolute inset-0 transition-all transform" data-carousel-item="">
          </div>

          <div className="duration-700 ease-in-out absolute inset-0 transition-all transform -translate-x-full" data-carousel-item="">
          </div>
          </div>

          <div className="flex absolute bottom-5 left-1/2 space-x-3 -translate-x-1/2">
          <button type="button" className="w-3 h-3 rounded-full bg-white dark:bg-gray-800" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
          <button type="button" className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
          <button type="button" className="w-3 h-3 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
          </div>

          <button type="button" className="flex absolute top-0 left-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev="">
          <span className="hidden">Previous</span>
          </span>
          </button>
          <button type="button" className="flex absolute top-0 right-0 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-next="">
          <span className="hidden">Next</span>
          </span>
          </button>
      </div>

  )
}

export default Arkhammcarousel;
