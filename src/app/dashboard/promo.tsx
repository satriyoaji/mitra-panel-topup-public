"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Promo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-transparent border-0 shadow-none z-50 max-w-4xl p-8 rounded-xl">
        <Image
          src="/assets/promo.webp"
          height={2000}
          width={2000}
          alt="promo"
          title="promo"
          className="rounded-xl"
        />
      </DialogContent>
    </Dialog>
  );
}

export default Promo;
