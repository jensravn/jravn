import { Radio } from "@repo/ui/components/radio";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Radio,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "radio",
  },
};
