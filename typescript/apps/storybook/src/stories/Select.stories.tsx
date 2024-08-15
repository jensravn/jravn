import Select from "@repo/ui/select";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Select,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};
