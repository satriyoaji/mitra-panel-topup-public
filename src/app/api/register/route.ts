import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function POST(req: NextRequest) {
  const response = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/member/register`,
    {
      method: "POST",
      headers: GetAuthHeader(req),
      body: JSON.stringify(await req.json()),
    }
  );

  var result = await response.json();

  return NextResponse.json(result, { status: response.status });
}
