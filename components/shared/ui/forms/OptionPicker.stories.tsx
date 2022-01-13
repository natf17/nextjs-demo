import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import OptionPicker from "./OptionPicker";

export default {
  title: "Forms/Option Picker",
  component: OptionPicker,
} as ComponentMeta<typeof OptionPicker>;

const Template: ComponentStory<typeof OptionPicker> = (args) => (
  <OptionPicker {...args} />
);

export const NoOptions = Template.bind({});
NoOptions.args = {
  initialValue: "en",
  options: [],
  onSelect: (selectedValue) => {
    console.log(`selected: ${selectedValue}`);
  },
};

export const OneOption = Template.bind({});
OneOption.args = {
  ...NoOptions.args,
  options: [
    {
      value: "en",
      label: "English",
    },
  ],
};

export const TwoOptions = Template.bind({});
TwoOptions.args = {
  ...OneOption.args,
  options: [
    {
      value: "en",
      label: "English",
    },
    {
      value: "es",
      label: "Spanish",
    },
  ],
};

export const ThreeOptions = Template.bind({});
ThreeOptions.args = {
  ...OneOption.args,
  options: [
    {
      value: "en",
      label: "English",
    },
    {
      value: "es",
      label: "Spanish",
    },
    {
      value: "pl",
      label: "Polish",
    },
  ],
};
