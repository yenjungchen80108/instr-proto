const IMAGE_HOST = "https://instr-bucket.s3.us-east-1.amazonaws.com";

export const withS3Host = (path) => `${IMAGE_HOST}${path}`;
