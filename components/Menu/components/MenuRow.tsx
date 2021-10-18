import React from 'react';
import MenuItem from './MenuItem';

import { MenuItem as MenuItemType } from '../../../pages/menu';

export interface Props {
  title: string,
  menuItems?: MenuItemType[]
}

export default function MenuRow({title, menuItems}: Props) {
  return (

    <div className='py-6'>
      <h3 className='text-2xl text-left p-2'>{title}</h3>

      <div className='
        p-2 
        grid gap-x-2 gap-y-2
        grid-cols-menu auto-rows-menu
      '>
        { 
          menuItems &&
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
