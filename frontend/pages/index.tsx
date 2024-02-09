import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App(): any {
  const router = useRouter();
  const [map, setMap] = useState<string>("");

  useEffect(() => {
    if (window.innerWidth > 768) {
      router.push("/t");
    }
  }, []);

  return (
    <div className="flex justify-center flex-col gap-12 pe-4 ps-4">
      Dashbaord
      <Link href="/menu">
        <Button variant="destructive">List of Tables</Button>
      </Link>
    </div>
  );
}
