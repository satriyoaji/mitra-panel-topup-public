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

const PhoneInputIndo = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, type, value, ...props }, ref) => {
    return (
      <div
        className={cn(
          "overflow-clip flex items-center h-9 w-full rounded border border-input bg-transparent  text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <div className="bg-slate-100 h-full flex justify-center items-center px-3 text-muted-foreground font-semibold">
          <p>+62</p>
        </div>
        <PatternFormat
          className="w-full file:border-0 focus-visible:outline-none px-3 h-full disabled:cursor-not-allowed disabled:opacity-50"
          format="### ### ### ###"
          type="tel"
          value={(value as string).replace(/\D/g, "").slice(-12)}
          disabled={props.disabled}
          onValueChange={(v, s) => {
            if (props.onValueChange) props.onValueChange(v.floatValue);
          }}
          placeholder={props.placeholder}
        />
      </div>
    );
  }
);
PhoneInputIndo.displayName = "PhoneInputIndo";

export { PhoneInput, PhoneInputIndo };
