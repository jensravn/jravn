import Button from "./button";
import { NoteData, QuestionData, Req } from "./page-question-daily";
import "./styles.css";

interface Props {
  weekYear: string;
  onBack: () => void;
  onForward: () => void;
  mondayQuestion: Req<QuestionData>;
  mondayNote: Req<NoteData>;
  tuesdayQuestion: Req<QuestionData>;
  tuesdayNote: Req<NoteData>;
  wednesdayQuestion: Req<QuestionData>;
  wednesdayNote: Req<NoteData>;
  thursdayQuestion: Req<QuestionData>;
  thursdayNote: Req<NoteData>;
  fridayQuestion: Req<QuestionData>;
  fridayNote: Req<NoteData>;
  gitHubLogo: JSX.Element;
}

export default function PageQuestionReview({
  weekYear,
  onBack,
  onForward,
  mondayQuestion,
  mondayNote,
  tuesdayQuestion,
  tuesdayNote,
  wednesdayQuestion,
  wednesdayNote,
  thursdayQuestion,
  thursdayNote,
  fridayQuestion,
  fridayNote,
  gitHubLogo,
}: Props) {
  return (
    <div className="page">
      <main className="main">
        <div className="inner">
          <h2>Weekly cloud question review</h2>
          <div className="date">
            <Button onClick={onBack}>←</Button>&nbsp;
            <code>Week {weekYear}</code>
            &nbsp;
            <Button onClick={onForward}>→</Button>
          </div>
          <hr />
          <Day weekday="Monday" question={mondayQuestion} note={mondayNote} />
          <Day
            weekday="Tuesday"
            question={tuesdayQuestion}
            note={tuesdayNote}
          />
          <Day
            weekday="Wednesday"
            question={wednesdayQuestion}
            note={wednesdayNote}
          />
          <Day
            weekday="Thursday"
            question={thursdayQuestion}
            note={thursdayNote}
          />
          <Day weekday="Friday" question={fridayQuestion} note={fridayNote} />
          <a href="https://github.com/jensravn/jravn">{gitHubLogo}</a>
        </div>
      </main>
    </div>
  );
}

interface DayProps {
  question: Req<QuestionData>;
  note: Req<NoteData>;
  weekday: string;
}

function Day({ question, note, weekday }: DayProps) {
  const correctEmoji = !note?.data
    ? "🫥"
    : note?.data?.ourAnswer === note?.data?.mostVoted
      ? "✅"
      : "🍅";
  return (
    <>
      <b>
        {weekday}: {correctEmoji}{" "}
      </b>
      <a
        href={`https://www.examtopics.com/exams/google/${question?.data?.exam}/view/${question?.data?.page}`}
        target="_blank"
      >
        {question?.data?.exam} #{question?.data?.question}
      </a>
      {note?.data?.comments?.map((comment) => <p>{comment.text}</p>)}
      <hr />
    </>
  );
}
