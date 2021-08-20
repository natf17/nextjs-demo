import React from 'react';

export default function LocationResultsItem(props) {
  const { name, isWheelchairAccessible, location, note } = props;
  // Bathroom-specific props
  const { gender = null } = props;
  // Water-specific props
    // none
  // Firstaid-specific props
    // none
  // Donation-specific props
  const { paymentTypesAccepted = null } = props;


  return (
    <div>
      {/* Thumbnail */}
      <div>Thumbnail</div>

      {/* Amenity quick-view */}
      <div>
        <h4>{name}</h4>
        <div>
          {location.fullname}, {gender}, {isWheelchairAccessible}, {paymentTypesAccepted}
          {note}
        </div>
      </div>

    </div>
  )
}
