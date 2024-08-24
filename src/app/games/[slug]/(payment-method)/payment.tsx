"use client";
import React, { RefObject, useContext, useEffect, useState } from "react";
import PaymentList from "./payment-list";
import { IPaymentGroup } from "@/types/transaction";

function Payment({ nextRef }: { nextRef: RefObject<HTMLDivElement> }) {
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

  return <PaymentList nextRef={nextRef} paymentGroup={paymentGroups} />;
}

export default Payment;
