import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LanguagePicker from './LanguagePicker';
import { useRouter } from 'next/router';

type Props = {
  src: string,
  width: number,
  height: number
}

export default function Header({src, width, height}:Props) {  
  const router = useRouter();

  return (
    <div className='overflow-hidden h-16
      inline-grid w-full grid-cols-navBar
      px-10
    '>
      {/* To include text: we need some way to make this dynamic, i.e.
      to refresh this information when site language
      changes, etc. */}

      {/* Region left */}
      <div></div>


      {/* Region center (logo) */}
      <Link href='/'><a className='flex justify-center align-middle'>
        <Image 
          src={src} 
          alt='logo'
          width={width}
          height={height}          
          layout={'intrinsic'}
        />
      </a></Link>

      {/* Region right */}
      <div>
        <LanguagePicker />      
      </div>
    </div>
  )
}