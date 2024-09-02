import { NextRequest, NextResponse } from "next/server";
import { GetAuthHeader } from "../api-utils";
import { ISiteProfile } from "@/types/utils";

export async function GET(req: NextRequest) {
  var re = await fetch(`${process.env.NEXT_API_URL}/v2/panel/site-profile`, {
    headers: GetAuthHeader(req),
    next: {
      revalidate: 3600,
    },
  });

  var result = await re.json();
  var data: ISiteProfile = result.data;

  data.manifest.start_url = "/";

  return NextResponse.json(data.manifest, {
    status: 200,
    headers: {
      "Content-Type": "application/manifest+json",
    },
  });
}
