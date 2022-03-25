import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CybornHeader from "../components/CybornHeader";
import CybornSubscribe from "../components/CybornFooter";
import CybornMain from "../components/CybornMain";
import Arkhammtimeline from "../components/Arkhammtimeline";
import Customers from "/components/Customers";


export default function Home() {
  return (
      <div>
    <Head>
      <title>Arkhamm Web3</title>
      <meta name="description" content="Arkhamm Blockchain" />
      <link rel="apple-touch-icon" sizes="180x180" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/ark.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/ark.png" />
    </Head>


        <CybornHeader />
        <CybornMain />
        <br />
        <br />
        <Arkhammtimeline />
        <Customers />
        <br />
        <CybornSubscribe />


      </div>
  )
}
