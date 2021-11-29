import React, { useState } from 'react';
import { KeyboardArrowDown as DownArrowIcon } from '@material-ui/icons';

type OptionPickerProps = {
  currentValue: string,
  options: {value: string, label: string}[],
  onSelect: (selectedValue: string) => void
}


export default function OptionPicker({currentValue, options, onSelect}: OptionPickerProps) {
  const [open, setOpen] = useState(false);

  if (!options)           return null;
  if (options.length < 1) return null;

  const moreThanTwo = options.length > 2;

  const handleSelect: (selectedValue: string) => void = (selectedValue) => {
    setOpen(false);
    onSelect(selectedValue);
  }
  
  return (
    <div>
      <button 
        className={`
          border border-green-600 rounded-md
          px-2 py-2 text-green-300
        `}
        onClick={() => setOpen((prev) => !prev)}
      >
        { currentValue }

        { moreThanTwo && <DownArrowIcon />}
      </button>

      { open && 
        <ul className={`
            border border-green-800 text-green-400 
            rounded-md p-2 px-4 max-w-xs bg-black bg-opacity-50
            divide-y divide-green-800
          `}
        >
          { options.map((option) => (
              <li key={option.value} className={`py-3 cursor-pointer`} onClick={() => handleSelect(option.value)}>{option.label}</li>
            ) 
          )}
        </ul>
      }
    </div>
  )
}
