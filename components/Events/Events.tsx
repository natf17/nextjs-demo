import styles from './../../styles/Home.module.css';
import { motion } from 'framer-motion';
import { Props } from '../../pages/events';



export default function Events({ strings }: Props) {


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      
      <main>
        <h1>
        {strings.pageTitle}
        </h1>
        
      </main>

    </motion.div>
  )
}
