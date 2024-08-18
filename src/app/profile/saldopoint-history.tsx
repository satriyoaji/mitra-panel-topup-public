import { nFormatter, nPlainFormatter } from "@/Helpers";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IHistory {
  transaction_code: string;
  description: string;
  amount: number;
  created_at: string;
}

function SaldoPointHistory() {
  const [balances, setBalances] = useState<IHistory[]>([]);

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
      <div className="gap-2 grid text-sm max-h-[72vh] overflow-y-scroll">
        {balances.map((item, i) => (
          <Link
            href={`/transaksi/${item.transaction_code}`}
            className="cursor-pointer"
            key={i.toString()}
          >
            <Card className="py-3 px-4 flex flex-col">
              <p className="text-xs">{item.transaction_code}</p>
              <Separator className="my-1" />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground mt-1.5">
                  {format(new Date(item.created_at), "dd MMM yyy, HH:mm:ss")}
                </p>
                {item.amount < 0 ? (
                  <p className="font-medium text-red-500">
                    - Rp {nPlainFormatter(Math.abs(item.amount))}
                  </p>
                ) : (
                  <p className="font-medium text-green-600">
                    + Rp {nPlainFormatter(item.amount)}
                  </p>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

export default SaldoPointHistory;
