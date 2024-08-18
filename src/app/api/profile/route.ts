import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function GET(req: NextRequest) {
  var re = await fetch(`${process.env.NEXT_API_URL}/v2/panel/member/profile`, {
    headers: GetAuthHeader(req),
    next: {
      revalidate: 3600,
    },
  });

  var result = await re.json();

  return NextResponse.json(result, { status: 200 });
}

export async function POST(req: NextRequest) {
  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/member/update-profile`,
    {
      method: "POST",
      headers: GetAuthHeader(req),
      body: JSON.stringify(await req.json()),
    }
  );
  var result = await re.json();
  return NextResponse.json(result, { status: re.status });
}
