import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import AmenityBtn from './components/AmenityBtn';
import LocationResults from './components/LocationResults';
import DirectoryMap from './components/DirectoryMap';

import { Props } from './../../pages/directory';
// TODO: CONVERT TO USING TWIN.MACRO FOR CLASSNAMES
// TODO: FIX ERROR CHECKING AND HANDLING AT PAGE-LEVEL DIRECTORY.JS

import { AmenityId as AMENITY_ID } from './../../pages/directory';

export default function Map({ strings, amenityData, maps }: Props) {
  const router = useRouter();
  const [selectedAmenity, setSelectedAmenity] = useState<AMENITY_ID | undefined>(undefined);


  const onLocationSelect = (amenityId: AMENITY_ID) => {
    // map enum to amenity in data
    const selection = amenityData[amenityId];

    // if selection is valid, update the URL
    if (selection) {

      router.push({
        query: { amenityId } 
      }, undefined, {
        shallow: true
      });

    }    
  }
  
  // on URL change
  useEffect(() => {
    // amenityId in url should be a valid selection (ts)
    const amenityId = router.query.amenityId as AMENITY_ID;

    // validate selection
    if (amenityId && amenityData[amenityId]) {
      console.log(`running: ${router.query.amenityId}`);
      setSelectedAmenity(amenityId);
    }
    
  }, [router, amenityData])
  


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
        <div className='bg-yellow-200 sm:max-w-md'>
          <h4 className='p-2'>{ strings.tapWidget.instructions }</h4>
          <div className='bg-yellow-300 p-1
            flex justify-around
          '>
            <AmenityBtn onClick={onLocationSelect} amenityId={'bathrooms'} 
              label={ amenityData.bathrooms.widgetLabel } selected={selectedAmenity === 'bathrooms'} />

            <AmenityBtn onClick={onLocationSelect} amenityId={'waterFountains'} 
              label={ amenityData.waterFountains.widgetLabel } selected={selectedAmenity === 'waterFountains'} />

            <AmenityBtn onClick={onLocationSelect} amenityId={'firstAid'} 
              label={ amenityData.firstAid.widgetLabel } selected={selectedAmenity === 'firstAid'} />

            <AmenityBtn onClick={onLocationSelect} amenityId={'donations'} 
              label={ amenityData.donations.widgetLabel } selected={selectedAmenity === 'donations'} />
          </div>

          {/* Search results list-view pane */}
          { selectedAmenity && 
            <LocationResults 
              amenityTitle={ amenityData[selectedAmenity].headingLabel }
              locations={ amenityData[selectedAmenity].locations }
            />
          }
        </div>
      
        {/* Map view */}
        <div className='bg-gray-400 lg:bg-gray-700'>
          <DirectoryMap 
            selectedAmenity={selectedAmenity} maps={maps} 
           />
        </div>
      </main>

    </motion.div>
  )
}