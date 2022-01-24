import React from "react";
import { BathroomLocationSchema } from "../../../shared/models/GetBathroomLocations";
import { LocationSchema } from "../../../shared/models/GetMapStrings";
import LocationResultsItem from "./LocationResultsItem";

type Props = {
  locations: BathroomLocationSchema[];
  locationData: LocationSchema[];
};

function LocationResultsBR({
  locations: bathrooms,
  locationData: localizedLocationData,
}: Props) {
  return (
    <>
      {localizedLocationData.map((locationArea) => {
        // Display by level
        if (
          bathrooms.some(
            (br) => br.location.level_name === locationArea.level_name
          )
        ) {
          return (
            <div className="mb-5" key={locationArea.level_num}>
              <header className="text-base text-emerald-300 uppercase border-b-2 border-emerald-100">
                {locationArea.fullname}
              </header>

              <div className="divide-y divide-gray-500">
                {bathrooms
                  .filter(
                    (br) => br.location.level_name === locationArea.level_name
                  )
                  .map((br) => (
                    <LocationResultsItem key={br.id} {...br} />
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

export default LocationResultsBR;
