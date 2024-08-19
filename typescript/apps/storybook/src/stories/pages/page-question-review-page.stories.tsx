import { WeeklyCloudQuestionReviewPage } from "@repo/ui/pages/weekly-cloud-question-review-page";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import GitHubLogo from "../assets/github-logo.svg";

const meta = {
  component: WeeklyCloudQuestionReviewPage,
  parameters: {},
  args: {
    gitHubLogo: <img src={GitHubLogo} alt="GitHub" width="24" height="24" />,
    onBack: fn(),
    onForward: fn(),
  },
} satisfies Meta<typeof WeeklyCloudQuestionReviewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    weekYear: "01, 2022",
    mondayNote: { isLoading: true },
    mondayQuestion: { isLoading: true },
    tuesdayNote: { isLoading: true },
    tuesdayQuestion: { isLoading: true },
    wednesdayNote: { isLoading: true },
    wednesdayQuestion: { isLoading: true },
    thursdayNote: {
      data: {
        comments: [
          {
            text: "clever comment that shows reflection and after thought.",
            timeStamp: "2022-01-01",
          },
        ],
        mostVoted: "A",
        ourAnswer: "B",
      },
      isLoading: false,
    },
    thursdayQuestion: {
      data: {
        exam: "professional-machine-learning-engineer",
        page: 25,
        question: 124,
        date: "2022-01-01",
      },
      isLoading: false,
    },
    fridayNote: {
      data: {
        comments: [
          {
            text: "clever comment that shows reflection and after thought.",
            timeStamp: "2022-01-01",
          },
        ],
        mostVoted: "B",
        ourAnswer: "B",
      },
      isLoading: false,
    },
    fridayQuestion: {
      data: {
        exam: "professional-machine-learning-engineer",
        page: 25,
        question: 124,
        date: "2022-01-01",
      },
      isLoading: false,
    },
  },
};
