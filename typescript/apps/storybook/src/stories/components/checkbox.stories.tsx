import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
} from "@repo/ui/components/checkbox";
import { Label } from "@repo/ui/components/fieldset";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Checkbox",
    name: "checkbox",
  },
};

export const WithLabel: Story = {
  render: () => (
    <CheckboxField>
      <Checkbox name="some_name" />
      <Label>Some label</Label>
    </CheckboxField>
  ),
};

export const Multiple: Story = {
  render: () => (
    <CheckboxGroup>
      <CheckboxField>
        <Checkbox name="name_1" />
        <Label>Label 1</Label>
      </CheckboxField>
      <CheckboxField>
        <Checkbox name="name_2" />
        <Label>Label 2</Label>
      </CheckboxField>
    </CheckboxGroup>
  ),
};
