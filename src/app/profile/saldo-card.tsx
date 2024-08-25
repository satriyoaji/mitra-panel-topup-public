import { thousandMask } from "@/Helpers";
import React from "react";

function SaldoCard(props: { balance: number }) {
  return (
    <div className="flex px-4 py-3 w-full rounded-xl justify-between gap-4 items-center bg-slate-50 border">
      <p className="text-sm text-black">Saldo Points</p>
      <p className="font-medium text-black">
        {thousandMask(props.balance)} Points
      </p>
    </div>
  );
}

export default SaldoCard;
