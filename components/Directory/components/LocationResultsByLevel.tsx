import { motion } from "framer-motion";
import React from "react";
import { AmenityId } from "../../../pages/directory";
import { LocationSchema } from "../../../shared/models/GetMapStrings";
import LocationResultsItem from "./LocationResultsItem";
import { MapLocationItem } from "./LocationResults";
import useMapUIStore from "../useMapUIStore";

type Props = {
  locations: MapLocationItem[];
  locationData: LocationSchema[];
  amenityId: AmenityId;
};

function LocationResultsByLevel({ locations: results, amenityId }: Props) {
  const selectedLevelZZ = useMapUIStore((s) => s.selectedLevelName);
  const availableLevelsZZ = useMapUIStore((s) => s.availableLevels);
  const selectLevelZZ = useMapUIStore((s) => s.selectLevel);

  const searchResults = results.filter(
    (item) => item.location.level_name === selectedLevelZZ
  );

  return (
    <>
      <div>
        {/* Display level selection tabs */}
        <div className="border-b-4 border-slate-500">
          {availableLevelsZZ?.map((level) => {
            return (
              <div
                key={level.level_num}
                className={`
                    uppercase text-lg relative
                    p-2 px-4 inline-block cursor-pointer                    
                    ${
                      level.level_name === selectedLevelZZ
                        ? `${
                            level.level_name === "MEZZ"
                              ? "text-emerald-300"
                              : "text-indigo-300"
                          }`
                        : "text-slate-300"
                    }
                  `}
                onClick={() => selectLevelZZ(level.level_name)}
              >
                {/* Return location name */}
                {level.fullname}

                {/* Selected tab border */}
                {level.level_name === selectedLevelZZ && (
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
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((item) => (
              <LocationResultsItem
                key={item.id}
                amenityId={amenityId}
                {...item}
              />
            ))
          ) : (
            <div className="p-4 py-6 text-center text-gray-200">
              ADD CMS FIELD: No results in selected level
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LocationResultsByLevel;
