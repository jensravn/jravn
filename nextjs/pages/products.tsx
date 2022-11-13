import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { Product } from "../business/product";
import { isoFormat } from "../helpers/date";
import { fetcher } from "../helpers/fetcher";
import styles from "../styles/Home.module.css";

export default function Products() {
  const { data: products, error } = useSWR<Product[], Error>(
    "/api/product",
    fetcher
  );

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
        <div className="table w-full">
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell text-left">id</div>
              <div className="table-cell text-left">name</div>
              <div className="table-cell text-left">start</div>
              <div className="table-cell text-left">end</div>
            </div>
          </div>
          <div className="table-row-group">
            {error ? (
              <div>Failed to load</div>
            ) : !products ? (
              <div>Loading...</div>
            ) : (
              products.map((product: Product) => (
                <div key={product.id} className="table-row">
                  <div className="table-cell">{product.id}</div>
                  <div className="table-cell">{product.name}</div>
                  <div className="table-cell">
                    {isoFormat(new Date(product.startDate))}
                  </div>
                  <div className="table-cell">
                    {isoFormat(new Date(product.endDate))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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
