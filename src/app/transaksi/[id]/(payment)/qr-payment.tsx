"use client";
import { IQRPayment } from "@/types/transaction";
import React from "react";
import QRCode from "react-qr-code";

function QRPayment({ payment }: { payment: IQRPayment }) {
  if (payment.qr_code)
    return (
      <div className="w-full">
        <p className="text-muted-foreground">QR Code Pembayaran</p>
        <div className="h-full max-h-44 aspect-square mt-3">
          <QRCode
            size={256}
            style={{
              height: "auto",
              maxWidth: "100%",
              width: "100%",
            }}
            value={payment.qr_code}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    );
}

export default QRPayment;
