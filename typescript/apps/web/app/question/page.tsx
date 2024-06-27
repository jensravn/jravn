"use client";

import { useSearchParams, redirect } from "next/navigation";
import styles from "./page.module.css";
import { Suspense } from "react";
import useSWR from "swr";

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
    fetcher
  );

  if (error) return `Error: ${error.status} ${error.info}`;
  if (isLoading) return "Loading...";
  if (data)
    return (
      <h1>
        {data.date}:{" "}
        <a
          href={`https://www.examtopics.com/exams/google/${data.exam}/view/${data.page}`}
        >
          {data.exam} #{data.question}
        </a>
      </h1>
    );
}

function yearMonthDay(date: Date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
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
