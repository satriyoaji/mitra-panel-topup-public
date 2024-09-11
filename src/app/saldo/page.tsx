"use client";

import { nPlainFormatter, thousandMask } from "@/Helpers";
import BackHeader from "@/components/header/back-header";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IHistory {
  id: string;
  amount: number;
  last_amount: number;
  description: string;
  transaction_code: string;
  created_at: string;
  type: number;
  payment_logo: string;
  payment_name: string;
}

function Page() {
  const [balances, setBalances] = useState<IHistory[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var res = await fetch(`/api/profile/balance-history`);
    if (res.ok) {
      var result = await res.json();
      if (result.data) {
        setBalances(result.data);
      }
    }
  };

  return (
    <>
      <BackHeader title="Saldo Point History" />
      <div className="p-2">
        <p className="font-semibold p-1.5 w-full bg-slate-100 text-center rounded-md">
          {thousandMask(session?.profile.saldo)} Points
        </p>
        <p className="text-xs text-muted-foreground ml-2 mt-2">
          Merupakan Saldo Refund dari Transaksi Anda
        </p>
      </div>
      <div className="gap-3 grid text-sm overflow-y-auto px-2 md:px-0 pt-2 pb-12 md:pb-0">
        {balances.map((item, i) => (
          <Link
            href={`/transaksi/${item.transaction_code}`}
            className="cursor-pointer"
            key={i.toString()}
          >
            <Card className="py-3 px-4 flex flex-col hover:bg-slate-50">
              <div className="flex justify-between items-center">
                <p className="text-xs">{item.transaction_code}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(item.created_at), "dd MMM yyy, HH:mm")}
                </p>
              </div>
              <div className="flex justify-between items-end mt-1">
                {item.amount < 0 ? (
                  <p className="font-medium text-red-500">
                    -Rp {nPlainFormatter(Math.abs(item.amount))}
                  </p>
                ) : (
                  <div className="flex items-center gap-4">
                    <p className="font-medium">
                      +Rp {nPlainFormatter(item.amount)}
                    </p>
                    <p className="text-green-500 font-medium">Refund</p>
                  </div>
                )}
                <div className="space-y-2 flex justify-end items-end space-x-2 mt-1.5">
                  {item.payment_logo ? (
                    <Image
                      title={item.payment_name}
                      alt={item.payment_name}
                      src={item.payment_logo}
                      height={50}
                      width={50}
                    />
                  ) : (
                    <p className="text-sm font-medium text-right p-0">
                      🪙 {item.payment_name}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Page;
