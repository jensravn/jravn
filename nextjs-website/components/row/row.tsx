import { isoFormat } from "../../helpers/date";
import { Product } from "../../types/types";
import styles from "./row.module.css";

type Props = { product: Product };

const Row = ({ product }: Props) => (
  <div className={styles.row}>
    <div>{product.id}</div>
    <div>{product.name}</div>
    <div>{isoFormat(new Date(product.startDate))}</div>
    <div>{isoFormat(new Date(product.endDate))}</div>
  </div>
);

export default Row;
