import React from "react";
import { AmenityId } from "../../../pages/directory";
import { BathroomLocationSchema } from "../../../shared/models/GetBathroomLocations";
import { DonationLocationSchema } from "../../../shared/models/GetDonationLocations";
import { FirstAidSchema } from "../../../shared/models/GetFirstAidLocations";
import { LocationSchema } from "../../../shared/models/GetMapStrings";
import { WaterFountainSchema } from "../../../shared/models/GetWaterFountainLocations";
import LocationResultsByLevel from "./LocationResultsByLevel";

export type Props = {
  amenityTitle: string;
  amenityId: AmenityId;
  locations?:
    | BathroomLocationSchema[]
    | WaterFountainSchema[]
    | FirstAidSchema[]
    | DonationLocationSchema[];
  locationData: LocationSchema[];
};

export default function LocationResults({
  amenityTitle,
  locations,
  amenityId,
  locationData,
}: Props) {
  return (
    <div className="bg-gray-500 bg-opacity-30 px-1 rounded-tl-lg">
      <header className="text-3xl p-4 text-slate-200"> {amenityTitle} </header>

      {locations && (
        <LocationResultsByLevel
          locations={locations as BathroomLocationSchema[]}
          locationData={locationData}
        />
      )}
    </div>
  );
}
