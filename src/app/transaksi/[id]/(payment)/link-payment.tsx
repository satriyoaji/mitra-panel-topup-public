"use client";
import { ILinkPayment } from "@/types/transaction";
import Link from "next/link";
import React from "react";

function LinkPayment({ payment }: { payment: ILinkPayment }) {
  return (
    <>
      <div className="w-full space-y-2">
        <p className="text-muted-foreground w-full">Link Pembayaran</p>
        {payment.mobile_url ? (
          <Link
            href={payment.mobile_url}
            className="text-right text-sm w-full hover:underline md:hidden text-blue-600 hover:text-blue-800"
          >
            {payment.mobile_url}
          </Link>
        ) : null}
        {payment.web_url ? (
          <Link
            href={payment.web_url}
            className="text-right text-sm w-full hover:underline hidden md:block text-blue-600 hover:text-blue-800"
          >
            {payment.web_url}
          </Link>
        ) : null}
      </div>
    </>
  );
}

export default LinkPayment;
