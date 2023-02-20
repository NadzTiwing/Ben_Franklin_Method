import Head from 'next/head';
import { Inter } from '@next/font/google';
import Home from './Home';
import { GetServerSideProps } from 'next/types';
import { supabase } from "./../lib/supabaseClient";

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async () => {
  let { data } = await supabase.from('articles').select();

  return {
    props: {
      data,
    },
  };
};

export default function Main({ data }: any) {
  return (
    <>
      <Head>
        <title>Ben Franklin Method</title>
        <meta name="description" content="Writing Practice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className} >
        <Home data={data}/>
      </main>
    </>
  )
}
