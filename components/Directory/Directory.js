import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

import AmenityBtn from './components/AmenityBtn';




export default function Map({ strings, locale, locales}) {
  let router = useRouter();
  console.log(strings);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='self-stretch w-full'
    >
      
      <main className='bg-green-100 h-full'>
        <h1 className='text-4xl text-center p-2'>
          { strings.pageTitle }
        </h1>

        {/* Search widgets */}
        <div className='bg-yellow-200 max-w-md'>
          <h4 className='p-2'>{ strings.tapWidget.instructions }</h4>
          <div className='bg-yellow-300 p-1
            flex justify-around
          '>          
            <AmenityBtn label={ strings.tapWidget.br_label } />
            <AmenityBtn label={ strings.tapWidget.water_label } />
            <AmenityBtn label={ strings.tapWidget.firstaid_label } />
            <AmenityBtn label={ strings.tapWidget.donations_label } />
          </div>

          {/* Search results list-view pane */}
          <div className='bg-blue-200'>
            <header className='text-xl p-2'>Amenity name</header>
            <div className='bg-blue-100'>
              Amenity locations, list-view
            </div>
          </div>
        </div>      
      </main>

    </motion.div>
  )
}