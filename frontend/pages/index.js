import Head from "next/head";
import { Inter } from "@next/font/google";
import UserInterface from "@/components/UserInterface";
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Elmo 4 Lyfe</title>
        <meta name="description" content="Elmo 4 Lyfe" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <UserInterface />      
      </main>
    </>
  );
}
