"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ETransactionStatus } from "@/types/enums";
import React, { useCallback, useState } from "react";
import BadgeTransaksi from "../badge-transaksi";

function StatusSelect({
  onChange,
  value,
}: {
  onChange: (val: string | undefined) => void;
  value?: string;
}) {
  const [val, setVal] = useState<string | undefined>(value ?? "");

  const onSelect = useCallback((v: string | undefined) => {
    setVal(v);
    onChange(v);
  }, []);

  return (
    <Select onValueChange={onSelect} defaultValue={val}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Status Transaksi" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status Transaksi</SelectLabel>
          <SelectItem value="*">All</SelectItem>
          {Object.keys(ETransactionStatus)
            .filter((v) => isNaN(Number(v)))
            .map((k, i) => (
              <SelectItem key={`${i}`} value={(++i).toString()}>
                <BadgeTransaksi status={i} />
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default StatusSelect;
