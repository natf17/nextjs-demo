/*
  This config is used in React code to programatically access specific
  areas of the custom SVG maps
*/

const config = {
  // amenityIdAttr: AmenityID
  amenityIdAttr: "data-amenity-id",
  // locationIDAttr: [custom location ID defined in CMS (identifies location path)]
  locationIdAttr: "data-location-id",
  // searchResultIdTxtAttr: [custom location ID defined in CMS (container for search result id/label)]
  searchResultIdTxtAttr: "data-search-result-id",
  // class name for setting 'selected' styles
  selectedClass: "selected",
};

export default config;
