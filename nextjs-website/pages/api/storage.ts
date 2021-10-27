// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
const storage = new Storage();

async function getBuckets() {
  const [buckets] = await storage.getBuckets();
  console.log("Buckets:");
  buckets.forEach((bucket) => {
    console.log(bucket.name);
  });
  return buckets;
}

type Data = {
  buckets: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const buckets = await getBuckets();
  res.status(200).json({ buckets: buckets.map((bucket) => bucket.name) });
}
