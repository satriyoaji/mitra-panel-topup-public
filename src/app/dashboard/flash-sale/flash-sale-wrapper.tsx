import { GetCredHeader } from "@/app/api/api-utils";
import React from "react";
import FlashSale from "./flash-sale";

const getData = async () => {
  const credentialHeader = GetCredHeader();

  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/flash-sale/products`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Sign": credentialHeader.sign,
        "X-User-Id": credentialHeader.mitraid,
        "X-Timestamp": credentialHeader.timestamp.toString(),
      },
      next: {
        revalidate: 30,
      },
    }
  );

  if (re.ok) {
    var result = await re.json();
    return result.data;
  }

  return undefined;
};

async function FlashSaleWrapper() {
  const data = await getData();
  return <FlashSale data={data} />;
}

export default FlashSaleWrapper;
