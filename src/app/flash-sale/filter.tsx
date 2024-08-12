import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

export type TFilter = {
  filter: string;
};

type Prop = {
  onChange: (val: TFilter) => void;
};

function Filter(props: Prop) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<TFilter>({
    filter: "*",
  });

  return (
    <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`${filter.filter != "*" && "text-primary"}`}
          size="sm"
        >
          <MixerHorizontalIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[25rem]"></DialogContent>
    </Dialog>
  );
}

export default Filter;
