import { Navbar } from "@repo/ui/components/navbar";
import { Sidebar } from "@repo/ui/components/sidebar";
import { StackedLayout } from "@repo/ui/layouts/stacked-layout";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: StackedLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof StackedLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbar: <Navbar></Navbar>,
    sidebar: <Sidebar></Sidebar>,
  },
};
