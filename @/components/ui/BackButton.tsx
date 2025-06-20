import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

const BackButton = ({ href }) => {
  const router = useRouter();
  return (
    <a className="p-3  border rounded-lg" href={href}>
      <ChevronLeftIcon />
    </a>
  );
};

export default BackButton;
