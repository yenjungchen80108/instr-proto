import s3 from "@/utils/s3";
import {
  ListObjectVersionsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { S3_BUCKET_NAME } from "@/constants/s3";

/**
 * API: 根据 initialETag 和 latestETag 取得对应 JSON 文件内容
 * @param {string} fileName - S3 文件名
 * @param {string} initialETag - 初始 ETag
 * @param {string} latestETag - 最新 ETag
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { fileName, initialETag, latestETag } = req.body;

  if (!fileName || !initialETag || !latestETag) {
    return res
      .status(400)
      .json({ message: "fileName, initialETag, and latestETag are required" });
  }

  try {
    const bucketName = process.env.AWS_BUCKET_NAME || S3_BUCKET_NAME;

    // **Step 1: 获取 S3 所有版本**
    const listCommand = new ListObjectVersionsCommand({
      Bucket: bucketName,
      Prefix: fileName,
    });
    const listResponse = await s3.send(listCommand);

    if (!listResponse.Versions || listResponse.Versions.length === 0) {
      return res
        .status(404)
        .json({ message: "No versions found for the given file." });
    }

    // **Step 2: 找到 initialETag 和 latestETag 对应的 Version ID**
    const findVersionIdByETag = (etag) => {
      const version = listResponse.Versions.find(
        (v) => v.ETag.replace(/"/g, "") === etag
      );
      return version ? version.VersionId : null;
    };

    const initialVersionId = findVersionIdByETag(initialETag);
    const latestVersionId = findVersionIdByETag(latestETag);

    if (!initialVersionId || !latestVersionId) {
      return res
        .status(404)
        .json({ message: "Could not find versions for given ETags." });
    }

    // **Step 3: 取得对应版本的 JSON 文件**
    const fetchS3Json = async (versionId) => {
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        VersionId: versionId,
      });

      const response = await s3.send(getObjectCommand);
      const body = await response.Body.transformToString("utf-8"); // 转换 JSON
      return JSON.parse(body);
    };

    const initialJson = await fetchS3Json(initialVersionId);
    const latestJson = await fetchS3Json(latestVersionId);

    res.status(200).json({ initialJson, latestJson });
  } catch (error) {
    console.error("Error fetching previous and latest config:", error);
    res.status(500).json({ message: "Failed to fetch config versions" });
  }
}
