import React from "react";
import { BathroomLocationSchema } from "../../../shared/models/GetBathroomLocations";
import { DonationLocationSchema } from "../../../shared/models/GetDonationLocations";
import { FirstAidSchema } from "../../../shared/models/GetFirstAidLocations";
import { WaterFountainSchema } from "../../../shared/models/GetWaterFountainLocations";
import LocationFeatureChip from "./LocationFeatureChip";

// Icons
import {
  AttachMoney,
  LocalDrink,
  LocalHospital,
  Wc as UniIcon,
} from "@mui/icons-material";
import { Man as ManIcon } from "@mui/icons-material";
import { Woman as WomanIcon } from "@mui/icons-material";
import { Accessible as AccessibleIcon } from "@mui/icons-material";
import { CreditScore as CreditCardIcon } from "@mui/icons-material";
import { CreditCardOff as NoCreditCardIcon } from "@mui/icons-material";
import { LocationOn as BuildingLevelIcon } from "@mui/icons-material";
import { LocalAtm as CashIcon } from "@mui/icons-material";
import { AmenityId } from "../../../pages/directory";
import { motion } from "framer-motion";

export type Props = (
  | BathroomLocationSchema
  | DonationLocationSchema
  | FirstAidSchema
  | WaterFountainSchema
) & {
  amenityId: AmenityId;
  listNum: number;
};

export default function LocationResultsItem(props: Props) {
  const { __typename, name, location, isWheelchairAccessible, note, listNum } =
    props;

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
    <motion.div className="py-2" layout="position">
      <div className="flex">
        {/* Thumbnail */}
        <div
          className="
            w-16 h-16 overflow-hidden relative
            flex justify-center items-center self-center
            text-slate-400
          "
        >
          {__typename === "Bathrooms" && gender === "men" && (
            <ManIcon className="text-slate-300" />
          )}
          {__typename === "Bathrooms" && gender === "women" && (
            <WomanIcon className="text-slate-300" />
          )}
          {__typename === "Bathrooms" && gender === "uni" && (
            <UniIcon className="text-slate-300" />
          )}
          {__typename === "Donation" && (
            <AttachMoney className="text-purple-300" />
          )}
          {__typename === "FirstAid" && (
            <LocalHospital className="text-red-300" />
          )}
          {__typename === "WaterFountain" && (
            <LocalDrink className="text-teal-300" />
          )}
        </div>

        {/* Amenity quick-view */}
        <div className="p-2">
          <h3 className="text-lg font-medium text-amber-200 py-1">{`${listNum}. ${name}`}</h3>
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
                <LocationFeatureChip>
                  <AccessibleIcon />
                </LocationFeatureChip>
              )}

              {/* Gender neutral */}
              {gender === "uni" && (
                <LocationFeatureChip>
                  <UniIcon />
                </LocationFeatureChip>
              )}

              {/* Payment types */}
              {paymentTypesAccepted === "cash" && (
                <>
                  <LocationFeatureChip disabled>
                    <NoCreditCardIcon />
                  </LocationFeatureChip>

                  <LocationFeatureChip>
                    <CashIcon />
                  </LocationFeatureChip>
                </>
              )}

              {paymentTypesAccepted === "credit" && (
                <LocationFeatureChip>
                  <CreditCardIcon />
                </LocationFeatureChip>
              )}
            </div>
          </ul>
          {/* Note */}
          {note && (
            <div className="text-emerald-200 py-1 text-sm">
              * <span className="italic text-emerald-100">{note}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
