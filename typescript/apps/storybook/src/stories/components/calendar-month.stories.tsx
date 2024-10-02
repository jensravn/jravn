import CalendarMonth from "@repo/ui/components/calendar-month";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: CalendarMonth,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof CalendarMonth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
