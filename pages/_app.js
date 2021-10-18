import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from './../components/shared/Layout';
import Head from 'next/head';
import Image from 'next/image';
import bgImage from '../public/bg_flipped.jpeg';



// Global values (see note below)
import headerLogo from '../public/headerLogo.svg';
const globalValues = {
  header: {    
    logo: headerLogo
  }
}

const imageWrapperStyle = {
  position: 'fixed',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
  zIndex: -1
}


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Layout globalValues={globalValues}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* bg image wrapper */}
      <div style={imageWrapperStyle}>
        <Image
          src={bgImage}
          alt='Background image'
          layout='fill'
          objectFit='cover'
          quality={100}
        />        
      </div>

      
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={ router.pathname } />
      </AnimatePresence>
    </Layout>
  );
}

// TODO
/*
Note: This page will need to be updated whenever global shared layout 
values, such as the header and footer content, change. This is an active
discussion point in https://github.com/vercel/next.js/discussions/10949.
Current status is waiting on how the team decides to solve the issues 
surrounding having dynamic content in sections of a page while preserving
SSG performance
*/

export default MyApp
