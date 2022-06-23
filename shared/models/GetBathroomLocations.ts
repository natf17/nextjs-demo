import { gql } from "@apollo/client";

import { LocationSchema } from "./GetMapStrings";

export type BathroomLocationSchema = {
  __typename: "Bathrooms";
  id: string;
  name: string;
  gender: "men" | "women" | "uni";
  isWheelchairAccessible: boolean;
  svgElemId?: string;
  note?: string;
  location: LocationSchema;
  featImg: {
    url: string;
    width: number;
    height: number;
  };
};

const query = (locale = "en") => {
  return gql`
      query {
        bathrooms(locale:"${locale}", sort:"location.level_num:asc"){
          __typename
          id
          name
          gender
          isWheelchairAccessible
          svgElemId
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
