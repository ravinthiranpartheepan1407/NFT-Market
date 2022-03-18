import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="bg-background flex items-center justify-center h-screen bg-gray-200">
  <div className="container">
    <div className="bg-black rounded-lg shadow-lg p-5 md:p-20 mx-72">
      <div className="text-center">
        
        <h3 className='text-xl font-serif md:text-3xl mt-10'>Coming Soon</h3>
        <p className="text-md font-serif md:text-xl mt-10"><a className="hover:underline" href="https://www.arkhamm.com">Arkhamm</a> is a blockchain platform to help the students to learn and get a job in Web3 technology </p>
      </div>
    </div>
  </div>
</div>
  )
}
