import React from "react";
import Image from "next/image";
import { BathroomLocationSchema } from "../../../shared/models/GetBathroomLocations";
import { DonationLocationSchema } from "../../../shared/models/GetDonationLocations";
import { FirstAidSchema } from "../../../shared/models/GetFirstAidLocations";
import { WaterFountainSchema } from "../../../shared/models/GetWaterFountainLocations";

// Icons
import { Wc as UniIcon } from "@mui/icons-material";
import { Man as ManIcon } from "@mui/icons-material";
import { Woman as WomanIcon } from "@mui/icons-material";
import { Accessible as AccessibleIcon } from "@mui/icons-material";
import { CreditScore as CreditCardIcon } from "@mui/icons-material";
import { CreditCardOff as NoCreditCardIcon } from "@mui/icons-material";
import { LocationOn as BuildingLevelIcon } from "@mui/icons-material";
import { LocalAtm as CashIcon } from "@mui/icons-material";
import { InfoOutlined as InfoIcon } from "@mui/icons-material";
import { AmenityId } from "../../../pages/directory";

export type Props = (
  | BathroomLocationSchema
  | DonationLocationSchema
  | FirstAidSchema
  | WaterFountainSchema
) & {
  amenityId: AmenityId;
};

export default function LocationResultsItem(props: Props) {
  const { name, location, isWheelchairAccessible, featImg, note } = props;

  // initialize type-specific properties
  let gender,
    paymentTypesAccepted = null;

  // Bathroom-specific props
  if ("gender" in props) {
    gender = props.gender;
  }

  // Donations-specific props
  if ("paymentTypesAccepted" in props) {
    paymentTypesAccepted = props.paymentTypesAccepted;
  }

  return (
    <div className="py-2">
      <div className="flex">
        {/* Thumbnail */}
        <div
          className="
            w-16 h-16 overflow-hidden relative
            flex justify-center items-center self-center
          "
        >
          {featImg && (
            <Image
              src={`${process.env.NEXT_PUBLIC_VERCEL_IMG_API + featImg.url}`}
              alt={name}
              width={featImg.width} // insert dimensions, should be sq
              height={featImg.height}
            />
          )}
        </div>

        {/* Amenity quick-view */}
        <div className="p-2">
          <h3 className="text-lg font-medium text-green-50 py-1">{name}</h3>
          <ul className="text-gray-300">
            {/* Level */}
            <li className="inline-block">
              <BuildingLevelIcon />
              {location?.fullname}
            </li>

            {/* Other icon designations */}
            <div className="inline-block before:content-[' '] before:mr-4 text-blue-100">
              {/* Accessibility */}
              {isWheelchairAccessible && (
                <li
                  className={`                
                  inline-block bg-slate-700
                  px-1 border border-blue-500 rounded-xl`}
                >
                  <AccessibleIcon />
                </li>
              )}

              {/* Gender neutral */}
              {gender === "uni" && (
                <li
                  className={`
                  inline-block bg-slate-700
                  px-1 border border-blue-500 rounded-xl`}
                >
                  <UniIcon />
                </li>
              )}

              {/* Payment types */}
              {paymentTypesAccepted === "cash" && (
                <>
                  <li
                    className={`
                  text-slate-400 inline-block bg-slate-200
                  px-1 border border-slate-500 rounded-xl`}
                  >
                    <NoCreditCardIcon />
                  </li>
                  <li
                    className={`
                inline-block bg-slate-700
                px-1 border border-blue-500 rounded-xl`}
                  >
                    <CashIcon />
                  </li>
                </>
              )}

              {paymentTypesAccepted === "credit" && (
                <li
                  className={`
                  inline-block bg-slate-700
                  px-1 border border-blue-500 rounded-xl`}
                >
                  <CreditCardIcon />
                </li>
              )}
            </div>
          </ul>
          {/* Note */}
          {note && (
            <div className="text-emerald-200 py-1 text-sm">
              <InfoIcon />{" "}
              <span className="italic text-emerald-100">{note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
