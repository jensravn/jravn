import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../types/types";
import { Firestore } from "@google-cloud/firestore";

async function getProducts() {
  const firestore = new Firestore();
  const collectionReference = firestore.collection("product");
  const productDocuments = await collectionReference.get();
  const productDocumentData = productDocuments.docs
    .map((doc) => doc.data())
    .map((data) => ({
      id: data.id,
      name: data.name,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
    }));
  return productDocumentData;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  const products = await getProducts();
  res.status(200).json(products as any);
}
