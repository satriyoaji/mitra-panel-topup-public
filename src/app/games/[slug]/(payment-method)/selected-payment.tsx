"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext } from "react";

function SelectedPayment({ onClick }: { onClick?: () => void }) {
  const { data } = useContext(TransactionContext) as ITransactionContext;
  const { data: session } = useSession();

  return (
    <div
      className="cursor-pointer rounded-xl hover:bg-slate-50 border-2 border-primary"
      role="button"
      onClick={() => onClick && onClick()}
    >
      <div className="py-4 px-6 w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex w-full items-center">
            {data.payment ? (
              <>
                {/* {session && session?.profile.saldo > 0 && (
                  <>
                    <p>🪙 Points</p>
                    <Separator orientation="vertical" className="mx-4 h-10" />
                  </>
                )} */}
                <div className="flex items-center gap-2">
                  {data.payment.image_url ? (
                    <Image
                      alt={data.payment.name}
                      src={data.payment.image_url}
                      width={70}
                      height={70}
                    />
                  ) : (
                    <p className="text-xl p-0 m-0 mb-1">💳</p>
                  )}
                  <p className="text-xs mt-0 p-0">{data.payment.name}</p>
                </div>
              </>
            ) : (
              <>
                <p>Pilih Metode Pembayaran</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedPayment;
