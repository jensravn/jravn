import { Badge } from "@repo/ui/components/badge";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { color: "fuchsia", children: "Badge text" },
};
