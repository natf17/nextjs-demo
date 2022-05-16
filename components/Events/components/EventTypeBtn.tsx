import React from "react";
import { EventGroupTypes } from "../Events";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  eventType: EventGroupTypes;
  selected: boolean;
};

const EVENT_TYPE_COLORS = {
  REG: "bg-slate-300/10 border-slate-300 shadow-md shadow-cyan-500/50 text-blue-400",
  CACO: "bg-slate-300/10 border-slate-300 shadow-md shadow-cyan-500/50 text-blue-400",
  CABR: "bg-slate-300/10 border-slate-300 shadow-md shadow-cyan-500/50 text-blue-400",
  OTHER:
    "bg-slate-300/10 border-slate-300 shadow-md shadow-cyan-500/50 text-blue-400",
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
        rounded-full p-4 px-5 mr-4 last:mr-0 border
        text-slate-400 border-slate-500
        ${selected && EVENT_TYPE_COLORS[eventType]}        
      `}
      {...rest}
    >
      <h2
        className={`        
          text-2xl uppercase select-none
          filter drop-shadow-lg          
          text-center                  
        `}
      >
        {children}
      </h2>
    </button>
  );
}
