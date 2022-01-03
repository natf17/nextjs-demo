import React from "react";
import { AmenityId } from "../../../pages/directory";
import { motion } from "framer-motion";

// import the icons
import { WcSharp as BathroomIcon } from "@material-ui/icons";
import { LocalDrinkSharp as WaterFtnIcon } from "@material-ui/icons";
import { LocalHospitalSharp as FirstAidIcon } from "@material-ui/icons";
import { AttachMoneySharp as DonationsIcon } from "@material-ui/icons";

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
            ${selected && "border-green-600 text-green-400"}
            flex items-center justify-center text-3xl
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
      <div className="text-center text-base">{label}</div>

      {selected && (
        <motion.div
          className="absolute -bottom-3.5 left-0 right-0 h-px bg-red-300"
          layoutId="underline22"
        />
      )}
    </div>
  );
}
