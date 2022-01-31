import React, { useEffect, useState } from "react";
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
  locationData,
  amenityId,
}: Props) {
  const [availableLevels, setAvailableLevels] = useState<
    LocationSchema[] | null
  >(null);
  const [selectedLocation, setSelectedLocation] = useState<
    LocationSchema["level_name"] | null
  >(null);

  // gather available levels & set defaults
  useEffect(() => {
    let levels: LocationSchema[] = [];

    // only add levels with corresponding results for selected POI
    locationData.forEach((location) => {
      if (results.some((i) => i.location.level_name === location.level_name)) {
        levels.push(location);
      }
    });

    // set default location
    if (levels.length > 0 && levels[0]) {
      setSelectedLocation(levels[0].level_name);
    }

    // set available levels
    setAvailableLevels(levels);
  }, [results, locationData]);

  return (
    <>
      <div>
        {/* Display level selection tabs */}
        <div className="border-b-4 border-gray-400">
          {availableLevels?.map((level) => {
            return (
              <div
                key={level.level_num}
                className={`
                    uppercase text-lg
                    p-2 px-4 inline-block cursor-pointer                    
                    ${
                      level.level_name === selectedLocation
                        ? `${
                            level.level_name === "MEZZ"
                              ? "text-emerald-400"
                              : "text-indigo-400"
                          }`
                        : "text-slate-300"
                    }
                  `}
                onClick={() => setSelectedLocation(level.level_name)}
              >
                {/* Return location name */}
                {level.fullname}
              </div>
            );
          })}
        </div>

        {/* Display location results */}
        <div className="divide-y divide-gray-500">
          {selectedLocation &&
            results
              .filter((item) => item.location.level_name === selectedLocation)
              .map((item) => (
                <LocationResultsItem
                  key={item.id}
                  amenityId={amenityId}
                  {...item}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default LocationResultsByLevel;
