import React from "react";

function SaldoCard(props: { balance: number }) {
  return (
    <div className="flex px-4 py-3 w-full rounded-xl justify-between gap-4 items-center bg-primary border">
      <p className="text-sm text-white">Saldo Points</p>
      <p className="font-medium text-white">{props.balance} Points</p>
    </div>
  );
}

export default SaldoCard;
