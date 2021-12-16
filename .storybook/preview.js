import '../styles/tailwind.css';
import { RouterContext } from "next/dist/shared/lib/router-context"; // next 11, 12 https://storybook.js.org/docs/react/writing-stories/parameters

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}