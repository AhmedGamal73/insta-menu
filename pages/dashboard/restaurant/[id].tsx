"use client";

import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function UserDetails({ user }) {
  const { toast } = useToast();
  const [data, setData] = useState<string>("");

  const tableId = useRouter().query.id;
  const generateQR = async (tableId: string) => {
    let code64 = localStorage.getItem("qrCodeImage");
    if (code64 && !code64 === null) {
      const parsedCode64 = JSON.parse(code64);
      setData(parsedCode64.dataImage);
    } else {
      const res = await fetch("http://localhost:3001/qr/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableId }),
      });

      const result = await res.json();
      localStorage.setItem("qrCodeImage", JSON.stringify(result));
      setData(result.dataImage);
    }
  };

  useEffect(() => {
    if (typeof tableId === "string") {
      generateQR(tableId);
      console.log(data);
    }
  }, [tableId]);
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-2">
        <img className="w-1/3" src={data} />
        <Button
          type="button"
          onClick={() => {
            console.log("clicked");
            if (typeof tableId === "string") {
              generateQR(tableId);
            } else {
              console.error("Expected id to be a string, but got an array");
            }
            toast({
              title: "New QR code",
              description: "Successfuly you had generated new QR code",
            });
          }}
        >
          Generate QR Code
        </Button>
      </div>

      <Link href="/dashboard/tables">
        <Button>Back To Users</Button>
      </Link>
    </div>
  );
}
