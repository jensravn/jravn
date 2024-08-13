import PageQuestionReview from "@repo/ui/page-question-review";
import type { Meta, StoryObj } from "@storybook/react";
import GitHubLogo from "./assets/github-logo.svg";

const meta = {
  component: PageQuestionReview,
  parameters: {},
  args: {
    gitHubLogo: <img src={GitHubLogo} alt="GitHub" width="24" height="24" />,
  },
} satisfies Meta<typeof PageQuestionReview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    weekYear: "01, 2022",
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
