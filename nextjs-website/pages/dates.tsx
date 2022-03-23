import Head from "next/head";
import Image from "next/image";
import DateRanges, { DateRangeType } from "../components/dateRanges/dateRanges";
import styles from "../styles/Home.module.css";

export default function Dates() {
  const dateRanges: DateRangeType[] = [
    {
      name: "Effective",
      start: new Date("2022-01-01"),
      end: new Date("2022-09-01"),
    },
    {
      name: "Set by user",
      start: undefined,
      end: undefined,
    },
    {
      name: "From child dates",
      start: new Date("2022-01-01"),
      end: new Date("2022-09-01"),
    },
    {
      name: "Restriction rule",
      start: undefined,
      end: new Date("2022-12-01"),
    },
    {
      name: "Base system",
      start: new Date("2022-02-01"),
      end: undefined,
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>jensravn playground | Dates </title>
        <meta name="description" content="Fun fun fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Dates</h1>
        <DateRanges dateRanges={dateRanges} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/jensravn/gcp-playground-jens"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image
              src="/GitHub-Mark-64px.png"
              alt="GitHub Logo"
              width={16}
              height={16}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
