import React from 'react';
import Image from 'next/image';
import { AmenityId } from '../../../pages/directory';
import { MapImages } from '../../../shared/models/GetMapStrings';

export type Props = {
  selectedAmenity: AmenityId | undefined,
  maps: MapImages
}

export default function DirectoryMap({selectedAmenity, maps}: Props) {
  return (
    <div className="bg-gray-400 md:w-96 lg:w-3/5">
      { selectedAmenity ? 

        <Image 
        src={ `${process.env.NEXT_PUBLIC_IMG_API + maps[selectedAmenity].url}` } 
        alt={ '' }
        width={ maps[selectedAmenity].width }
        height={ maps[selectedAmenity].height }
        layout="responsive"
        />
        
        :

        <Image 
        src={ `${process.env.NEXT_PUBLIC_IMG_API + maps.default.url}` } 
        alt={ '' }
        width={ maps.default.width }
        height={ maps.default.height }
        
        />
      }
    </div>
  )
}
