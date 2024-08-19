import { Textarea } from "@repo/ui/components/textarea";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
