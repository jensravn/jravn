interface Props {
  question: QuestionRequest;
}

export default function View({ question }: Props) {
  return (
    <h2>
      {question.isLoading ? (
        <a>&nbsp;</a>
      ) : question.error ? (
        question.error?.info ?? "error"
      ) : question.data ? (
        <a
          href={`https://www.examtopics.com/exams/google/${question.data.exam}/view/${question.data.page}`}
          target="_blank"
        >
          {question.data.exam} #{question.data.question}
        </a>
      ) : (
        "no data"
      )}
    </h2>
  );
}

interface QuestionRequest {
  data?: QuestionData;
  error?: Error;
  isLoading: boolean;
}

export interface QuestionData {
  exam: string;
  question: number;
  date: string;
  page: number;
}

type Error = {
  info?: string;
};
