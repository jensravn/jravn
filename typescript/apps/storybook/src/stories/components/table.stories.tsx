import { Table } from "@repo/ui/components/table";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Table,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
