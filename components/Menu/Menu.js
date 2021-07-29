import styles from './../../styles/Home.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

import MenuRow from './components/MenuRow';


export default function Home({ strings, directoryIndexes, eventsIndexes}) {
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

        <h3>{ strings.directory.title }</h3>
        <MenuRow data={ strings.directory } objIndexes={ directoryIndexes } />



        <h3>{ strings.events.title }</h3>
        <MenuRow data={ strings.events } objIndexes={ eventsIndexes } />

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
