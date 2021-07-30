import React from 'react';
import MenuItem from './MenuItem';


export default function MenuRow({menuItems}) {
  return (
    menuItems.map((item) => {
      return (
        <MenuItem
          key={item.id}
          {...item}
        />
      )
    })
  );
}
