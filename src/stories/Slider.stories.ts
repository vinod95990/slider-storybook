import type { Meta, StoryObj } from "@storybook/react";
import Slider from "../component/Slider";
import { SliderSubtype, SliderType } from "../constants/sliderConstants";

// Define the meta object
const meta = {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    type: {
      control: "select",
      options: [SliderType.Continous, SliderType.Discrete],
    },
    subType: {
      control: "select",
      options: [SliderSubtype.Single, SliderSubtype.Ranged],
    },
    noOfSteps: {
      control: {
        type: "number",
        min: 1,
        max: 10,
      },
    },
    size: {
      control: "select",
      options: [24, 32],
    },
    onSlide: { action: "changed" },
  },
  args: {
    type: SliderType.Continous,
    subType: SliderSubtype.Single,
    noOfSteps: 5,
    size: 24,
  },
} satisfies Meta<typeof Slider>;

// Export the meta object
export default meta;

// Define the story object
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ContinuousSingle: Story = {
  args: {
    type: SliderType.Continous,
    subType: SliderSubtype.Single,
  },
};

export const ContinuousRange: Story = {
  args: {
    type: SliderType.Continous,
    subType: SliderSubtype.Ranged,
  },
};

export const DiscreteSingle: Story = {
  args: {
    type: SliderType.Discrete,
    subType: SliderSubtype.Single,
    noOfSteps: 5,
  },
};

export const DiscreteRange: Story = {
  args: {
    type: SliderType.Discrete,
    subType: SliderSubtype.Ranged,
    noOfSteps: 5,
  },
};

export const LargeHandle: Story = {
  args: {
    size: 32,
  },
};
