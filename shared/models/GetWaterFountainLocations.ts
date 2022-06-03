import { gql } from "@apollo/client";

import { LocationSchema } from "./GetMapStrings";

export type WaterFountainSchema = {
  typename: "WaterFountain";
  id: string;
  name: string;
  isWheelchairAccessible: boolean;
  note?: string;
  location: LocationSchema;
  featImg?: {
    url: string;
    width: number;
    height: number;
  };
};

const query = (locale = "en") => {
  return gql`
      query {
        waterFountains(locale:"${locale}", sort:"location.level_num:asc"){
          __typename
          id
          name
          isWheelchairAccessible
          note
          location {
            fullname
            level_name
            level_num
          }    
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
