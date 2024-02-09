// import AWS from '@aws-sdk/client-s3'
// import { Readable } from 'stream'

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
