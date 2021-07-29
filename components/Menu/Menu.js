import styles from './../../styles/Home.module.css';

import { useRouter } from 'next/router';
import Image from 'next/image';
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

        <h3>{ strings.directory.title }</h3>
        <ul>
          <li>{ strings.directory.bathrooms.label }</li>
          <Image 
            src={ `${process.env.NEXT_PUBLIC_IMG_API + strings.directory.bathrooms.image.url}` }
            alt={ strings.directory.bathrooms.label }
            width={ strings.directory.bathrooms.image.width }
            height={ strings.directory.bathrooms.image.height}
          />

          <li>{ strings.directory.waterFountains.label }</li>
          <li>{ strings.directory.firstAid.label }</li>
          <li>{ strings.directory.donations.label }</li>
          <li>{ strings.directory.viewAll.label }</li>
        </ul>



        <h3>{ strings.directory.title }</h3>

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
