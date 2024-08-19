import { Alert } from "@repo/ui/components/alert";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Alert,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "This is an alert", onClose: () => {}, open: true },
};
