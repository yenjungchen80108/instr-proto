import s3 from "@/utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { fileName } = req.body;

  if (!fileName) {
    return res.status(400).json({ message: "fileName is required" });
  }

  try {
    const bucketName = "instr-bucket"; // 替换为你的 S3 存储桶名称
    const key = `${fileName}`; // S3 中文件的路径和名称

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: "application/json", // 上传文件类型
    });

    const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL 有效期 1 小时

    res.status(200).json({ url: presignedUrl, key });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    res.status(500).json({ message: "Failed to generate presigned URL" });
  }
}
