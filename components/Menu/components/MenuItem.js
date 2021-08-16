import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuItem(item) {
  
  return (
      <Link href={item.url}>
        <a className='
          flex flex-col 
          bg-yellow-200 p-1
          border border-solid border-gray-400'
        >
          {/* Alignment container */}
          <div className='bg-yellow-700 h-2/3 overflow-hidden
            flex justify-center items-center
          '>
              { item.image &&
                // Size constraining container
                <div className='w-20 h-20 overflow-hidden relative
                  flex justify-center items-center
                '>
                  <Image 
                    src={`${process.env.NEXT_PUBLIC_IMG_API + item.image.url}`} 
                    alt=''
                    width={item.image.width} // insert dimensions, should be sq
                    height={item.image.height}
                  />
                </div>
              }            
          </div>

          {/* Image label */}
          <div className='h-1/3 overflow-hidden text-center'>{ item.label }</div>
        </a>
      </Link>

  )
}
