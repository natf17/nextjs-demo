import { useRouter } from "next/router";
import React from "react";
import { AmenityData, AmenityId } from "../../../pages/directory";
import { BathroomLocationSchema } from "../../../shared/models/GetBathroomLocations";
import { DonationLocationSchema } from "../../../shared/models/GetDonationLocations";
import { FirstAidSchema } from "../../../shared/models/GetFirstAidLocations";
import { LocationSchema } from "../../../shared/models/GetMapStrings";
import { WaterFountainSchema } from "../../../shared/models/GetWaterFountainLocations";
import useMapUIStore from "../useMapUIStore";
import AmenityBtn from "./AmenityBtn";
import LocationResultsByLevel from "./LocationResultsByLevel";

export type MapLocationItem =
  | BathroomLocationSchema
  | WaterFountainSchema
  | FirstAidSchema
  | DonationLocationSchema;

export type Props = {
  amenityData: AmenityData;
  locationData: LocationSchema[];
};

export default function LocationResults({ amenityData, locationData }: Props) {
  const selectedAmenity = useMapUIStore((state) => state.selectedAmenity);
  const router = useRouter();

  const onLocationSelect = (amenityId: AmenityId) => {
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

  return (
    // Grid container
    <div>
      <div className="px-1 mt-10 ml-5 rounded-md bg-slate-900 bg-opacity-60 border-b-green-300 border-b-2">
        {/* Display amenity selection menu */}
        <div>
          <div className="text-indigo-300 pt-4 pb-1 px-1 text-center">
            ADD CMS: Select an option below to view locations
          </div>
          <div
            className="
              px-1 py-4 text-gray-300
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

        {/* If selected amenity */}
        {selectedAmenity && (
          <div className="pt-6 border-t border-dotted border-t-slate-500">
            <header className="text-3xl px-4 pt-4 pb-2 text-slate-200">
              {`${amenityData[selectedAmenity].headingLabel}`}
            </header>

            {amenityData[selectedAmenity].locations ? (
              <LocationResultsByLevel
                locations={amenityData[selectedAmenity].locations!}
                locationData={locationData}
                amenityId={selectedAmenity}
              />
            ) : (
              <>No locations</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
