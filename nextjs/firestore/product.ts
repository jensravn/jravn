import { Firestore } from "@google-cloud/firestore";

export type FirestoreProduct = {
  id: string;
  startDate: FirebaseFirestore.Timestamp;
  name: string;
  endDate: FirebaseFirestore.Timestamp;
};

export async function getProducts() {
  const firestore = new Firestore();
  const collectionReference = firestore.collection("product");
  const productDocuments = await collectionReference.get();
  const productDocumentData = productDocuments.docs
    .map((doc) => doc.data() as FirestoreProduct)
    .map((data) => ({
      id: data.id,
      name: data.name,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
    }));
  return productDocumentData;
}
