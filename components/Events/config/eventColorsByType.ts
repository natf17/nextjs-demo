import { EventGroupTypes } from "../Events";

const eventColorsByType: {
  [key in EventGroupTypes]: {
    buttons: string;
    month: string;
    event_tile: string;
  };
} = {
  REG: {
    buttons: "shadow-cyan-500/50 text-blue-400",
    month: "border-blue-400",
    event_tile: "bg-blue-900",
  },
  CACO: {
    buttons: "shadow-amber-500/50 text-yellow-400",
    month: "border-yellow-400",
    event_tile: "bg-yellow-900",
  },
  CABR: {
    buttons: "shadow-orange-500/50 text-orange-300",
    month: "border-orange-300",
    event_tile: "bg-orange-900",
  },
  OTHER: {
    buttons: "shadow-cyan-500/50 text-blue-400",
    month: "border-blue-400",
    event_tile: "bg-blue-900",
  },
};

export default eventColorsByType;
