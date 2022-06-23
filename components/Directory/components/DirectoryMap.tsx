import React, { useEffect, useRef } from "react";
import Image from "next/image";
import GroundSVG_EN from "!@svgr/webpack!../../../public/custom-maps/en/ground.svg";
import MezzSVG_EN from "!@svgr/webpack!../../../public/custom-maps/en/mezz.svg";
import GroundSVG_ES from "!@svgr/webpack!../../../public/custom-maps/es/ground.svg";
import MezzSVG_ES from "!@svgr/webpack!../../../public/custom-maps/es/mezz.svg";
/* import SVG as component while retaining next/image functionality
    https://github.com/vercel/next.js/discussions/30472
*/
import {
  LocationSchema,
  MapImages,
  MapViewConfig,
} from "../../../shared/models/GetMapStrings";
import useMapUIStore from "../useMapUIStore";
import { RestartAltSharp } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import chooseMapAmenity from "../custom-maps/chooseMapAmenity";
import setMapSearchResults from "../custom-maps/setMapSearchResults";

export type Props = {
  maps: MapImages;
  locationData: LocationSchema[];
  mapConfig: MapViewConfig;
};

export default function DirectoryMap({ locationData, mapConfig }: Props) {
  const availableLevelsZZ = useMapUIStore((state) => state.availableLevels);
  const selectedLevelZZ = useMapUIStore((state) => state.selectedLevelName);
  const selectLevelZZ = useMapUIStore((state) => state.selectLevel);
  const selectedAmenityZZ = useMapUIStore((state) => state.selectedAmenity);
  const searchResultsZZ = useMapUIStore((state) => state.searchResults);
  const router = useRouter();

  let GroundSVG = GroundSVG_EN;
  let MezzSVG = MezzSVG_EN;
  if (router.locale === "es") {
    GroundSVG = GroundSVG_ES;
    MezzSVG = MezzSVG_ES;
  }
  const GroundMapSVG = useRef<SVGElement & HTMLElement>(null);
  const MezzMapSVG = useRef<SVGElement & HTMLElement>(null);

  useEffect(() => {
    if (GroundMapSVG && GroundMapSVG.current) {
      chooseMapAmenity({
        selectedAmenity: selectedAmenityZZ,
        SVGMapElem: GroundMapSVG.current,
      });
    }

    if (MezzMapSVG && MezzMapSVG.current) {
      chooseMapAmenity({
        selectedAmenity: selectedAmenityZZ,
        SVGMapElem: MezzMapSVG.current,
      });
    }
  }, [selectedAmenityZZ, selectedLevelZZ]);

  useEffect(() => {
    if (GroundMapSVG && GroundMapSVG.current) {
      setMapSearchResults({
        searchResults: searchResultsZZ,
        SVGMapElem: GroundMapSVG.current,
      });
    }
    if (MezzMapSVG && MezzMapSVG.current) {
      setMapSearchResults({
        searchResults: searchResultsZZ,
        SVGMapElem: MezzMapSVG.current,
      });
    }
  }, [searchResultsZZ, selectedLevelZZ]);

  const matchedLevelMap = locationData.find(
    (level) => level.level_name === selectedLevelZZ
  )?.map;

  const resetAmenitySelection = () => {
    router.replace({ query: { amenityId: null } }, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto drop-shadow-md p-6">
      {/* Select level */}

      <motion.div className="flex mt-10 items-center justify-evenly" layout>
        {/* LayoutGroup and nested motion.layout components for animating shared layout 
        changes as buttons disappear or reappear */}
        <LayoutGroup>
          <motion.div
            className="p-2 text-center rounded-md bg-slate-800 max-w-lg flex justify-center items-center"
            layout
          >
            <h1 className="text-zinc-300 px-2 uppercase">
              {mapConfig.levelSelect}
            </h1>
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
          </motion.div>

          {/* Clear results */}
          <AnimatePresence>
            {selectedAmenityZZ && (
              <motion.button
                className="uppercase rounded-lg py-2 px-3 bg-red-300"
                onClick={resetAmenitySelection}
                key="clearSelectedAmenity"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                <RestartAltSharp fontSize="inherit" /> {mapConfig.clearResults}
              </motion.button>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </motion.div>

      {mapConfig.enableFsCustomMaps ? (
        // CUSTOM MAPS
        <div className="px-10">
          {selectedLevelZZ === "FIRST" && <GroundSVG ref={GroundMapSVG} />}
          {selectedLevelZZ === "MEZZ" && <MezzSVG ref={MezzMapSVG} />}
        </div>
      ) : (
        // Location Maps
        <div className="p-10">
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
            <div className="min-h-[20em] text-gray-200 flex justify-center items-center">
              <h3>{mapConfig.mapNotAvailable}</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
