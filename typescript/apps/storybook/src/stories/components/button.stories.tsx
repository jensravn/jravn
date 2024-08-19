import { Button } from "@repo/ui/components/button";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};
