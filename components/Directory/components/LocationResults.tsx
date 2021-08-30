import React from 'react';
import { BathroomLocationSchema } from '../../../shared/models/GetBathroomLocations';
import { DonationLocationSchema } from '../../../shared/models/GetDonationLocations';
import { FirstAidSchema } from '../../../shared/models/GetFirstAidLocations';
import { WaterFountainSchema } from '../../../shared/models/GetWaterFountainLocations';
import LocationResultsItem from './LocationResultsItem';

export type Props = {
  amenityTitle: string,
  locations?: BathroomLocationSchema[] | WaterFountainSchema[] | FirstAidSchema[] | DonationLocationSchema[]
}

export default function LocationResults({ amenityTitle, locations }: Props) {
  return (
    <div className='bg-blue-200'>
      <header className='text-xl p-2'> { amenityTitle } </header>

      <div className='bg-blue-100'>
        { locations &&   
          locations.map((location)=> {
            return (
              <LocationResultsItem key={ location.id } {...location} />
            )
          })
        }
      </div>
    </div>
  )
}
