"use client";
import { useCountdown } from "@/Hooks";
import { IPaymentInfo } from "@/types/transaction";
import React from "react";
import QRCode from "react-qr-code";

function QRPayment({ payment }: { payment: IPaymentInfo }) {
  const { hours, minutes, seconds, isExpired } = useCountdown(
    payment.expired_at ?? ""
  );

  if (payment.qr_code && !isExpired)
    return (
      <div className="bg-background p-3 rounded-xl">
        <p
          className="text-xs text-muted-foreground text-center mb-1"
          style={{ fontSize: "65%" }}
        >
          QR Code {payment.payment_channel}
        </p>
        <div className="flex justify-center items-center mt-4">
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 120,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={payment.qr_code}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-2">
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

export default QRPayment;
