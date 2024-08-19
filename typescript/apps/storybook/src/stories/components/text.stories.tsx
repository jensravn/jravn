import { Paragraph, Strong, TextLink } from "@repo/ui/components/text";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Paragraph,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        {" "}
        This feature is only available to users on the{" "}
        <Strong>Business Plan</Strong>. To upgrade, visit your{" "}
        <TextLink href="#">billing settings</TextLink>.
      </>
    ),
  },
};
