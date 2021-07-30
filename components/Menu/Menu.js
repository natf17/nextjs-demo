import styles from './../../styles/Home.module.css';
import { motion } from 'framer-motion';

import MenuRow from './components/MenuRow';


export default function Home({ strings }) {

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

        {/* Directory */}
        <h3>{ strings.directory.title }</h3>
        <MenuRow menuItems={ strings.directory.menuItems } />


        {/* Events */}
        <h3>{ strings.events.title }</h3>
        <MenuRow menuItems={ strings.events.menuItems } />



      </main>

    </motion.div>
  )
}
