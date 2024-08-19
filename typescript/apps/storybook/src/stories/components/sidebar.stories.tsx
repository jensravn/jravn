import { Sidebar } from "@repo/ui/components/sidebar";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
