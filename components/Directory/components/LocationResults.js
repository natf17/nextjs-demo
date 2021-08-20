import React from 'react';
import LocationResultsItem from './LocationResultsItem';

export default function LocationResults({locations}) {
  console.log('Inside LocationResults. These are my locations:');
  console.log(locations);
  return (
    <>
      { 
        locations.map((location)=> {
          return (
            <LocationResultsItem key={ location.id } {...location} />
          )
        })
      }
    </>
  )
}
