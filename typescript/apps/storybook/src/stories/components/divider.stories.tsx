import { Divider } from "@repo/ui/components/divider";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Divider,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
