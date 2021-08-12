import React from 'react';
import MenuItem from './MenuItem';


export default function MenuRow({menuItems}) {
  return (

    <div className='
    bg-green-100 sm:bg-green-300 p-2 max-w-6xl m-auto
      grid gap-x-2 gap-y-2
      grid-cols-menu auto-rows-menu
    '>
      { 
        menuItems.map((item) => {
          return (
            <MenuItem
              key={item.id}
              {...item}
            />
          )
        }) 
      }
    </div>
  );
}
