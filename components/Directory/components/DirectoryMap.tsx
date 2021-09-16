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
    <>
      { selectedAmenity ? 

        <Image 
        src={ `${process.env.NEXT_PUBLIC_IMG_API + maps[selectedAmenity].url}` } 
        alt={ '' }
        width={ maps[selectedAmenity].width } // insert dimensions, should be sq
        height={ maps[selectedAmenity].height }
        />
        
        :

        <Image 
        src={ `${process.env.NEXT_PUBLIC_IMG_API + maps.default.url}` } 
        alt={ '' }
        width={ maps.default.width } // insert dimensions, should be sq
        height={ maps.default.height }
        />
      }
    </>
  )
}
