import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuItem(item) {
  
  return (
    <div>
      <h3>{item.label}</h3>
      <Link href={item.url}>
        <a>{item.label}</a>
      </Link>
      
      {/* Check for image */}
      {item.image && 
        <Image 
        src={`${process.env.NEXT_PUBLIC_IMG_API + item.image.url}`} 
        alt=''
        width={item.image.width}
        height={item.image.height}
      />
      }
      
    </div>
  )
}
