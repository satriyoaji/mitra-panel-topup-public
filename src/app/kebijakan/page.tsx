import React from "react";
import { GetCredHeader } from "../api/api-utils";
import { ISiteProfile } from "@/types/utils";
import BackHeader from "@/components/header/back-header";

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

async function Page() {
  var data: ISiteProfile | undefined = await getData();
  return (
    <>
      <BackHeader title="Kebijakan Privasi" />
      <div className="flex justify-center w-full px-4">
        <div className="max-w-6xl w-full my-4 flex flex-col justify-center items-center">
          <div className="w-full space-y-4">
            <div className="bg-background rounded-lg w-full hidden md:block">
              <h3 className="font-semibold text-primary">Kebijakan Privasi</h3>
            </div>
            {data ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.privacy_policy,
                }}
              ></div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
