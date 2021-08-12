import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuItem(item) {
  
  return (
    <div className="
      flex flex-none
      bg-yellow-200 p-1
      border border-solid border-gray-400"
    >
      
      
      <Link href={item.url}>
        <a>
          {/* Image / placeholder */}
          <div className="bg-yellow-700">
            {/* { item.image && 
              <Image 
                src={`${process.env.NEXT_PUBLIC_IMG_API + item.image.url}`} 
                alt=''
                width={item.image.width}
                height={item.image.height}
                className="w-16"
              />
            } */}
          </div>

          {/* Image label */}
          <div>{ item.label }</div>
        </a>
      </Link>
      
      
    </div>
  )
}
