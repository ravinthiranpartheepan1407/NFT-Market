import React from "react"
import CybornHeader from "/components/CybornHeader"
import CybornFooter from "/components/CybornFooter"
import { useRouter } from "next/router";
function market(){
  const router = useRouter();
  return(
    <div>
    <CybornHeader />
    <section className="relative bg-background">
  <img
    class="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full"
    src="/market.jpg"
  />

  <div class="hidden sm:block sm:inset-0 sm:absolute"></div>

  <div class="relative max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
    <div class="max-w-xl text-center sm:text-left">
      <h1 class="text-3xl text-white font-extrabold sm:text-5xl">
        Explore our NFT Market
        <strong class="font-extrabold text-white sm:block">
          Want to list and sell your NFT?
        </strong>
      </h1>

      <p class="max-w-lg mt-4 text-white sm:leading-relaxed sm:text-xl">
        Create, Manage, and List your NFT in our market with low gas fee.
      </p>

      <div class="flex flex-wrap gap-4 mt-8 text-center">
        <button onClick={()=>router.push("/nft/create")} class="block w-full px-12 py-3 text-sm font-medium text-black rounded shadow bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 sm:w-auto active:bg-lime-100 hover:bg-lime-300 focus:outline-none focus:ring">
          Create
        </button >

        <button onClick={()=>router.push("/nft/home")}  class="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-black sm:w-auto focus:outline-none focus:ring">
          Explore & Buy NFTs
        </button >
      </div>
    </div>
  </div>
</section>
<CybornFooter />
</div>
  )
}

export default market;
