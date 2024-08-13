import PageQuestionDaily from "@repo/ui/page-question-daily";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import GitHubLogo from "./assets/github-logo.svg";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: PageQuestionDaily,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    gitHubLogo: <img src={GitHubLogo} alt="GitHub" width="24" height="24" />,
    onBack: fn(),
    onComment: fn(),
    onDateChange: fn(),
    onForward: fn(),
    onMostVoted: fn(),
    onOurAnswer: fn(),
  },
} satisfies Meta<typeof PageQuestionDaily>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    date: "2022-01-01",
    note: {
      data: {
        mostVoted: "B",
        ourAnswer: "A",
        comments: [{ text: "comment 1", timeStamp: "2022-01-01" }],
      },
      error: undefined,
      isLoading: false,
    },
    question: {
      data: {
        date: "2022-01-01",
        exam: "professional-machine-learning-engineer",
        page: 10,
        question: 5,
      },
      error: undefined,
      isLoading: false,
    },
    today: { day: "01", month: "01", year: "2022" },
  },
};
