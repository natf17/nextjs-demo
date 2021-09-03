import React from 'react';
import Image from 'next/image';

export default function LocationResultsItem(props) {
  const { name, isWheelchairAccessible, location, featImg, note } = props;
  // Bathroom-specific props
  const { gender = null } = props;
  // Water-specific props
    // none
  // Firstaid-specific props
    // none
  // Donation-specific props
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
