import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../../api-utils";

export async function GET(req: NextRequest) {
  const url = new URL(req.url as string);

  let qParams = url.searchParams;

  var re = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/promotion/list?` + qParams,
    {
      headers: GetAuthHeader(req),
      next: {
        revalidate: 60,
      },
    }
  );

  var result = await re.json();

  return NextResponse.json(result, { status: 200 });
}
