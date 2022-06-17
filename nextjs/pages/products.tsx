import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import Row from "../components/row/row";
import styles from "../styles/Home.module.css";
import { Product } from "../types/types";

const fetcher = () => fetch("/api/product").then((res) => res.json());

export default function Products() {
  const { data: products, error } = useSWR<Product[]>("/api/product", fetcher);

  return (
    <div className={styles.container}>
      <Head>
        <title>jensravn playground | Product </title>
        <meta name="description" content="Fun fun fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Product</h1>
        <br />
        <a href="https://go-cmd-web-cg7lqxhiua-ew.a.run.app/product">
          Add Product
        </a>
        <br />
        {error ? (
          <div>Failed to load</div>
        ) : !products ? (
          <div>Loading...</div>
        ) : (
          products.map((product: Product) => (
            <Row key={product.id} product={product} />
          ))
        )}
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
