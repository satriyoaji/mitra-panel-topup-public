"use client";
import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

function CopyToClipboard({ text }: { text: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Success copy to clipboard",
      variant: "success",
    });

    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  }, [copied]);

  if (copied) return <CheckCircledIcon className="ml-2" />;
  return <CopyIcon onClick={onClick} className="ml-2 cursor-pointer" />;
}

export default CopyToClipboard;
