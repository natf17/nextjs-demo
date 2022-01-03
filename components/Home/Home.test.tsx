import React from "react";
import { render, screen } from "@testing-library/react";
import Home, { Props } from "../../pages/index";

describe("Home Screen", () => {
  const MOCK_PROPS: Props = {
    locale: "en",
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
