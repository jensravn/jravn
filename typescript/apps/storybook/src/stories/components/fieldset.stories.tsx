import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
} from "@repo/ui/components/checkbox";
import { Fieldset, Label } from "@repo/ui/components/fieldset";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Fieldset,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Fieldset>
      <CheckboxGroup>
        <CheckboxField>
          <Checkbox name="discoverability" value="show_on_events_page" />
          <Label>Show on events page</Label>
        </CheckboxField>
        <CheckboxField>
          <Checkbox name="discoverability" value="allow_embedding" />
          <Label>Allow embedding</Label>
        </CheckboxField>
      </CheckboxGroup>
    </Fieldset>
  ),
};
