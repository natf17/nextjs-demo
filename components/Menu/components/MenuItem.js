import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuItem(item) {
  
  return (
    <div className="flex max-w-xs bg-yellow-200 border border-solid border-gray-400">
      
      
      <Link href={item.url}>
        <a>
          {/* Image / placeholder */}
          <div>
            { item.image && 
              <Image 
                src={`${process.env.NEXT_PUBLIC_IMG_API + item.image.url}`} 
                alt=''
                width={item.image.width}
                height={item.image.height}
                className=''
              />
            }
          </div>

          {/* Image label */}
          <div>{ item.label }</div>
        </a>
      </Link>
      
      
    </div>
  )
}
