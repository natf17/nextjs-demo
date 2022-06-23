import { AmenityId } from "../../../pages/directory";
import SVGConfig from "../custom-maps/config";

const AMENITYIDATTR = SVGConfig.amenityIdAttr;
const SELECTED_CLASS = SVGConfig.selectedClass;

type Args = {
  selectedAmenity: AmenityId | null;
  SVGMapElem: SVGElement & HTMLElement;
};

function chooseMapAmenity({ selectedAmenity, SVGMapElem }: Args) {
  // remove 'selected' class from all amenityId groups
  SVGMapElem.querySelectorAll(`[${AMENITYIDATTR}]`).forEach((el) => {
    const originalClassVal = el.getAttribute("class") || "";

    // only remove selected class name
    const newClassVal = originalClassVal.replaceAll(SELECTED_CLASS, "");

    el.setAttribute("class", newClassVal);
  });

  // add 'selected' class if selection is made (else if null, skip)
  if (selectedAmenity) {
    SVGMapElem.querySelectorAll(
      `[${AMENITYIDATTR}=${selectedAmenity}]`
    ).forEach((el) => {
      const originalClassVal = el.getAttribute("class") || "";

      // only remove selected class name
      const newClassVal = originalClassVal + SELECTED_CLASS;

      el.setAttribute("class", newClassVal);
    });
  }
}

export default chooseMapAmenity;
