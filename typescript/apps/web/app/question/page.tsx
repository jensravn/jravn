"use client";

import { useSearchParams, redirect, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Suspense } from "react";
import useSWR from "swr";
import { Button } from "@repo/ui/button";

type ApiQuestion = {
  exam: string;
  question: number;
  date: string;
  page: number;
};

export default function Question() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense>
          <Inner />
        </Suspense>
      </main>
    </div>
  );
}

function Inner() {
  const { push } = useRouter();
  const date = useSearchParams().get("date");
  if (!date) {
    const d = new Date();
    const { year, month, day } = yearMonthDay(d);
    redirect(`/question?date=${year}-${month}-${day}`);
  }
  const d = new Date(date);
  const { year, month, day } = yearMonthDay(d);
  const { data, error, isLoading } = useSWR<ApiQuestion>(
    `/api/daily-cloud-question/${year}/${month}/${day}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );
  const note = useSWR(
    `/api/daily-cloud-question/note/${year}/${month}/${day}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  const handleBack = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    const { year, month, day } = yearMonthDay(d);
    push(`/question?date=${year}-${month}-${day}`);
  };

  const handleForward = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    const { year, month, day } = yearMonthDay(d);
    push(`/question?date=${year}-${month}-${day}`);
  };

  const handleOurAnswer = (ourAnswer: string) => {
    fetch(`/api/daily-cloud-question/note/our-answer/${year}/${month}/${day}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ourAnswer }),
    }).then(() => note.mutate());
  };

  const handleMostVoted = (mostVoted: string) => {
    fetch(`/api/daily-cloud-question/note/most-voted/${year}/${month}/${day}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mostVoted }),
    }).then(() => note.mutate());
  };
  const today = yearMonthDay(new Date());
  if (error) return `Error: ${error.status} ${error.info}`;
  if (isLoading) return "Loading...";
  if (data)
    return (
      <div className={styles.inner}>
        <div className={styles.date}>
          <Button onClick={handleBack}>←</Button>
          &nbsp;
          <input
            type="date"
            value={date}
            onChange={(e) => push(`/question?date=${e.target.value}`)}
            max={`${today.year}-${today.month}-${today.day}`}
          />
          &nbsp;
          <Button disabled={isAfterYesterday(date)} onClick={handleForward}>
            →
          </Button>
        </div>
        <h2>
          <a
            href={`https://www.examtopics.com/exams/google/${data.exam}/view/${data.page}`}
            target="_blank"
          >
            {data.exam} #{data.question}
          </a>
        </h2>

        <br />
        <div>
          Our answer:{" "}
          <select
            onChange={(e) => handleOurAnswer(e.target.value)}
            value={note.data?.ourAnswer ?? ""}
            disabled={note.data?.ourAnswer || !isAfterYesterday(date)}
          >
            <option> </option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>{" "}
          - Most voted:{" "}
          <select
            onChange={(e) => handleMostVoted(e.target.value)}
            value={note.data?.mostVoted ?? ""}
            disabled={note.data?.mostVoted || !isAfterYesterday(date)}
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
            note.data?.ourAnswer &&
            note.data?.ourAnswer === note.data?.mostVoted
          }
          disabled
        />
      </div>
    );
}

function yearMonthDay(date: Date) {
  return {
    year: String(date.getFullYear()).padStart(2, "0"),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    day: String(date.getDate()).padStart(2, "0"),
  };
}

const fetcher = async (url: any) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    error.info = await res.text();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

function isAfterYesterday(date: string) {
  return new Date(date) >= new Date(new Date().toDateString());
}
