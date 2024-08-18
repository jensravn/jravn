import { Field, Label } from "@repo/ui/components/fieldset";
import { Select } from "@repo/ui/components/select";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Select,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "answer",
    children: <></>,
  },
};

export const Default2: Story = {
  render: (args) => (
    <Field>
      <Label>Answer</Label>
      <Select name="answer" {...args}>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </Select>
    </Field>
  ),
};
