import React from "react";
import { AmenityId } from "../../../pages/directory";
import { BathroomLocationSchema } from "../../../shared/models/GetBathroomLocations";
import { DonationLocationSchema } from "../../../shared/models/GetDonationLocations";
import { FirstAidSchema } from "../../../shared/models/GetFirstAidLocations";
import { WaterFountainSchema } from "../../../shared/models/GetWaterFountainLocations";
import LocationResultsItem from "./LocationResultsItem";

export type Props = {
  amenityTitle: string;
  amenityId: AmenityId;
  locations?:
    | BathroomLocationSchema[]
    | WaterFountainSchema[]
    | FirstAidSchema[]
    | DonationLocationSchema[];
};

export default function LocationResults({ amenityTitle, locations }: Props) {
  return (
    <div className="bg-gray-500 bg-opacity-30 px-1 rounded-tl-lg">
      <header className="text-3xl p-4 text-green-400"> {amenityTitle} </header>

      {/* Here we can perform some logic for different amenityIds */}
      <div className="divide-y divide-gray-500">
        {locations &&
          locations.map((location) => {
            return <LocationResultsItem key={location.id} {...location} />;
          })}
      </div>
    </div>
  );
}
