import React from "react";
import { AmenityId } from "../../../pages/directory";
import { BathroomLocationSchema } from "../../../shared/models/GetBathroomLocations";
import { DonationLocationSchema } from "../../../shared/models/GetDonationLocations";
import { FirstAidSchema } from "../../../shared/models/GetFirstAidLocations";
import { LocationSchema } from "../../../shared/models/GetMapStrings";
import { WaterFountainSchema } from "../../../shared/models/GetWaterFountainLocations";
import LocationResultsItem from "./LocationResultsItem";

export type MapLocationItem =
  | BathroomLocationSchema
  | WaterFountainSchema
  | FirstAidSchema
  | DonationLocationSchema;
type Props = {
  locations: MapLocationItem[];
  locationData: LocationSchema[];
  amenityId: AmenityId;
};

function LocationResultsByLevel({
  locations: results,
  locationData: localizedLocationData,
  amenityId,
}: Props) {
  return (
    <>
      {localizedLocationData.map((locationArea) => {
        // Display by level
        if (
          results.some(
            (item) => item.location.level_name === locationArea.level_name
          )
        ) {
          return (
            <div className="mb-5" key={locationArea.level_num}>
              <header className="text-base text-emerald-300 uppercase border-b-2 border-emerald-100">
                {locationArea.fullname}
              </header>

              <div className="divide-y divide-gray-500">
                {results
                  .filter(
                    (item) =>
                      item.location.level_name === locationArea.level_name
                  )
                  .map((item) => (
                    <LocationResultsItem
                      key={item.id}
                      amenityId={amenityId}
                      {...item}
                    />
                  ))}
              </div>
            </div>
          );
        }
        // if no results for this location area, skip and continue loop
        return false;
      })}
    </>
  );
}

export default LocationResultsByLevel;
