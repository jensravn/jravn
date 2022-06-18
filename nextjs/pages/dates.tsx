import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import dateRanges from "../components/dateRanges/dateRanges";
import DateRanges, { DateRangeType } from "../components/dateRanges/dateRanges";
import { fetcher } from "../helpers/fetcher";
import styles from "../styles/Home.module.css";
import { Product } from "../types/types";

export default function Dates() {
  const { data, error } = useSWR<Product[]>("/api/product", fetcher);

  const dateRanges: DateRangeType[] =
    data?.map(
      (x) =>
        ({
          name: x.name,
          start: new Date(x.startDate),
          end: new Date(x.endDate),
        } as DateRangeType)
    ) ?? [];

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
