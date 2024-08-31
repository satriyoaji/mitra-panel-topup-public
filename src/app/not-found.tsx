import { Button } from "@/components/ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <Image
        src={
          "/assets/illustration/DrawKit Larry Character Illustration (1).svg"
        }
        alt="dw"
        title="dw"
        width={200}
        height={200}
      />
      <h3 className="text-4xl -mt-14 font-bold">Halaman Tidak Ditemukan</h3>
      <Link className="mb-3 mt-12" href="/">
        <Button>Kembali Ke Beranda</Button>
      </Link>
    </div>
  );
}

export default NotFound;
