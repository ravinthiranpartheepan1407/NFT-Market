import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div class="bg-background flex items-center justify-center h-screen bg-gray-200">
  <div class="container">
    <div class="bg-black rounded-lg shadow-lg p-5 md:p-20 mx-72">
      <div class="text-center">
        <h2 class="text-5xl font-Ubuntu font-medium tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
          ARKHAMM
        </h2>
        <h3 class='text-xl font-Ubuntu md:text-3xl mt-10'>Coming Soon</h3>
        <p class="text-md font-Ubuntu md:text-xl mt-10"><a class="hover:underline" href="https://www.arkhamm.com">Arkhamm</a> is a blockchain platform to help the students to learn and get a job in Web3 technology </p>
      </div>
    </div>
  </div>
</div>
  )
}
