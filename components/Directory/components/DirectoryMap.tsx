import React from "react";
import Image from "next/image";
import { AmenityId } from "../../../pages/directory";
import { MapImages } from "../../../shared/models/GetMapStrings";
import useMapUIStore from "./../useStore";

export type Props = {
  selectedAmenity: AmenityId | undefined;
  maps: MapImages;
};

export default function DirectoryMap({ selectedAmenity, maps }: Props) {
  const availableLevelsZZ = useMapUIStore((state) => state.availableLevels);
  const selectedLevelZZ = useMapUIStore((state) => state.selectedLevelName);
  const selectLevelZZ = useMapUIStore((state) => state.selectLevel);

  return (
    <div className="bg-slate-700 bg-opacity-20 w-full max-w-6xl mx-auto drop-shadow-md">
      {/* Select level */}
      <div className="mt-6 px-2 text-center">
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

      {selectedAmenity ? (
        <Image
          src={`${
            process.env.NEXT_PUBLIC_VERCEL_IMG_API + maps[selectedAmenity].url
          }`}
          alt={""}
          width={maps[selectedAmenity].width}
          height={maps[selectedAmenity].height}
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
