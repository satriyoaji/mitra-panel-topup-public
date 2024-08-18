import React from "react";
import TransactionHistoryDetail from "./transaction-detail";
import { GetCredHeader } from "@/app/api/api-utils";
import { ISiteProfile } from "@/types/utils";

const getData = async () => {
  const credentialHeader = GetCredHeader();

  const res = await fetch(`${process.env.NEXT_API_URL}/v2/panel/site-profile`, {
    headers: {
      "Content-Type": "application/json",
      "X-Sign": credentialHeader.sign,
      "X-User-Id": credentialHeader.mitraid,
      "X-Timestamp": credentialHeader.timestamp.toString(),
    },
    next: {
      revalidate: 30,
    },
  });

  if (res.ok) {
    var data = await res.json();
    return data.data;
  }

  return undefined;
};

async function DetailPage({ params }: { params: { id: string } }) {
  var profile: ISiteProfile | undefined = await getData();
  return <TransactionHistoryDetail id={params.id} profile={profile} />;
}

export default DetailPage;
