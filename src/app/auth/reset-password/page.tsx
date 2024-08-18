"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

function Page() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast({
      title: "Email Reset Sandi Terkirim",
      description:
        "Sistem mengirimkan link reset Sandi ke email, Harap periksa email",
      variant: "success",
    });
    setLoading(false);

    setTimeout(() => {
      window.location.replace("/auth/login");
    }, 5000);
  };

  return (
    <div className="relative h-[86vh] flex md:items-center justify-center w-full px-0">
      <div className="md:border p-8 md:rounded-lg md:shadow-md w-full max-w-md">
        <h1 className="pt-4 text-2xl text-center font-semibold tracking-tight">
          🔐Reset Password
        </h1>
        <form className="w-full max-w-md grid gap-2 pt-4" onSubmit={onSubmit}>
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="email" className="text-left">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukan Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4 space-y-1">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Reset"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
