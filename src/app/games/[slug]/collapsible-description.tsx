"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function Description({ description }: { description: string }) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <p
        className={`text-xs pt-[64px] text-muted-foreground leading-5 ${
          !show ? "overflow-ellipsis line-clamp-3" : null
        } `}
        dangerouslySetInnerHTML={{ __html: description }}
      >
      </p>
      <div className="flex items-center justify-center mt-3">
        {description && (
          <Button size="sm" variant="link" onClick={() => setShow((el) => !el)}>
            {show ? "Hide" : "Show More"}
          </Button>
        )}
      </div>
    </>
  );
}

export default Description;
