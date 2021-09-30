import React from 'react';
import Image from 'next/image';

type Props = {
  src: string,
  width: number,
  height: number
}

export default function Header({src, width, height}:Props) {
  return (
    <div>
      {/* To include text: we need some way to make this dynamic, i.e.
      to refresh this information when site language
      changes, etc. */}
      
      <Image 
        src={src} 
        alt='logo'
        width={width}
        height={height}
      />
    </div>
  )
}