import { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";

import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const url = req.query.url as string;
  // if (!url) {
  //   return res.send(
  //     'Please provide URL as GET parameter, for example: <a href="?url=https://example.com">?url=https://example.com</a>'
  //   );
  // }
  const imageBuffer = await getScreenshot(url);
  uploadFromMemory(imageBuffer).catch(console.error);
  res.setHeader("Content-Type", "image/png");
  res.send(imageBuffer);
}

const getScreenshot = async (url: string) => {
  console.log(process.env.CHROME_BIN);
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    executablePath: process.env.CHROME_BIN,
  });
  const page = await browser.newPage();
  await page.goto("https://www.pricerunner.dk/t/2/Computer-Software");
  const imageBuffer = await page.screenshot({
    clip: { x: 0, y: 1000, height: 400, width: 800 },
  });
  browser.close();
  return imageBuffer;
};

const storage = new Storage();

async function uploadFromMemory(imageBuffer: Buffer | string) {
  const bucketName = "gcp-playground-jens-screenshot";
  const timestamp = new Date().toISOString();
  const destFileName = `${timestamp}-pricerunner.png`;
  await storage.bucket(bucketName).file(destFileName).save(imageBuffer);

  console.log(`${destFileName} uploaded to ${bucketName}.`);
}
