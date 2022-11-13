import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../business/product";
import { getProducts } from "../../firestore/product";

export default async function product(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products = await getProducts();
  res.status(200).json(products);
}
