import { Badge } from "@/components/ui/badge";
import { ETransactionStatus } from "@/types/enums";
import React from "react";

function BadgeTransaksi({ status }: { status: number }) {
  return (
    <>
      {status === ETransactionStatus.Unpaid ? (
        <Badge variant="destructive">Unpaid</Badge>
      ) : status === ETransactionStatus.Paid ? (
        <Badge variant="success">Paid</Badge>
      ) : status === ETransactionStatus["On Process"] ? (
        <Badge variant="blue">On Process</Badge>
      ) : status === ETransactionStatus.Delivered ? (
        <Badge variant="success">Delivered</Badge>
      ) : status === ETransactionStatus.Failed ? (
        <Badge variant="destructive">Failed</Badge>
      ) : status === ETransactionStatus.Refunded ? (
        <Badge variant="purple">Refunded</Badge>
      ) : status === ETransactionStatus.Expired ? (
        <Badge variant="destructive">Expired</Badge>
      ) : (
        <></>
      )}
    </>
  );
}

export default BadgeTransaksi;
