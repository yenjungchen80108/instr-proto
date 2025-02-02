import { S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";

// 初始化 S3 Client (Server-Side)
const s3 = new S3Client({
  region: "us-east-1",
  credentials: fromIni({ profile: "personal" }), // 只在 Server-side 運行
});

export default s3;
