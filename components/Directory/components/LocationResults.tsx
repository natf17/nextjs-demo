import React from "react";
import { AmenityId } from "../../../pages/directory";
import { BathroomLocationSchema } from "../../../shared/models/GetBathroomLocations";
import { DonationLocationSchema } from "../../../shared/models/GetDonationLocations";
import { FirstAidSchema } from "../../../shared/models/GetFirstAidLocations";
import { LocationSchema } from "../../../shared/models/GetMapStrings";
import { WaterFountainSchema } from "../../../shared/models/GetWaterFountainLocations";
import LocationResultsByLevel from "./LocationResultsByLevel";

export type MapLocationItem =
  | BathroomLocationSchema
  | WaterFountainSchema
  | FirstAidSchema
  | DonationLocationSchema;

export type Props = {
  amenityTitle: string;
  amenityId: AmenityId;
  locations?: MapLocationItem[];
  locationData: LocationSchema[];
};

export default function LocationResults({
  amenityTitle,
  locations,
  amenityId,
  locationData,
}: Props) {
  return (
    // Grid container
    <div>
      <div className="px-1">
        {/* If no selected amenity */}

        {/* If selected amenity */}

        <header className="text-3xl p-4 text-slate-200">
          {" "}
          {amenityTitle}{" "}
        </header>

        {locations && (
          <LocationResultsByLevel
            locations={locations}
            locationData={locationData}
            amenityId={amenityId}
          />
        )}
      </div>
    </div>
  );
}
