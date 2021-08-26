import React from 'react';

export default function AmenityBtn({label, onClick, amenityId}) {
  return (
    <div onClick={onClick.bind(null, {amenityId})}>
      <div className='rounded-full bg-green-50 h-16 w-16
        flex items-center justify-center'>      
      </div>

      <div className='text-center text-sm'>{label}</div>
    </div>
    
  )
}
