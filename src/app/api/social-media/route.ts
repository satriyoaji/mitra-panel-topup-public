import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function GET(req: NextRequest) {
  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/site-social-media`,
    {
      headers: GetAuthHeader(req),
    }
  );

  var result = await re.json();

  return NextResponse.json(result, { status: 200 });
}
