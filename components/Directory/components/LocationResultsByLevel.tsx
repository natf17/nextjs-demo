import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AmenityId } from "../../../pages/directory";
import { LocationSchema } from "../../../shared/models/GetMapStrings";
import LocationResultsItem from "./LocationResultsItem";
import { MapLocationItem } from "./LocationResults";

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
        <div className="border-b-4 border-slate-500">
          {availableLevels?.map((level) => {
            return (
              <div
                key={level.level_num}
                className={`
                    uppercase text-lg relative
                    p-2 px-4 inline-block cursor-pointer                    
                    ${
                      level.level_name === selectedLocation
                        ? `${
                            level.level_name === "MEZZ"
                              ? "text-emerald-300"
                              : "text-indigo-300"
                          }`
                        : "text-slate-300"
                    }
                  `}
                onClick={() => setSelectedLocation(level.level_name)}
              >
                {/* Return location name */}
                {level.fullname}

                {/* Selected tab border */}
                {level.level_name === selectedLocation && (
                  <motion.div
                    className={`
                      absolute -bottom-1 left-0 right-0 h-1
                      ${
                        level.level_name === "MEZZ"
                          ? "bg-emerald-400"
                          : "bg-indigo-400"
                      }
                    `}
                    layoutId="LocationResultsByLevel.tab_border"
                  />
                )}
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
