import React from "react";
import eventColorsByType from "../config/eventColorsByType";
import { EventGroupTypes } from "../Events";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  eventType: EventGroupTypes;
  selected: boolean;
};

export default function EventTypeBtn({
  eventType,
  selected,
  children,
  ...rest
}: Props) {
  return (
    <button
      className={`
        rounded-full p-2 px-5 mr-4 last:mr-0 border mb-2
        text-slate-400 border-slate-500
        ${
          selected &&
          `bg-slate-300/10 border-slate-300 shadow-md
          ${eventColorsByType[eventType].buttons}`
        }        
      `}
      {...rest}
    >
      <h2
        className={`        
          text-md sm:text-lg uppercase select-none
          filter drop-shadow-lg          
          text-center                  
        `}
      >
        {children}
      </h2>
    </button>
  );
}
