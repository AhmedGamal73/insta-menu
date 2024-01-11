"use client";

import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserDetails({ user }) {
  const { toast } = useToast();
  const [data, setData] = useState<string>("");

  const id = useRouter().query.id;
  console.log(id);
  const generateQR = async (userId: string) => {
    try {
      const res = await fetch("http://localhost:3001/api/qr/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const code64 = await res.json();

      setData(code64.dataImage);

      // Store the image data in local storage
      localStorage.setItem("qrCodeImage", code64.dataImage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof id === "string") {
      generateQR(id);
    }
  }, [id]);
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-2">
        <img className="w-1/3" src={data} />
        <Button
          type="button"
          onClick={() => {
            if (typeof id === "string") {
              generateQR(id);
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
