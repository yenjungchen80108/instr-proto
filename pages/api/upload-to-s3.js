import s3 from "@/utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import * as formidable from "formidable";
import fs from "fs";

// Next.js 默认不支持 multipart/form-data，它的 req.body 只能解析 JSON 格式
export const config = {
  api: {
    bodyParser: false, // 禁用默认的 JSON 解析
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // 使用 formidable 解析 multipart/form-data
  // 1.	解析 multipart/form-data，从 req 中提取 fields（普通文本数据）和 files（上传的文件）。
  // 2.	获取上传文件的真实路径（临时存储路径），然后我们可以读取文件内容并上传到 S3。
  // **动态导入 `formidable`**
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res.status(500).json({ message: "File parsing error" });
    }

    const fileArray = files.file; // `files.file` 可能是数组
    const file = Array.isArray(fileArray) ? fileArray[0] : fileArray; // 获取第一个文件
    const fileName = Array.isArray(fields.fileName)
      ? fields.fileName[0]
      : fields.fileName;
    const fileType = Array.isArray(fields.fileType)
      ? fields.fileType[0]
      : fields.fileType;

    if (!file || !file.filepath || !fileName || !fileType) {
      console.error("Invalid file object:", file);
      return res.status(400).json({ message: "Missing file parameters" });
    }

    try {
      // 读取文件数据
      const fileData = fs.readFileSync(file.filepath);

      // 上传到 S3
      const params = {
        Bucket: "instr-bucket",
        Key: fileName,
        Body: fileData, // 这里才是真正的文件内容
        ContentType: fileType,
        ACL: "public-read",
      };

      console.log("params", params);

      const command = new PutObjectCommand(params);
      console.log("command", command);
      await s3.send(command);

      res.status(200).json({
        message: "Upload successful",
        fileUrl: `https://instr-bucket.s3.amazonaws.com/${fileName}`,
      });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).json({ message: "Upload failed", error: error.message });
    }
  });
}
