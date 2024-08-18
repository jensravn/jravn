import { Navbar } from "@repo/ui/components/navbar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Navbar,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
