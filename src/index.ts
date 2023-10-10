import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
dotenv.config();

let Bucket = process.env.BUCKET_NAME;

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AccessKeyId || "AccessKeyId here ...",
    secretAccessKey: process.env.SecretAccessKey || "SecretAccessKey here ...",
  },
});

async function getObjectUrl(key: string) {
  const newCommnad = new GetObjectCommand({
    Bucket,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, newCommnad);
  return url;
}
// do a put request on it
async function putObjectUrl(filename: string, contentType: string) {
  const newCommnad = new PutObjectCommand({
    Bucket,
    Key: `uploads/${filename}`,
    ContentType: contentType,
  });
  const url = await getSignedUrl(s3Client, newCommnad);
  return url;
}

// do a put request on it
async function deleteObject(key: string) {
  const newCommnad = new DeleteObjectCommand({
    Bucket,
    Key: key,
  });
  s3Client.send(newCommnad);
}
(async () => {
  //! get a object
  //? let url = await getObjectUrl("login-wallpaper.webp");

  //! upload a object
  //? let url = await putObjectUrl("hello.webp", "image/webp");

  //! deleting a object
  await deleteObject("login-wallpaper.webp");
  
})();
