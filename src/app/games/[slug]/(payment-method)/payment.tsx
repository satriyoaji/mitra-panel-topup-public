"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import React, { useContext, useEffect, useState } from "react";
import PaymentList from "./payment-list";
import { IPaymentGroup } from "@/types/transaction";

function Payment({ number }: { number: number }) {
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [paymentGroups, setPaymentGroups] = useState<IPaymentGroup[]>([]);

  const getBank = async () => {
    var res = await fetch(`/api/payment`);

    if (res.ok) {
      const resData = await res.json();
      if (resData) {
        setPaymentGroups(resData.data);
        return;
      }
    }
  };

  useEffect(() => {
    getBank();
  }, []);

  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex gap-2 items-center mt-3">
          <div className="bg-primary p-2 w-7 h-7 flex justify-center items-center rounded-full">
            <h6 className="font-bold rounded-full text-white">{number}</h6>
          </div>
          <h6 className="font-medium ml-1">Metode Pembayaran</h6>
        </div>
        <Separator className="my-3" />
        <PaymentList paymentGroup={paymentGroups} />
      </CardContent>
    </Card>
  );
}

export default Payment;
