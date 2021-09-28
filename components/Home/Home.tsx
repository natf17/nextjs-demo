import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Props } from '../../pages';

export default function Home({ strings }:Props) {


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head><title>{strings.venueName}</title></Head>

      <main>
        <h1>{strings.venueName}</h1>

        <div>    
          <Link href="/menu">Menu</Link>
        </div>
      </main>
    </motion.div>
  )
}