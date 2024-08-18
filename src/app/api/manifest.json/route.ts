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

  var manifest = {
    name: data.name,
    short_name: data.title,
    theme_color: data.theme_color ?? "#fff",
    background_color: "#fff",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/",
    icons: [
      {
        src: data.logo_url,
        sizes: "16x16",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: data.logo_url,
        sizes: "32x32",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: data.logo_url,
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: data.logo_url,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: data.logo_url,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    splash_pages: null,
  };

  return NextResponse.json(
    { ...manifest },
    {
      status: 200,
      headers: {
        "Content-Type": "application/manifest+json",
      },
    }
  );
}
