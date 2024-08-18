import { Dialog } from "@repo/ui/components/dialog";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta = {
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Dialog content",
  },
};
