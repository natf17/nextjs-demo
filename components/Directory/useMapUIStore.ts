import create from "zustand";
import { AmenityId } from "../../pages/directory";
import { BathroomLocationSchema } from "../../shared/models/GetBathroomLocations";
import { DonationLocationSchema } from "../../shared/models/GetDonationLocations";
import { FirstAidSchema } from "../../shared/models/GetFirstAidLocations";
import { WaterFountainSchema } from "../../shared/models/GetWaterFountainLocations";
import { LocationSchema as Level } from "../../shared/models/GetMapStrings";
import { MapLocationItem } from "./components/LocationResults";

type LocationResults = (
  | BathroomLocationSchema
  | WaterFountainSchema
  | FirstAidSchema
  | DonationLocationSchema
)[];

export type MapUIState = {
  selectedAmenity: AmenityId | null;
  locationResults: LocationResults;
  selectedResultItemId: string | null;
  availableLevels: Level[];
  selectedLevelName: Level["level_name"] | null;
  searchResults: MapLocationItem[] | null;

  selectAmenity: (amenityId: AmenityId | null) => void;
  setLocationResults: (locationResults: LocationResults) => void;
  selectResultsItem: (id: string) => void;
  setAvailableLevels: (availableLevels: Level[]) => void;
  selectLevel: (levelName: Level["level_name"]) => void;
  setSearchResults: (searchResults: MapLocationItem[] | null) => void;
};

const useMapUIStore = create<MapUIState>((set) => ({
  selectedAmenity: null,
  locationResults: [],
  selectedResultItemId: null,
  availableLevels: [],
  selectedLevelName: null,
  searchResults: null,

  selectAmenity: (amenityId) => {
    set({
      selectedAmenity: amenityId,
    });
  },
  setLocationResults: (locationResults) => {
    set({ locationResults });
  },
  selectResultsItem: (id) => {
    set({
      selectedResultItemId: id,
    });
  },
  setAvailableLevels: (availableLevels) => {
    set({ availableLevels });
  },
  selectLevel: (levelName) => {
    set({
      selectedLevelName: levelName,
    });
  },
  setSearchResults: (searchResults) => {
    set({ searchResults });
  },
}));

export default useMapUIStore;
