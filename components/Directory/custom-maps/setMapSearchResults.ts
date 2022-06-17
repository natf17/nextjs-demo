import { MapLocationItem } from "../components/LocationResults";
import SVGConfig from "../custom-maps/config";

const SEARCHRESULT_ATTR = SVGConfig.searchResultIdTxtAttr;

type Args = {
  searchResults: MapLocationItem[] | null;
  SVGMapElem: SVGElement & HTMLElement;
};

function setMapSearchResults({ searchResults, SVGMapElem }: Args) {
  // clear all prior search results:
  // clear all searchResultIdTxtAttr textContent
  SVGMapElem.querySelectorAll(`[${SEARCHRESULT_ATTR}]`).forEach((el) => {
    el.textContent = "";
  });

  // if there are search results to update
  if (searchResults && searchResults.length > 0) {
    searchResults.forEach((result, idx) => {
      // look up 'SVGElemId' field value
      const searchResultSVGId = result.svgElemId;

      // validate query selector (must not be empty string)
      if (searchResultSVGId) {
        // look up text elem in SVG map
        const foundTextNode = SVGMapElem.querySelector(
          `[${SEARCHRESULT_ATTR}=${searchResultSVGId}]`
        );

        // update text content to match search result number
        if (foundTextNode) {
          foundTextNode.textContent = (idx + 1).toString();
        }
      }
    });
  }
}

export default setMapSearchResults;
