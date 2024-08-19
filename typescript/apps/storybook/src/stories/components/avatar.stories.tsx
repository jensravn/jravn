import { Avatar } from "@repo/ui/components/avatar";
import type { Meta, StoryObj } from "@storybook/react";
import AvatarImage from "../assets/avatar.webp";

const meta = {
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: AvatarImage,
  },
};
