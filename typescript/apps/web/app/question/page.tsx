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
    fetcher
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

  if (error) return `Error: ${error.status} ${error.info}`;
  if (isLoading) return "Loading...";
  if (data)
    return (
      <div className={styles.inner}>
        <h1>{data.date}</h1>
        <h2>
          <a
            href={`https://www.examtopics.com/exams/google/${data.exam}/view/${data.page}`}
          >
            {data.exam} #{data.question}
          </a>
        </h2>
        <div>
          <Button onClick={handleBack}>👈</Button>
          &nbsp;
          {
            <Button disabled={isAfterYesterday(date)} onClick={handleForward}>
              👉
            </Button>
          }
        </div>
      </div>
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

function isAfterYesterday(date: string) {
  return new Date(date) >= new Date(new Date().toDateString());
}
