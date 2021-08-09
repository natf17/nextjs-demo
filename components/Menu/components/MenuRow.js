import React from 'react';
import MenuItem from './MenuItem';


export default function MenuRow({menuItems}) {
  return (

    <div className='flex flex-wrap'>
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
