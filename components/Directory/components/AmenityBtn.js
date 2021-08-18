import React from 'react';

export default function AmenityBtn({label}) {
  return (
    <div>
      <div className='rounded-full bg-green-50 h-16 w-16
        flex items-center justify-center'>      
      </div>

      <div className='text-center text-sm'>{label}</div>
    </div>
    
  )
}
