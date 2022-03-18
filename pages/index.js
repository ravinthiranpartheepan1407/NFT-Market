import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CybornHeader from "../components/CybornHeader";
import CybornSubscribe from "../components/CybornFooter";
import CybornMain from "../components/CybornMain";

export default function Home() {
  return (
      <div>
        <CybornHeader />
        <CybornMain />
        <CybornSubscribe />
      </div>
  )
}
