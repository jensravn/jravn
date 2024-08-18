import { DescriptionList } from "@repo/ui/components/description-list";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: DescriptionList,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
