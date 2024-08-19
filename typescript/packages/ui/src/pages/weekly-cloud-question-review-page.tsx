import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { NoteData, QuestionData, Req } from "./daily-cloud-question-page";

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

export function WeeklyCloudQuestionReviewPage({
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
          <Heading>Weekly cloud question review</Heading>
          <br />
          <div className="date">
            <Button onClick={onBack}>←</Button>&nbsp;&nbsp;
            <code>Week {weekYear}</code>
            &nbsp;&nbsp;
            <Button onClick={onForward}>→</Button>
          </div>
          <br />
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
          <br />
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
      <br />
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
      <br />
      <hr />
    </>
  );
}
