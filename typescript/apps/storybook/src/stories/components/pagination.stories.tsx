import { Pagination } from "@repo/ui/components/pagination";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
