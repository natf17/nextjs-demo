import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import AmenityBtn from "./components/AmenityBtn";
import LocationResults from "./components/LocationResults";
import DirectoryMap from "./components/DirectoryMap";

import { Props } from "./../../pages/directory";
// TODO: CONVERT TO USING TWIN.MACRO FOR CLASSNAMES
// TODO: FIX ERROR CHECKING AND HANDLING AT PAGE-LEVEL DIRECTORY.JS

import { AmenityId as AMENITY_ID } from "./../../pages/directory";

export default function Map({
  strings,
  amenityData,
  maps,
  locationData,
}: Props) {
  const router = useRouter();
  const [selectedAmenity, setSelectedAmenity] = useState<
    AMENITY_ID | undefined
  >(undefined);

  const onLocationSelect = (amenityId: AMENITY_ID) => {
    // map enum to amenity in data
    const selection = amenityData[amenityId];

    // if selection is valid, update the URL
    if (selection) {
      router.replace(
        {
          query: { amenityId },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  // on URL change
  useEffect(() => {
    // amenityId in url should be a valid selection (ts)
    const amenityId = router.query.amenityId as AMENITY_ID;

    // validate selection
    if (amenityId && amenityData[amenityId]) {
      console.log(`running: ${router.query.amenityId}`);
      setSelectedAmenity(amenityId);
    }
  }, [router, amenityData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="self-stretch w-full"
    >
      <main className="h-full">
        <header className="text-center p-2 py-6 mb-6">
          <h1 className="text-4xl text-blue-50 pb-2">{strings.pageTitle}</h1>
          <p className="text-lg text-gray-300">{strings.pageDescription}</p>
        </header>

        {/* Locations Select Pane */}
        <div className="max-w-2xl mx-auto mb-12 py-2 border-b border-gray-500">
          <div
            className="
            p-1 text-gray-300
            flex justify-around
          "
          >
            <AmenityBtn
              onClick={onLocationSelect}
              amenityId={"bathrooms"}
              label={amenityData.bathrooms.widgetLabel}
              selected={selectedAmenity === "bathrooms"}
            />

            <AmenityBtn
              onClick={onLocationSelect}
              amenityId={"waterFountains"}
              label={amenityData.waterFountains.widgetLabel}
              selected={selectedAmenity === "waterFountains"}
            />

            <AmenityBtn
              onClick={onLocationSelect}
              amenityId={"firstAid"}
              label={amenityData.firstAid.widgetLabel}
              selected={selectedAmenity === "firstAid"}
            />

            <AmenityBtn
              onClick={onLocationSelect}
              amenityId={"donations"}
              label={amenityData.donations.widgetLabel}
              selected={selectedAmenity === "donations"}
            />
          </div>
        </div>

        {/* Map view */}
        <div
          className={`
            grid grid-cols-1 w-full          
            ${selectedAmenity && "md:grid-cols-mapWithResults"}
          `}
        >
          {selectedAmenity && (
            <LocationResults
              amenityTitle={amenityData[selectedAmenity].headingLabel}
              amenityId={selectedAmenity}
              locations={amenityData[selectedAmenity].locations}
              locationData={locationData}
            />
          )}

          <DirectoryMap selectedAmenity={selectedAmenity} maps={maps} />
        </div>
      </main>
    </motion.div>
  );
}
