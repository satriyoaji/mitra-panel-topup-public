"use client";

import { cn } from "@/lib/utils";
import { NumericFormat, PatternFormat } from "react-number-format";
import React from "react";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: string | number | null | undefined;
  onValueChange?: (e: number | undefined) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, type, value, disabled, ...props }, ref) => {
    return (
      <PatternFormat
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        format="### ### ### ###"
        type="tel"
        value={value}
        disabled={disabled}
        onValueChange={(v, s) => {
          if (props.onValueChange) props.onValueChange(v.floatValue);
        }}
        placeholder={props.placeholder}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
