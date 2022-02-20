import { isoFormat } from "../../helpers/date";
import { Product } from "../../types/types";
import styles from "./row.module.css";

type Props = { product: Product };

const Row = ({ product }: Props) => (
  <div className={styles.row}>
    <div>{product.id}</div>
    <div>{product.name}</div>
    <div>{isoFormat(product.startDate)}</div>
    <div>{isoFormat(product.endDate)}</div>
  </div>
);

export default Row;
