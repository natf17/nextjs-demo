import React from 'react';
import MenuItem from './MenuItem';


export default function MenuRow({data, objIndexes}) {
  


  return (
    <div>
      {
        objIndexes.map((item) => {
          const label = data[item].label;


          return (
            <MenuItem key={item} label={label} />
          )
        })

      }
    </div>
  );
}
