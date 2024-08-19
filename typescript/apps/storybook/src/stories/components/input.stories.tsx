import { Input } from "@repo/ui/components/input";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
