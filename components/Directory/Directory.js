import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

import AmenityBtn from './components/AmenityBtn';
import LocationResults from './components/LocationResults';




export default function Map({ 
  strings, bathroomLocations, waterFtnLocations, 
  firstAidLocations, donationLocations}) {
  const router = useRouter();
  
  const AMENITIES = {
    bathroom: {
      id: 'bathroom',
      locations: bathroomLocations
    },
    waterFountain: {
      id: 'waterFountain',
      locations: waterFtnLocations
    },
    firstAid: {
      id: 'firstAid',
      locations: firstAidLocations
    },
    donation: {
      id: 'donation',
      locations: donationLocations
    }
  }

  const onLocationSelect = ({amenityId, localizedName}) => {
    router.push(`?amenityId=${amenityId}&amenityLocalizedName=${localizedName}`, undefined, { shallow: true });
    console.log(AMENITIES[router.query.amenityId]);
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

        {/* Search widgets */}
        <div className='bg-yellow-200 max-w-md'>
          <h4 className='p-2'>{ strings.tapWidget.instructions }</h4>
          <div className='bg-yellow-300 p-1
            flex justify-around
          '>          
            <AmenityBtn onClick={onLocationSelect} amenityId={AMENITIES.bathroom.id} label={ strings.tapWidget.br_label } />
            <AmenityBtn onClick={onLocationSelect} amenityId={AMENITIES.waterFountain.id} label={ strings.tapWidget.water_label } />
            <AmenityBtn onClick={onLocationSelect} amenityId={AMENITIES.firstAid.id} label={ strings.tapWidget.firstaid_label } />
            <AmenityBtn onClick={onLocationSelect} amenityId={AMENITIES.donation.id} label={ strings.tapWidget.donations_label } />
          </div>

          {/* Search results list-view pane */}
          <div className='bg-blue-200'>
            <header className='text-xl p-2'>{ router.query.amenityLocalizedName }</header>
            <div className='bg-blue-100'>
              <div>Amenity locations, list-view</div>
              <div>amenityId: { router.query.amenityId }</div>
              <div>
                <LocationResults locations={ AMENITIES[router.query.amenityId].locations } />
              </div>
            </div>
          </div>
        </div>      
      </main>

    </motion.div>
  )
}