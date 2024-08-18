import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string);
  let qParams = url.searchParams;
  qParams.append("limit", "10");

  var re: Response;
  if (qParams.get("isAdvance"))
    re = await fetch(
      `${process.env.NEXT_API_URL}/v2/panel/transaction/advance-search?` +
        qParams,
      {
        headers: GetAuthHeader(req),
        cache: "no-store",
        // next: {
        //   revalidate: 30,
        // },
      }
    );
  else
    re = await fetch(
      `${process.env.NEXT_API_URL}/v2/panel/transaction/list?` + qParams,
      {
        headers: GetAuthHeader(req),
        cache: "no-store",
        // next: {
        //   revalidate: 30,
        // },
      }
    );
  var result = await re.json();
  return NextResponse.json(result, { status: re.status });
}

export async function POST(req: NextRequest) {
  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/transaction/create`,
    {
      method: "POST",
      headers: GetAuthHeader(req),
      body: JSON.stringify(await req.json()),
    }
  );
  var result = await re.json();
  return NextResponse.json(result, { status: re.status });
}
