import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";

export async function GET(req: NextRequest) {
  var re = await fetch(`${process.env.API}/payment-method`, {
    headers: GetAuthHeader(req),
    next: {
      revalidate: 7200,
    },
  });
  var result = await re.json();
  return NextResponse.json(result, { status: re.status });
}
