import Head from "next/head";
import Image from "next/image";
import Row from "../components/row/row";
import styles from "../styles/Home.module.css";
import { Product } from "../types/types";

export default function Home() {
  const products: Product[] = [
    {
      id: "0001",
      name: "Test 1",
      startDate: new Date(2022, 1, 1),
      endDate: new Date(2022, 2, 2),
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>jensravn playground | Product </title>
        <meta name="description" content="Fun fun fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Product</h1>
        {products.map((product) => (
          <Row key={product.id} product={product} />
        ))}
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
