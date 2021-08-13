import React from 'react';
import MenuItem from './MenuItem';


export default function MenuRow({title, menuItems}) {
  return (

    <div className='py-6'>
      <h3 className='text-2xl text-left p-2'>{title}</h3>

      <div className='
      bg-green-100 sm:bg-green-300 p-2 
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
    </div>
  );
}
