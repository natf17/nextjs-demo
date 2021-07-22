import styles from './../../styles/Home.module.css';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';




export default function Home({ strings, locale, locales}) {
  let router = useRouter();


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      
      <main className={styles.main}>
        <h1 className={styles.title}>
        { strings.pageTitle }
        </h1>

        <div>
          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="/menu">
            <a>Menu</a>
          </Link>

          <Link href="/map">
            <a>Map</a>
          </Link>

          <Link href="/events">
            <a>Events</a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </motion.div>
  )
}
