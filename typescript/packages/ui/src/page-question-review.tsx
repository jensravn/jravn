import { NoteData, QuestionData, Req } from "./page-question-daily";
import "./styles.css";

interface Props {
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
          <h4>
            Monday:{" "}
            <a
              href={`https://www.examtopics.com/exams/google/${mondayQuestion?.data?.exam}/view/${mondayQuestion?.data?.page}`}
              target="_blank"
            >
              {mondayQuestion?.data?.exam} #{mondayQuestion?.data?.question}
            </a>
          </h4>
          <div>
            Our answer{" "}
            <select value={mondayNote?.data?.ourAnswer ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            <input
              type="checkbox"
              checked={
                !!mondayNote?.data?.ourAnswer &&
                mondayNote?.data?.ourAnswer === mondayNote?.data?.mostVoted
              }
              disabled
            />{" "}
            <select value={mondayNote?.data?.mostVoted ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            Most voted
          </div>{" "}
          <br />
          {mondayNote?.data?.comments?.map((comment) => <p>{comment.text}</p>)}
          <hr style={{ width: "400px" }} />
          <h4>
            Tuesday:{" "}
            <a
              href={`https://www.examtopics.com/exams/google/${tuesdayQuestion?.data?.exam}/view/${tuesdayQuestion?.data?.page}`}
              target="_blank"
            >
              {tuesdayQuestion?.data?.exam} #{tuesdayQuestion?.data?.question}
            </a>
          </h4>
          <div>
            Our answer{" "}
            <select value={tuesdayNote?.data?.ourAnswer ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            <input
              type="checkbox"
              checked={
                !!tuesdayNote?.data?.ourAnswer &&
                tuesdayNote?.data?.ourAnswer === tuesdayNote?.data?.mostVoted
              }
              disabled
            />{" "}
            <select value={tuesdayNote?.data?.mostVoted ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            Most voted
          </div>{" "}
          <br />
          {tuesdayNote?.data?.comments?.map((comment) => <p>{comment.text}</p>)}
          <hr style={{ width: "400px" }} />
          <h4>
            Wednesday:{" "}
            <a
              href={`https://www.examtopics.com/exams/google/${wednesdayQuestion?.data?.exam}/view/${wednesdayQuestion?.data?.page}`}
              target="_blank"
            >
              {wednesdayQuestion?.data?.exam} #
              {wednesdayQuestion?.data?.question}
            </a>
          </h4>
          <div>
            Our answer{" "}
            <select value={wednesdayNote?.data?.ourAnswer ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            <input
              type="checkbox"
              checked={
                !!wednesdayNote?.data?.ourAnswer &&
                wednesdayNote?.data?.ourAnswer ===
                  wednesdayNote?.data?.mostVoted
              }
              disabled
            />{" "}
            <select value={wednesdayNote?.data?.mostVoted ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            Most voted
          </div>{" "}
          <br />
          {wednesdayNote?.data?.comments?.map((comment) => (
            <p>{comment.text}</p>
          ))}
          <hr style={{ width: "400px" }} />
          <h4>
            Thursday:{" "}
            <a
              href={`https://www.examtopics.com/exams/google/${thursdayQuestion?.data?.exam}/view/${thursdayQuestion?.data?.page}`}
              target="_blank"
            >
              {thursdayQuestion?.data?.exam} #{thursdayQuestion?.data?.question}
            </a>
          </h4>
          <div>
            Our answer{" "}
            <select value={thursdayNote?.data?.ourAnswer ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            <input
              type="checkbox"
              checked={
                !!thursdayNote?.data?.ourAnswer &&
                thursdayNote?.data?.ourAnswer === thursdayNote?.data?.mostVoted
              }
              disabled
            />{" "}
            <select value={thursdayNote?.data?.mostVoted ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            Most voted
          </div>{" "}
          <br />
          {thursdayNote?.data?.comments?.map((comment) => (
            <p>{comment.text}</p>
          ))}
          <hr style={{ width: "400px" }} />
          <h4>
            Friday:{" "}
            <a
              href={`https://www.examtopics.com/exams/google/${fridayQuestion?.data?.exam}/view/${fridayQuestion?.data?.page}`}
              target="_blank"
            >
              {fridayQuestion?.data?.exam} #{fridayQuestion?.data?.question}
            </a>
          </h4>
          <div>
            Our answer{" "}
            <select value={fridayNote?.data?.ourAnswer ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            <input
              type="checkbox"
              checked={
                !!fridayNote?.data?.ourAnswer &&
                fridayNote?.data?.ourAnswer === fridayNote?.data?.mostVoted
              }
              disabled
            />{" "}
            <select value={fridayNote?.data?.mostVoted ?? ""} disabled>
              <option> </option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>{" "}
            Most voted
          </div>{" "}
          <br />
          {fridayNote?.data?.comments?.map((comment) => <p>{comment.text}</p>)}
          <hr style={{ width: "400px" }} />
          <br />
          <a href="https://github.com/jensravn/jravn">{gitHubLogo}</a>
        </div>
      </main>
    </div>
  );
}
