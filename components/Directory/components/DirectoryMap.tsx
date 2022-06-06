import React from "react";
import Image from "next/image";
import { AmenityId } from "../../../pages/directory";
import {
  LocationSchema,
  MapImages,
} from "../../../shared/models/GetMapStrings";
import useMapUIStore from "./../useStore";

export type Props = {
  selectedAmenity: AmenityId | undefined;
  maps: MapImages;
  locationData: LocationSchema[];
};

export default function DirectoryMap({ maps, locationData }: Props) {
  const availableLevelsZZ = useMapUIStore((state) => state.availableLevels);
  const selectedLevelZZ = useMapUIStore((state) => state.selectedLevelName);
  const selectLevelZZ = useMapUIStore((state) => state.selectLevel);

  const mapLevelMatch = locationData.filter(
    (level) => level.level_name === selectedLevelZZ
  )[0];

  return (
    <div className="w-full max-w-6xl mx-auto drop-shadow-md py-6">
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

      {mapLevelMatch ? (
        <Image
          src={`${
            process.env.NEXT_PUBLIC_VERCEL_IMG_API + mapLevelMatch.map.url
          }`}
          alt={""}
          width={mapLevelMatch.map.width}
          height={mapLevelMatch.map.height}
          layout="responsive"
          priority
        />
      ) : (
        <Image
          src={`${process.env.NEXT_PUBLIC_VERCEL_IMG_API + maps.default.url}`}
          alt={""}
          width={maps.default.width}
          height={maps.default.height}
          layout="responsive"
          priority
        />
      )}
    </div>
  );
}
