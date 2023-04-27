This is a multi-lingual web app built for use as an indoor, touch-screen kiosk.

## Tech Stack

The full tech stack consists of:

- NextJS & React (server and UI)
- Strapi CMS (headless CMS)
- Webhooks to trigger builds on CMS changes
- Cloudinary (static images)

## Configure the application

The app requires the following environment variables (they can be set in `./env.local`):

- `CMS_GRAPHQL_ENDPOINT`: the endpoint for GraphQL queries
- `CMS_ACCESS_TOKEN`: the CMS API token, to be used in production
- `IMG_DOMAIN`: the domain NextJS will allow images to be loaded from (see next.config.js)
- `NEXT_PUBLIC_VERCEL_IMG_API`: the base url for images

## Launch the server

To run the development server:

```bash
npm run dev
# or
yarn dev
```

To run the production server, use `npm run build`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The base directory structure was bootstrapped using with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

See the headless CMS configuration ['here'](https://github.com/isaacd8k/kiosk-prd-demo)

## SETUP: Configure permissions

Allow the following application-level permissions via the strapi admin:

- ABOUT-PAGE:
- BATHROOMS: find
- DONATION:
- ERROR-404-PAGE: find
- EVENT-SEASON: count, find, findOne
- EVENTS-PAGE: find
- FIRST-AID:
- GLOBAL-SETTINGS:
- HOME-PAGE: find
- LOCATIONS:
- MAP-PAGE:
- MENU-PAGE: find
- NON-SEASONAL-EVENT: count, find, findOne
- SEASONAL-EVENT: count, find, findOne
- WATER-FOUNTAIN:

## SETUP: Add locales

Add the following (required) locales:

- es

## SETUP: Populate the pages

Populate the following pages in all locales defined.

- About Page
- Error 404 Page
- Events Page
- Home Page
- Map Page
- Menu Page

Note: At least the error page, in both the `en` and `es` locales, is required. Furthermore, every page that is populated must be populated in both the en and es locales.
See ./data.txt for suggested data.

## Events and seasons

The `Events Page` is configured to show two views:

- Type 1: `/events`: three buttons are shown that add an `eventType` parameter to the url, which changes the view to Type 2
- Type 2: `/events?eventType={REG or CACO or CABR}`
  - Buttons at the top allow selecting different event types (like in Type 1)
  - Information belonging to the **current season** of the selected event type is shown below.
  - Next to it is a small menu to select the event language (it defaults to, and always includes, the locale language).
  - All the events associated with this season are shown below.
  - The events are ordered in chronological order: by month going down the "y-axis" and within the month across the "x-axis".

The current season is defined as the season that either matches...

- the current year if the current month is before September
- the current year + 1 if the current month is September or later

For example, if the date is May 1, 2023, the current season has the year 2023. If the date is September 1, 2023, then the current season has the year 2024.

The app non-deterministically chooses **a** current season. To avoid undefined behavior, only add one season per year per event type.

## App images

Where do the images come from?

- background image: loaded from the project directory (`/public/bg_flipped.jpeg`)
- icons in home page and map page: mui library
- the header logo: loaded from the project directory (`/public/headerLogo.svg`)
- header back button and language picker: mui library
- images in menu page grid, about page, and maps: the src url is extracted from the GraphQL response, which is appended to NEXT_PUBLIC_VERCEL_IMG_API

The global.values configuration currently isn't being used.

## The Map page

Like the other pages, the actual content of this page is obtained from the corresponding page (Map Page) single type in the CMS. Unlike the other pages, this page has a Location Results section and a Map section that show the currently selected amenity type and location.

There are two views:

- Type 1: `/directory`: the Location Results section is shown, with nothing selected, and the Map section, with buttons to switch between maps for different levels.
  Tapping on the Location Results buttons changes to view to Type 2
- Type 2: `/directory?amenityId={bathrooms or firstAid or donations or waterFountains}`
  - on the left side are is the Location Results section
    - this section always has four buttons at the top to select one of the four supported amenity types.
    - the names of all the location objects in the CMS are shown underneath. Special functionality exists for a location named `"MEZZ"`
    - the order of the locations is determined by the `level_num` property (asc)
    - the results are found by matching **all** bathroom, water fountain, girst aid, and donation objects with the currently selected amenity type and location/level
    - each amenity object should have a reference to a location
    - the amenity's location and the selected location object are matched by name
  - on the right side is the map section
    - there is a small menu with buttons to select the location/level (all locations in existence are shown)
    - next to the menu is a button to clear results, which changes the view to Type 1
    - underneath is the map image

There are custom maps for the `en` and `es` locales. These are used if `mapConfig.enableFsCustomMaps` is `true`.

- `/public/custom-maps/en/ground.svg` is used when the locale is `en` and the level name is `"FIRST"`
- `/public/custom-maps/en/mezz.svg` is used when the locale is `en` and the level name is `"MEZZ"`
- `/public/custom-maps/es/ground.svg` is used when the locale is `es` and the level name is `"FIRST"`
- `/public/custom-maps/es/mezz.svg` is used when the locale is `es` and the level name is `"MEZZ"`

All other maps are obtained from the location object found by searching through all the existing location objects until one that matches by name is found.

The image has `src = process.env.NEXT_PUBLIC_VERCEL_IMG_API + matchedLevelMap.url`.

## Add seasons

Add an `Event Seasons` object corresponding to the current season for each event type.

## Add events

Add `Seasonal Events` that correspond to the `Event Seasons` just created. Select the correct season in the event's `Event_season` field.

## Add more locales

When adding another locale, ensure all the pages and seasons are populated in the new language.

## Add locations

A location corresponds to a level in the building. All amenties in the same floor or level should have the same `location`.

Special functionality (colors, custom SVG maps) is enabled if there are locations with the property `level_name == "MEZZ"` or `level_name == "FIRST"`.

The maps added to the locations are the ones that will be shown in the maps page.

## Add amenities

You can add the following amenities:

- bathrooms
- firstAid
- donations
- waterFountains

Be sure to add a location to each amenity so that the Location Results in the map page will show the correct amenities.

Images for the amenities are not currently used.
