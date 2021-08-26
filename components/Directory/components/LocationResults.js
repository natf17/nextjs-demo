import React from 'react';
import LocationResultsItem from './LocationResultsItem';

export default function LocationResults({locations}) {
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
