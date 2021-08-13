import { motion } from 'framer-motion';

import MenuRow from './components/MenuRow';


export default function Home({ strings }) {

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // stretch to fill height of container
      className='self-stretch w-full'
    >
      
      <main className='bg-green-100 h-full'>

        <h1 className='text-4xl text-center p-2'>
        { strings.pageTitle }
        </h1>

        {/* Directory */}
        <MenuRow
          title={ strings.directory.title }
          menuItems={ strings.directory.menuItems } 
        />


        {/* Events */}
        <MenuRow 
          title={strings.events.title }
          menuItems={ strings.events.menuItems } 
        />



      </main>

    </motion.div>
  )
}
