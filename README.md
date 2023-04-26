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
- SEASONAL-EVENT: count, find, findOnehttp://host.docker.internal:1337/graphql
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

## Understanding events and seasons

The `Events Page` is configured to show two views:

- Type 1: `/events`: three buttons are shown that add an `eventType` parameter to the url, which changes the view to Type 2
- Type 2: `/events?eventType={REG or CACO or CABR}
  - Buttons at the top allow selecting different event types (like in Type 1)
  - Information belonging to the **current season** of the selected event type is shown below.
  - Next to it is a small menu to select the event language (it defaults to, and always includes, the locale language).
  - All the events associated with this season are shown below.
  - The events are ordered in chronological order: by month going down the "y-axis" and within the month across the "x-axis".

The current season is defined as the season that

- if the current month is before September: matches the current year
- if the current month is September or later: matches the current year + 1
  For example, if the date is May 1, 2023, the current season has the year 2023. If the date is September 1, 2023, then the current season has the year 2024.

The app non-deterministically chooses **a** current season. To avoid undefined behavior, only add one season per year per event type.

## Understanding images

A library of icons is used for icons in the map page; the logo, back button, and language icon, are all local files. The background image is loaded from the project directory. For all other images (menu, about page, ), a graphql request is made to obtain the src url, which is appended to NEXT_PUBLIC_VERCEL_IMG_API.
In the map page, either custom maps (local) or location maps (from strapi) will be used (determined by the `mapViewConfig.enableFsCustomMaps` field in the graphql response). The app currently only supports looking for custom maps for the es and en locales.

## Add seasons

Add an `Event Seasons` object corresponding to the current season for each event type.

## Add events

Add `Seasonal Events` that correspond to the `Event Seasons` just created. Select the correct season in the event's `Event_season` field.

## Add more locales

When adding another locale, ensure all the pages and seasons are populated in the new language.
