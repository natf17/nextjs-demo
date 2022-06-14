import React from "react";
import Image from "next/image";
import {
  LocationSchema,
  MapImages,
} from "../../../shared/models/GetMapStrings";
import useMapUIStore from "../useMapUIStore";

export type Props = {
  maps: MapImages;
  locationData: LocationSchema[];
};

export default function DirectoryMap({ locationData }: Props) {
  const availableLevelsZZ = useMapUIStore((state) => state.availableLevels);
  const selectedLevelZZ = useMapUIStore((state) => state.selectedLevelName);
  const selectLevelZZ = useMapUIStore((state) => state.selectLevel);

  const matchedLevelMap = locationData.find(
    (level) => level.level_name === selectedLevelZZ
  )?.map;

  return (
    <div className="w-full max-w-6xl mx-auto drop-shadow-md">
      {/* Select level */}
      <div className="mt-10 px-2 text-center">
        {availableLevelsZZ?.map((level) => (
          <button
            className={`uppercase rounded-lg py-2 px-3 mx-2 ${
              selectedLevelZZ === level.level_name
                ? selectedLevelZZ === "MEZZ"
                  ? "bg-emerald-300"
                  : "bg-indigo-300"
                : "bg-slate-300"
            }`}
            key={level.fullname}
            onClick={() => selectLevelZZ(level.level_name)}
          >
            {level.fullname}
          </button>
        ))}
      </div>

      {matchedLevelMap ? (
        <Image
          src={`${
            process.env.NEXT_PUBLIC_VERCEL_IMG_API + matchedLevelMap.url
          }`}
          alt={""}
          width={matchedLevelMap.width}
          height={matchedLevelMap.height}
          layout="responsive"
          priority
        />
      ) : (
        <div className="px-4 py-8 min-h-[20em] text-gray-200 flex justify-center items-center">
          {/* TODO: Add field in API, then fix hardcoded value here */}
          <h3>ADD CMS: Map not available for selected level</h3>
        </div>
      )}
    </div>
  );
}
