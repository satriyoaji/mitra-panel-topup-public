"use client";
import React, { useContext, useEffect, useState } from "react";
import PaymentList from "./payment-list";
import { IPaymentGroup } from "@/types/transaction";

function Payment() {
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

  return <PaymentList paymentGroup={paymentGroups} />;
}

export default Payment;
