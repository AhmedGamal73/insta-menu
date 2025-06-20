import { ImagePlus } from "lucide-react";

const UploadImage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 py-4 w-full cursor-pointer ">
      <ImagePlus />
      <h6>اختر صورة أو اسحب وأرفق أو حمل</h6>
      <span>يقبل JPG و PNG و WEBP - الحد الأقصي (10 ميجا)</span>
    </div>
  );
};

export default UploadImage;
