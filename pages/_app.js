import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from './../components/shared/Layout';
import Head from 'next/head';



// Global values (see note below)
import headerLogo from '../public/headerLogo.svg';
const globalValues = {
  header: {
    title: "Queens Assembly Hall",
    logo: headerLogo
  }
}



function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout globalValues={globalValues}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={ router.pathname } />
      </AnimatePresence>
    </Layout>
  );
}

/*
Note: This page will need to be updated whenever global shared layout 
values, such as the header and footer content, change. This is an active
discussion point in https://github.com/vercel/next.js/discussions/10949.
Current status is waiting on how the team decides to solve the issues 
surrounding having dynamic content in sections of a page while preserving
SSG performance
*/

export default MyApp
