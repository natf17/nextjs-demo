import React from 'react';
import Image from 'next/image';
import { BathroomLocationSchema } from '../../../shared/models/GetBathroomLocations';
import { DonationLocationSchema } from '../../../shared/models/GetDonationLocations';
import { FirstAidSchema } from '../../../shared/models/GetFirstAidLocations';
import { WaterFountainSchema } from '../../../shared/models/GetWaterFountainLocations';

export type Props = BathroomLocationSchema | DonationLocationSchema | FirstAidSchema | WaterFountainSchema;

export default function LocationResultsItem(props: Props) {
  const { name, location, featImg, note } = props;
  

  // Bathroom-specific props
  const { gender = null } = props;

  // Donations-specific props
  const { paymentTypesAccepted = null } = props;


  return (
    <div className='
      flex
    '>
      {/* Thumbnail */}
      <div className='
        w-20 h-20 overflow-hidden relative
        flex justify-center items-center
      '>
        { featImg && 
          <Image 
            src={ `${process.env.NEXT_PUBLIC_IMG_API + featImg.url}` } 
            alt={ name }
            width={ featImg.width } // insert dimensions, should be sq
            height={ featImg.height }
          />
        }
        
      </div>

      {/* Amenity quick-view */}
      <div className='p-2'>
        <h3 className='text-lg font-medium'>{name}</h3>
        <div>
          {location && location.fullname}, {gender}, {isWheelchairAccessible}, {paymentTypesAccepted}
          {note}
        </div>
      </div>

    </div>
  )
}
