import React from "react";
import { AmenityId } from "../../../pages/directory";

// import the icons
import { Wc as BathroomIcon } from "@mui/icons-material";
import { LocalDrink as WaterFtnIcon } from "@mui/icons-material";
import { LocalHospital as FirstAidIcon } from "@mui/icons-material";
import { AttachMoney as DonationsIcon } from "@mui/icons-material";

export type Props = {
  label: string;
  onClick: (amenityId: AmenityId) => void;
  amenityId: AmenityId;
  selected: boolean;
};

export default function AmenityBtn({
  label,
  onClick,
  amenityId,
  selected,
}: Props) {
  return (
    <div
      onClick={onClick.bind(null, amenityId)}
      className="cursor-pointer flex flex-col relative"
    >
      <div className="flex justify-center">
        <div
          className={`
            rounded-full bg-gray-900 h-16 w-16 border-4 border-gray-500            
            flex items-center justify-center text-3xl
            ${
              selected &&
              amenityId === "waterFountains" &&
              "border-slate-400 text-teal-300"
            }
            ${
              selected &&
              amenityId === "bathrooms" &&
              "border-slate-400 text-slate-200"
            }
            ${
              selected &&
              amenityId === "firstAid" &&
              "border-slate-400 text-red-300"
            }
            ${
              selected &&
              amenityId === "donations" &&
              "border-slate-400 text-purple-300"
            } 
          `}
        >
          {amenityId === "bathrooms" && <BathroomIcon fontSize="inherit" />}

          {amenityId === "waterFountains" && (
            <WaterFtnIcon fontSize="inherit" />
          )}

          {amenityId === "firstAid" && <FirstAidIcon fontSize="inherit" />}

          {amenityId === "donations" && <DonationsIcon fontSize="inherit" />}
        </div>
      </div>
      <div className="text-center text-sm text-zinc-300 pt-1">{label}</div>
      {selected && <div className="absolute -bottom-5 left-1/2">&bull;</div>}
    </div>
  );
}
