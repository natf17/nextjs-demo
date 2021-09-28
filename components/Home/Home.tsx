import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Props } from '../../pages/index';

export default function Home({ strings }:Props) {


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head><title>{strings.pageTitle}</title></Head>

      <main>
        <h1>{strings.welcomeText}</h1>
        <h3>{strings.tapToContinuePrompt}</h3>
        <div>    
          <Link href="/menu">Menu</Link>
        </div>
      </main>
    </motion.div>
  )
}