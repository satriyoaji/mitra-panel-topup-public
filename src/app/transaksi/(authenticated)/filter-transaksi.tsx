import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import StatusSelect from "./status-select";
import { Button } from "@/components/ui/button";

export type TFilter = {
  search: string | undefined;
  status: number | undefined;
};

type Prop = {
  onChange: (val: TFilter) => void;
  state: TFilter;
};

function FilterTransaksi(prop: Prop) {
  const [filter, setFilter] = useState<TFilter>(prop.state);

  const onApply = () => {
    prop.onChange(filter);
  };

  const onClear = () => {
    setFilter({
      search: undefined,
      status: undefined,
    });
    prop.onChange({
      search: undefined,
      status: undefined,
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Filter Transaksi</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col p-2">
        <div className="space-y-2">
          <StatusSelect
            value={filter.status?.toString()}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                status: Number(e),
              }))
            }
          />
          {/* <DatePickerWithRange
                        date={filter.date}
                        onChange={(e) =>
                            setFilter((prev) => ({
                                ...prev,
                                date: e,
                            }))
                        }
                    /> */}
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            className="mt-3 w-full"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button size="sm" className="mt-3 w-full" onClick={onApply}>
            Apply
          </Button>
        </div>
      </div>
    </>
  );
}

export default FilterTransaksi;
