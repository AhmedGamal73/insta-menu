// import { Request, Response } from "express"
// import { S3Service } from '../services/s3Service'


// export const uploadController = async (req: Request, res: Response) {
//   try {
//     const s3Service = new S3Service();
//     const imgUrl = await s3Service.uploadImage(req.file)
//     res.send("Image Upload to S3: " + imgUrl)

//   } catch (err) {
//     console.log(err)
//     res.status(500).send("Internal Server Error")
//   }
// }
