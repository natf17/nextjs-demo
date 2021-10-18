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
      className='w-full'
    >
      <Head><title>{strings.pageTitle}</title></Head>
      
      <Link href="/menu"><a className='block h-full'>
        <div className='h-full'>
          <h1 className='text-left text-6xl'>{strings.welcomeText}</h1>
          <h3 className='text-left text-3xl'>{strings.tapToContinuePrompt}</h3>                  
        </div>
      </a></Link>
    </motion.div>
  )
}