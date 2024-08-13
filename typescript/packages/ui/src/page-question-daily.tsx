import { useState } from "react";
import "./styles.css";

interface Props {
  date: string;
  gitHubLogo: JSX.Element;
  note: Req<NoteData>;
  onBack: () => void;
  onComment: (comment: string) => void;
  onDateChange: (date: ISOdateString) => void;
  onForward: () => void;
  onMostVoted: (mostVoted: string) => void;
  onOurAnswer: (ourAnswer: string) => void;
  question: Req<QuestionData>;
  today: YearMonthDay;
}

export default function PageQuestionDaily({
  date,
  gitHubLogo,
  note,
  onComment,
  onBack,
  onDateChange,
  onForward,
  onMostVoted,
  onOurAnswer,
  question,
  today,
}: Props) {
  const [comment, setComment] = useState("");

  return (
    <div className="page">
      <main className="main">
        <div className="inner">
          <h2>Daily cloud question</h2>
          <div className="date">
            <button onClick={onBack}>←</button>
            &nbsp;
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              max={`${today.year}-${today.month}-${today.day}`}
            />
            &nbsp;
            <button disabled={isAfterYesterday(date)} onClick={onForward}>
              →
            </button>
          </div>
          <h2>
            {question.isLoading ? (
              <a>&nbsp;</a>
            ) : question.error ? (
              (question.error?.info ?? "error")
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
          <br />
          <br />
          <div>
            Our answer{" "}
            <select
              onChange={(e) => onOurAnswer(e.target.value)}
              value={note.data?.ourAnswer ?? ""}
              disabled={!!note.data?.ourAnswer || !isAfterYesterday(date)}
            >
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            <input
              type="checkbox"
              checked={
                !!note.data?.ourAnswer &&
                note.data?.ourAnswer === note.data?.mostVoted
              }
              disabled
            />{" "}
            <select
              onChange={(e) => onMostVoted(e.target.value)}
              value={note.data?.mostVoted ?? ""}
              disabled={!!note.data?.mostVoted || !isAfterYesterday(date)}
            >
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            Most voted
          </div>{" "}
          <br />
          <span>
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              value={comment}
            />{" "}
            <button
              onClick={() => {
                onComment(comment);
                setComment("");
              }}
            >
              Add comment
            </button>
          </span>
          {note.data?.comments?.map((comment) => <p>{comment.text}</p>)}
          <br />
          {new Date(date).getDay() === 5 ? (
            <a href={`/question/review?date=${date}`}>Weekly review</a>
          ) : null}
          <br />
          <br />
          <br />
          <a href="https://github.com/jensravn/jravn">{gitHubLogo}</a>
        </div>
      </main>
    </div>
  );
}

function isAfterYesterday(date: string) {
  return new Date(date) >= new Date(new Date().toDateString());
}

export type Req<Data> = {
  data?: Data;
  error?: Err;
  isLoading: boolean;
};

export type QuestionData = {
  exam: string;
  question: number;
  date: string;
  page: number;
};

export type NoteData = {
  ourAnswer?: string;
  mostVoted?: string;
  comments?: NoteComment[];
};

type NoteComment = {
  text: string;
  timeStamp: string;
};

type Err = {
  info?: string;
};

export type ISOdateString = string;

export type YearMonthDay = {
  year: string;
  month: string;
  day: string;
};
