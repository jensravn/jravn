"use client";

import { QuestionData, YearMonthDay } from "@repo/ui/page-question-daily";
import PageQuestionReview from "@repo/ui/page-question-review";
import { getWeek, getYear, isFriday, previousFriday, subDays } from "date-fns";
import Image from "next/image";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import useSWR from "swr";

export default function WeeklyReview() {
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
    const friday = previousFriday(d);
    const { year, month, day } = yearMonthDay(friday);
    redirect(`?date=${year}-${month}-${day}`);
  }
  const d = new Date(date);
  if (!isFriday(d)) {
    const friday = previousFriday(date);
    const { year, month, day } = yearMonthDay(friday);
    redirect(`?date=${year}-${month}-${day}`);
  }
  const week = getWeek(d);
  const leadingZero = week < 10 ? "0" : "";
  const weekYear = `${leadingZero}${getWeek(d)}, ${getYear(d)}`;
  const fridayQuestion = getQuestion(d);
  const fridayNote = getNote(d);
  const thursday = subDays(d, 1);
  const thursdayQuestion = getQuestion(thursday);
  const thursdayNote = getNote(thursday);
  const wednesday = subDays(thursday, 1);
  const wednesdayQuestion = getQuestion(wednesday);
  const wednesdayNote = getNote(wednesday);
  const tuesday = subDays(wednesday, 1);
  const tuesdayQuestion = getQuestion(tuesday);
  const tuesdayNote = getNote(tuesday);
  const monday = subDays(tuesday, 1);
  const mondayQuestion = getQuestion(monday);
  const mondayNote = getNote(monday);

  const handleBack = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 7);
    const { year, month, day } = yearMonthDay(d);
    push(`?date=${year}-${month}-${day}`);
  };

  const handleForward = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 7);
    const { year, month, day } = yearMonthDay(d);
    push(`?date=${year}-${month}-${day}`);
  };

  return (
    <>
      <PageQuestionReview
        weekYear={weekYear}
        onBack={handleBack}
        onForward={handleForward}
        mondayQuestion={mondayQuestion}
        mondayNote={mondayNote}
        tuesdayQuestion={tuesdayQuestion}
        tuesdayNote={tuesdayNote}
        wednesdayQuestion={wednesdayQuestion}
        wednesdayNote={wednesdayNote}
        thursdayQuestion={thursdayQuestion}
        thursdayNote={thursdayNote}
        fridayQuestion={fridayQuestion}
        fridayNote={fridayNote}
        gitHubLogo={
          <Image src="/github-logo.svg" alt="GitHub" width="24" height="24" />
        }
      />
    </>
  );
}

function getNote(date: Date) {
  const { year, month, day } = yearMonthDay(date);
  return useSWR(
    `/api/daily-cloud-question/note/${year}/${month}/${day}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );
}

function getQuestion(date: Date) {
  const { year, month, day } = yearMonthDay(date);
  return useSWR<QuestionData>(
    `/api/daily-cloud-question/${year}/${month}/${day}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
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
