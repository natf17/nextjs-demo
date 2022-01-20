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
import { LocalAtm as CashIcon } from "@mui/icons-material";

export type Props =
  | BathroomLocationSchema
  | DonationLocationSchema
  | FirstAidSchema
  | WaterFountainSchema;

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
    <div
      className="
      flex
    "
    >
      {/* Thumbnail */}
      <div
        className="
        w-20 h-20 overflow-hidden relative
        flex justify-center items-center
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
        <h3 className="text-lg font-medium text-green-50">{name}</h3>
        <ul className="text-gray-300">
          {/* Level */}
          <li>{location?.fullname}</li>

          {/* Gender */}
          <li>{gender === "uni" && <UniIcon />}</li>
          <li>{gender === "men" && <ManIcon />}</li>
          <li>{gender === "women" && <WomanIcon />}</li>

          {/* Accessibility */}
          <li>{isWheelchairAccessible && <AccessibleIcon />}</li>

          {/* Payment types */}
          <li>{paymentTypesAccepted === "cash" && <CashIcon />}</li>
          <li>{paymentTypesAccepted === "credit" && <CreditCardIcon />}</li>

          {/* Note */}
          <li>{note}</li>
        </ul>
      </div>
    </div>
  );
}
