import { Button } from "@repo/ui/button";
import Image from "next/image";
import styles from "./page.module.css";

interface Props {
  date: string;
  note: Request<NoteData>;
  onBack: () => void;
  onDateChange: (date: ISOdateString) => void;
  onForward: () => void;
  onMostVoted: (mostVoted: string) => void;
  onOurAnswer: (ourAnswer: string) => void;
  question: Request<QuestionData>;
  today: YearMonthDay;
}

export default function View({
  date,
  note,
  onBack,
  onDateChange,
  onForward,
  onMostVoted,
  onOurAnswer,
  question,
  today,
}: Props) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.date}>
            <Button onClick={onBack}>←</Button>
            &nbsp;
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              max={`${today.year}-${today.month}-${today.day}`}
            />
            &nbsp;
            <Button disabled={isAfterYesterday(date)} onClick={onForward}>
              →
            </Button>
          </div>
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

          <br />
          <div>
            Our answer:{" "}
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
            - Most voted:{" "}
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
            </select>
          </div>
          <br />
          <input
            type="checkbox"
            checked={
              !!note.data?.ourAnswer &&
              note.data?.ourAnswer === note.data?.mostVoted
            }
            disabled
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <a href="https://github.com/jensravn/jravn">
            <Image
              src={`/github-mark.svg`}
              alt="GitHub"
              width="24"
              height="24"
            />
          </a>
        </div>
      </main>
    </div>
  );
}

function isAfterYesterday(date: string) {
  return new Date(date) >= new Date(new Date().toDateString());
}

type Request<Data> = {
  data?: Data;
  error?: Error;
  isLoading: boolean;
};

export type QuestionData = {
  exam: string;
  question: number;
  date: string;
  page: number;
};

type NoteData = {
  ourAnswer?: string;
  mostVoted?: string;
};

type Error = {
  info?: string;
};

export type ISOdateString = string;

export type YearMonthDay = {
  year: string;
  month: string;
  day: string;
};
