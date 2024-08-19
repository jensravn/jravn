import { Link } from "@repo/ui/components/link";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Link,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "https://example.com",
  },
};
