import { Heading } from "@repo/ui/components/heading";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Heading,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
