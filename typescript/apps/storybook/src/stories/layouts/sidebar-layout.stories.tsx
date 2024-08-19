import { Navbar } from "@repo/ui/components/navbar";
import { Sidebar } from "@repo/ui/components/sidebar";
import { SidebarLayout } from "@repo/ui/layouts/sidebar-layout";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: SidebarLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof SidebarLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbar: <Navbar></Navbar>,
    sidebar: <Sidebar></Sidebar>,
  },
};
