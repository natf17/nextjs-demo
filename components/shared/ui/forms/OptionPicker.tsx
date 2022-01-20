import React, { useEffect, useRef, useState } from "react";
import { KeyboardArrowDown as DownArrowIcon } from "@mui/icons-material";

type OptionPickerProps = {
  initialValue: string;
  options: { value: string; label: string }[];
  onSelect: (selectedValue: string) => void;
};

export default function OptionPicker({
  initialValue,
  options,
  onSelect,
}: OptionPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);
  let dropdownRef = useRef<HTMLUListElement>(null);

  const captureClickOutside = (event: Event) => {
    // check if click happened outside dropdown
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  // runs on mount and unmount
  useEffect(() => {
    document.addEventListener("click", captureClickOutside, false);

    return () => {
      document.removeEventListener("click", captureClickOutside, false);
    };
  });

  const handleSelect: (selectedValue: string) => void = (selectedValue) => {
    // update selection
    setSelectedValue(selectedValue);
    // close dropdown
    setOpen(false);
    // call callback
    onSelect(selectedValue);
  };

  // don't render if no options are provided
  if (!options) return null;
  if (options.length < 1) return null;
  const moreThanOne = options.length > 1;

  return (
    <span className="relative">
      {/* Button */}
      <button
        onClick={(e) => {
          // prevent duplicate handlers (e.g. above document-level close handler)
          // from interfering with open/close state
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className={`
          border px-2 py-2 rounded-md      
          ${moreThanOne ? `text-green-300` : `text-gray-400`}
          ${moreThanOne ? `border-green-600` : `border-gray-400`}
        `}
      >
        <div
          className={`
            inline-block max-w-xs overflow-hidden 
            whitespace-nowrap text-ellipsis align-top
          `}
        >
          {options.filter((option) => option.value === selectedValue)[0].label}
        </div>

        {/* Only show arrow if there are more options */}
        {moreThanOne && <DownArrowIcon />}
      </button>

      {/* Dropdown */}
      {open && moreThanOne && (
        <ul
          className={`
            absolute border border-green-800 text-green-400 
            rounded-md p-2 px-4 w-52 bg-black bg-opacity-90
            divide-y divide-green-800 inline top-8 left-0 z-10
            text-left
          `}
          ref={dropdownRef}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`py-3 cursor-pointer`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
}
