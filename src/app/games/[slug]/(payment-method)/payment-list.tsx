"use client";

import React, { RefObject, useCallback, useContext, useState } from "react";
import Image from "next/image";
import { priceMask } from "@/Helpers";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { IPayment, IPaymentGroup } from "@/types/transaction";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

function PaymentList({
  paymentGroup,
  nextRef,
}: {
  paymentGroup: IPaymentGroup[];
  nextRef: RefObject<HTMLDivElement>;
}) {
  const { toast } = useToast();
  const { dispatch, data } = useContext(
    TransactionContext
  ) as ITransactionContext;
  const [length, setLength] = useState(2);

  const paymentFee = useCallback(
    (payment: IPayment) => {
      let fee = payment.fee_amount;

      if (data.product) {
        fee = payment.fee_amount + data.product.price;
        if (data.product.discounted_price)
          fee = payment.fee_amount + data.product.discounted_price;
        if (fee > 0) return priceMask(fee);
      }

      if (fee > 0) return `+ ${priceMask(fee)}`;
    },
    [data.product, data.payment]
  );

  const selectPayment = useCallback(
    (payment: IPayment) => {
      if (!data.product) {
        return toast({
          title: "Failed",
          description: "Pilih produk terlebih dahulu",
          variant: "destructive",
        });
      }
      if (payment.saldo) {
        let price = data.product.discounted_price || data.product.price;
        price += payment.fee_amount;
        if (price > payment.saldo)
          return toast({
            title: "Failed",
            description: "Saldo anda tidak cukup",
            variant: "destructive",
          });
      }
      dispatch({
        action: "SET_PAYMENT_METHOD",
        payload: payment,
      });
      nextRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    },
    [data.product, data.payment]
  );

  return (
    <>
      <div className="space-y-4">
        {paymentGroup.slice(0, length).map((group, idx) => (
          <div key={idx.toString()} className="pb-4">
            <div>
              <p className="text-muted-foreground text-xs">{group.name}</p>
            </div>
            <div className="mt-3">
              <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
                {group.payment_method.map((item) => (
                  <Card
                    key={item.name}
                    className={`flex hover:bg-zinc-50 rounded-lg justify-between items-center px-3 py-3 cursor-pointer ${
                      data.payment?.payment_channel == item.payment_channel &&
                      `border-2 border-primary`
                    }`}
                    onClick={(e) => selectPayment(item)}
                  >
                    <div>
                      <p className="text-xs md:mt-0">{item.name}</p>
                      <p
                        className={`text-xs mt-0.5 ${
                          data.payment?.payment_channel == item.payment_channel
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {paymentFee(item)}
                      </p>
                    </div>
                    <div className="md:flex items-center gap-4">
                      {item.image_url ? (
                        <Image
                          alt={item.name}
                          title={item.name}
                          src={item.image_url}
                          width={50}
                          height={50}
                        />
                      ) : (
                        <p className="text-xl text-left">💳</p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ))}
        {paymentGroup.length > 2 ? (
          <>
            <Separator className="my-2" />
            <Button
              variant="link"
              className="w-full"
              onClick={() => {
                if (length < paymentGroup.length)
                  return setLength(paymentGroup.length);
                setLength(2);
              }}
            >
              {length < paymentGroup.length
                ? "Pembayaran Lainnya"
                : "Sembunyikan"}
            </Button>
          </>
        ) : null}
      </div>
    </>
  );
}

export default PaymentList;
