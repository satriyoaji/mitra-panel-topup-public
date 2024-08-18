"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { PhoneInput } from "@/components/ui/custom-input";

function Page() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    var res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        phone,
        name,
      }),
    });

    setLoading(false);
    if (!res.ok) {
      return toast({
        title: "Failed",
        description: "Registrasi Akun Gagal",
        variant: "destructive",
      });
    }

    window.location.replace("/auth/login");
  };

  return (
    <div className="relative h-[86vh] flex md:items-center justify-center w-full px-0">
      <div className="md:border p-8 md:rounded-lg md:shadow-md w-full max-w-md">
        <h1 className="pt-4 text-2xl text-center font-semibold tracking-tight">
          🔐Register
        </h1>
        <form className="w-full max-w-md grid gap-2 pt-4" onSubmit={onSubmit}>
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="nama" className="text-left">
              Nama
            </Label>
            <Input
              id="nama"
              placeholder="Masukan nama"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="password" className="text-left">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Masukan Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm gap-1.5">
            <Label htmlFor="Whatsapp" className="text-left">
              No. Whatsapp
            </Label>
            <PhoneInput
              id="Whatsapp"
              type="tel"
              name="phone"
              placeholder="Masukan No. Whatsapp"
              onValueChange={(e) => setPhone(`${e}`)}
            />
          </div>

          <div className="mt-4 space-y-1">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </Button>
            <div className="flex items-center justify-center">
              <p className="text-xs">Sudah Punya Akun? </p>
              <Link href="/auth/login">
                <Button variant="link" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
