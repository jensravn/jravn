import { Listbox } from "@repo/ui/components/listbox";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Listbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
