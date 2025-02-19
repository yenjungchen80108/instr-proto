import s3 from "@/utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3_BUCKET_NAME } from "@/constants/s3";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).json({ message: "fileName is required" });
  }

  try {
    const bucketName = process.env.AWS_BUCKET_NAME || S3_BUCKET_NAME;
    const key = `${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: "application/json",
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 900 }); // URL 有效期 15 分钟

    res.status(200).json({ url: presignedUrl, key });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ message: "Failed to generate presigned URL" });
  }
}
