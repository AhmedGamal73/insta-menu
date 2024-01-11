import { Button } from "@/components/ui/button";
import Link from "next/link";

interface User {
  name: string;
  email: string;
  password: string;
}

export default function App(): any {
  return (
    <div className="flex justify-center flex-col gap-12 pe-4 ps-4">
      Dashbaord
      <Link href="/users">
        <Button variant="destructive">List of Tables</Button>
      </Link>
    </div>
  );
}
