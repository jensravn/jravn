import Card from "@repo/ui/card";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is the content of the card",
    href: "https://example.com",
    title: "Card title",
  },
};
