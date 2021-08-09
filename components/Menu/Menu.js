import { motion } from 'framer-motion';

import MenuRow from './components/MenuRow';


export default function Home({ strings }) {

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      
      <main>

        <h1 className="text-3xl text-left">
        { strings.pageTitle }
        </h1>

        {/* Directory */}
        <h3 className='text-2xl text-left'>{ strings.directory.title }</h3>
        <MenuRow 
          menuItems={ strings.directory.menuItems } 
        />


        {/* Events */}
        <h3 className='text-2xl text-left'>{ strings.events.title }</h3>
        <MenuRow menuItems={ strings.events.menuItems } />



      </main>

    </motion.div>
  )
}
