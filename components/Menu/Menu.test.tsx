import React from "react";
import { render, screen } from "@testing-library/react";
import Menu, { Props } from "../../pages/menu";

describe("Home Screen", () => {
  const MOCK_PROPS: Props = {
    locale: "en",
    strings: {
      pageTitle: "Page title demo",
      directory: {
        title: "Map section",
        menuItems: [
          {
            id: "1",
            isVisible: true,
            label: "Menu item 1",
            url: "",
          },
        ],
      },
      events: {
        title: "Events section",
        menuItems: [
          {
            id: "1",
            isVisible: true,
            label: "Menu item 1",
            url: "",
          },
        ],
      },
      about: {
        title: "About",
        menuItems: [
          {
            id: "1",
            isVisible: true,
            label: "About",
            url: "",
          },
        ],
      },
    },
  };

  it("renders input data without crashing", () => {
    render(<Menu {...MOCK_PROPS} />);
    expect(
      screen.getByRole("heading", { name: MOCK_PROPS.strings.pageTitle })
    ).toBeInTheDocument();
  });
});
