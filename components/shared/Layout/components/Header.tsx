import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  src: string,
  width: number,
  height: number
}

export default function Header({src, width, height}:Props) {  
  return (
    <div className='overflow-hidden h-16
      flex justify-center align-middle
    '>
      {/* To include text: we need some way to make this dynamic, i.e.
      to refresh this information when site language
      changes, etc. */}

      <Link href='/'><a className='flex w-full justify-center align-middle'>
        <Image 
          src={src} 
          alt='logo'
          width={width}
          height={height}          
          layout={'intrinsic'}
        />
      </a></Link>
    </div>
  )
}