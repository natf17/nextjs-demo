import { gql } from "@apollo/client";
import { LocationSchema } from "./GetMapStrings";

export type DonationLocationSchema = {
  __typename: "Donation";
  id: string;
  name: string;
  isWheelchairAccessible: boolean;
  svgElemId?: string;
  location: LocationSchema;
  paymentTypesAccepted: "cash" | "credit";
  note?: string;
  featImg?: {
    url: string;
    width: number;
    height: number;
  };
};

const query = (locale = "en") => {
  return gql`
      query {
        donations(locale:"${locale}", sort:"location.level_num:asc"){
          __typename
          id
          name
          isWheelchairAccessible
          svgElemId
          note
          location {
            fullname
            level_name
            level_num
          }
          paymentTypesAccepted
          featImg {
            url
            width
            height
          }
        }    
      }  
  `;
};

export default query;
