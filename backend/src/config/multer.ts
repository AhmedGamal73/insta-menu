import multer from "multer";

export default function multerFn(path: string) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${path}`);
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
  });

  const upload = multer({ storage });
  return upload;
}
