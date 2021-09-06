import React from 'react';
import { AmenityId } from '../../../pages/directory';

// import the icons
import { WcSharp as BathroomIcon } from '@material-ui/icons';
import { LocalDrinkSharp as WaterFtnIcon } from '@material-ui/icons';
import { LocalHospitalSharp as FirstAidIcon } from '@material-ui/icons';
import { AttachMoneySharp as DonationsIcon } from '@material-ui/icons';


export type Props = {
  label: string,
  onClick: (amenityId: AmenityId) => void,
  amenityId: AmenityId
}

export default function AmenityBtn({label, onClick, amenityId}: Props) {
  return (
    <div onClick={onClick.bind(null, amenityId)}>
      <div className='rounded-full bg-green-50 h-16 w-16
        flex items-center justify-center'>
          { amenityId === "bathrooms" &&
            <BathroomIcon fontSize="inherit" />
          }
          
          { amenityId === "waterFountains" &&
            <WaterFtnIcon fontSize="inherit" />
          }

          { amenityId === "firstAid" && 
            <FirstAidIcon fontSize="inherit" />
          }

          { amenityId === "donations" && 
            <DonationsIcon fontSize="inherit" />
          }
      </div>

      <div className='text-center text-sm'>{label}</div>
    </div>
    
  )
}
