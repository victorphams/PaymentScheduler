import Head from "next/head";
import { Inter } from "@next/font/google";
import UserInterface from "@/components/UserInterface";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>MSCI: Payment Scheduler</title>
        <meta name="description" content="MSCI: Payment Scheduler" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <UserInterface />      
      </main>
    </>
  );
}
