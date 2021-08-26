import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

import AmenityBtn from './components/AmenityBtn';
import LocationResults from './components/LocationResults';

// TODO: CONVERT TO TYPESCRIPT
// TODO: CONVERT TO USING TWIN.MACRO FOR CLASSNAMES
// TODO: FIX ERROR CHECKING AND HANDLING AT PAGE-LEVEL DIRECTORY.JS


export default function Map({ 
  strings, amenityData}) {
  const router = useRouter();
  

  const onLocationSelect = ({amenityId}) => {
    router.push(`?amenityId=${amenityId}`, undefined, { shallow: true });    
  }


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

        {/* Locations Select Pane */}
        <div className='bg-yellow-200 max-w-md'>
          <h4 className='p-2'>{ strings.tapWidget.instructions }</h4>
          <div className='bg-yellow-300 p-1
            flex justify-around
          '>
            <AmenityBtn onClick={onLocationSelect} amenityId={amenityData.bathrooms.id} label={ amenityData.bathrooms.widgetLabel } />
            <AmenityBtn onClick={onLocationSelect} amenityId={amenityData.waterFountains.id} label={ amenityData.waterFountains.widgetLabel } />
            <AmenityBtn onClick={onLocationSelect} amenityId={amenityData.firstAid.id} label={ amenityData.firstAid.widgetLabel } />
            <AmenityBtn onClick={onLocationSelect} amenityId={amenityData.donations.id} label={ amenityData.donations.widgetLabel } />
          </div>

          {/* Search results list-view pane */}
          <div className='bg-blue-200'>
            <header className='text-xl p-2'>
              { amenityData[router.query.amenityId] && amenityData[router.query.amenityId].headingLabel }
            </header>
            <div className='bg-blue-100'>
              { amenityData[router.query.amenityId] && amenityData[router.query.amenityId].locations &&
                <LocationResults locations={ amenityData[router.query.amenityId].locations } />
              }                
            </div>
          </div>
        </div>      
      </main>

    </motion.div>
  )
}