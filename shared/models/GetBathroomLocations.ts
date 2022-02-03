import { gql } from "@apollo/client";

import { LocationSchema } from "./GetMapStrings";

export type BathroomLocationSchema = {
  id: string;
  name: string;
  gender: "men" | "women" | "uni";
  isWheelchairAccessible: boolean;
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
          id
          name
          gender
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
