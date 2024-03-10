// import AWS from '@aws-sdk/client-s3'
// import { Readable } from 'stream'

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multer from "multer";

// const s3 = new AWS.S3();

// const uploadImage = async (file: Express.Multer.File) => {
//   const stream = Readable.from([file.buffer]);
//   const uploadParams = {
//     Bucket: 'your-bucket-name',
//     Key: file.originalname,
//     Body: stream,
//   };

//   try {
//     const response = await s3.upload(uploadParams).promise();
//     return response.Location;
//   } catch (error) {
//     throw new Error(`Error uploading image to S3: ${error.message}`);
//   }
// };

// module.exports = { uploadImage };

// send product image to s3 bucket
const s3 = new S3Client([
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION,
  },
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

const uploadToS3 = async (file: Express.Multer.File) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return await s3.send(new PutObjectCommand(params));
};

exports = {
  uploadToS3,
  multerMiddleware: upload.single("image"),
};
