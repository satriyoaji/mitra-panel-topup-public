import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const url = new URL(req.url as string);
  let qParams = url.searchParams;

  let urlFetch = `${process.env.NEXT_API_URL}/v2/panel/promotion/detail/${slug}`;
  if (qParams.get("by-code")) {
    urlFetch = `${
      process.env.NEXT_API_URL
    }/v2/panel/promotion/get-by-code?promo_code=${slug}&category_key=${qParams.get(
      "category_key"
    )}`;
  }

  var re = await fetch(urlFetch, {
    headers: GetAuthHeader(req),
    next: {
      revalidate: 60,
    },
  });
  var result = await re.json();
  return NextResponse.json(result, { status: re.status });
}
