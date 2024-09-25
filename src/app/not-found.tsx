"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <Image
        src={
          "/assets/illustration/DrawKit Larry Character Illustration (1).svg"
        }
        alt="dw"
        width={500}
        height={400}
      />
      <h3 className="text-2xl sm:text-4xl align-middle text-center font-bold">
        Halaman Tidak Ditemukan
      </h3>
      <Button className="my-3" onClick={() => router.push("/")}>
        Kembali Ke Beranda
      </Button>
    </div>
  );
}

export default NotFound;
