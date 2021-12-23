import React, { useState } from 'react';
import { KeyboardArrowDown as DownArrowIcon } from '@material-ui/icons';

type OptionPickerProps = {
  initialValue: string,
  options: {value: string, label: string}[],
  onSelect: (selectedValue: string) => void
}


export default function OptionPicker({initialValue, options, onSelect}: OptionPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  
  if (!options)           return null;
  if (options.length < 1) return null;

  const moreThanOne = options.length > 1;

  const handleSelect: (selectedValue: string) => void = (selectedValue) => {
    // update selection
    setSelectedValue(selectedValue)
    // close dropdown
    setOpen(false);
    // call callback
    onSelect(selectedValue);
  }
  
  return (
    <div>
      {/* Button */}
      <button 
        className={`
          border border-green-600 rounded-md
          px-2 py-2 text-green-300          
        `}
        onClick={() => moreThanOne && setOpen((prev) => !prev)}
      >
        <div className={`inline-block max-w-sm overflow-hidden whitespace-nowrap overflow-ellipsis`}>
          { options.filter((option) => option.value === selectedValue)[0].label }
        </div>
        { moreThanOne && <DownArrowIcon />}
      </button>

      {/* Dropdown */}
      { open && 
        <ul className={`
            border border-green-800 text-green-400 
            rounded-md p-2 px-4 max-w-xs bg-black bg-opacity-50
            divide-y divide-green-800
          `}
        >
          { options.map((option) => (
              <li key={option.value}
                  className={`py-3 cursor-pointer`}
                  onClick={() => handleSelect(option.value)}
              >{option.label}</li>
            ) 
          )}
        </ul>
      }
    </div>
  )
}
