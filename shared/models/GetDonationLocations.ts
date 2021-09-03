import { gql } from '@apollo/client';
import { LocationSchema } from './GetMapStrings';

export type DonationLocationSchema = {
  id: string,
  name: string,
  location: LocationSchema,
  paymentTypesAccepted: 'cash' | 'credit',
  note?: string,
  featImg?: {
    url: string,
    width: number,
    height: number
  }
};

const query = (locale = "en") => {
  return gql`
      query {
        donations(locale:"${locale}"){
          id
          name
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
} 

export default query;