"use client";
import { useCountdown } from "@/Hooks";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { IPaymentInfo } from "@/types/transaction";
import React from "react";

function VAPayment({ payment }: { payment: IPaymentInfo }) {
  const { hours, minutes, seconds, isExpired } = useCountdown(
    payment.expired_at ?? ""
  );

  if (payment.virtual_account_number && !isExpired)
    return (
      <div className="bg-background p-3 rounded-xl">
        <p
          className="text-xs text-muted-foreground text-center mb-1"
          style={{ fontSize: "65%" }}
        >
          Nomor Virtual Account {payment.payment_channel}
        </p>
        <p className="text-sm text-center mt-3">
          {payment.virtual_account_name}
        </p>
        <div className="flex justify-center items-center">
          <h4 className="text-center font-semibold">
            {payment.virtual_account_number}
          </h4>
          <CopyToClipboard text={payment.virtual_account_number} />
        </div>
        <div className="flex justify-center items-center ">
          {
            payment.expired_at && <div>Expired at: {payment.expired_at}</div>
          }
          {/* <p className="text-xs bg-red-400 text-white p-1 mt-1 rounded-lg px-2">
            {hours} : {minutes} : {seconds}
          </p> */}
        </div>
      </div>
    );
}

export default VAPayment;
