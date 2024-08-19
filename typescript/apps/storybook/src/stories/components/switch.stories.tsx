import { Switch } from "@repo/ui/components/switch";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Switch,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
