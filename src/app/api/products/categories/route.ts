import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../../api-utils";

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string);

  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/category?` + url.searchParams,
    {
      next: {
        revalidate: 30,
      },
      headers: GetAuthHeader(req),
    }
  );
  var result = await re.json();

  return NextResponse.json(result, { status: re.status });
}
