import { Dropdown } from "@repo/ui/components/dropdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
