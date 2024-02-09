import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";

const BackHome = () => {
  return (
    <Link
      href="/"
      className="self-end w-10 h-10 bg-white/50 backdrop-blur rounded-lg"
    >
      <ArrowLeft className="text-[#eeee] h-6 w-6" />
    </Link>
  );
};

export default BackHome;
