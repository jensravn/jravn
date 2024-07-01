"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import useSWR from "swr";
import View, { ISOdateString, QuestionData, YearMonthDay } from "./view";

export default function Question() {
  return (
    <Suspense>
      <Inner />
    </Suspense>
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
  const question = useSWR<QuestionData>(
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

  const handleDateChange = (date: ISOdateString) =>
    push(`/question?date=${date}}`);

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
  return (
    <View
      date={date}
      note={note}
      onBack={handleBack}
      onDateChange={handleDateChange}
      onForward={handleForward}
      onMostVoted={handleMostVoted}
      onOurAnswer={handleOurAnswer}
      question={question}
      today={today}
    />
  );
}

function yearMonthDay(date: Date): YearMonthDay {
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
