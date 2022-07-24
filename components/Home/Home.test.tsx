import React from "react";
import { render, screen } from "@testing-library/react";
import Home, { Props } from "../../pages/index";
import { useIdleTimerContext } from "react-idle-timer";

jest.mock("react-idle-timer", () => {
  const originalModule = jest.requireActual("react-idle-timer");

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    useIdleTimerContext: () => {
      return {
        pause: () => {},
        reset: () => {},
      };
    },
  };
});

describe("Home Screen", () => {
  const MOCK_PROPS: Props = {
    locale: "en",
    locales: ["en"],
    rotatingI18nData: {
      en: {
        pageTitle: "Test page title",
        welcomeText: "Welcome",
        tapToContinuePrompt: "Tap to continue",
      },
    },
    strings: {
      id: "1",
      pageTitle: "Test page title",
      welcomeText: "Welcome",
      tapToContinuePrompt: "Tap to continue",
    },
  };

  it("renders input data without crashing", () => {
    render(<Home {...MOCK_PROPS} />);
    expect(
      screen.getByRole("heading", { name: MOCK_PROPS.strings.welcomeText })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: MOCK_PROPS.strings.tapToContinuePrompt,
      })
    ).toBeInTheDocument();
  });
});
