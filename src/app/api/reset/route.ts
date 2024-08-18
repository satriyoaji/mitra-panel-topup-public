import { GetAuthHeader } from "@/app/api/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  var body = await req.json();

  var response = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/member/login`,
    {
      method: "post",
      headers: GetAuthHeader(req),
      body: JSON.stringify({
        email: body.username,
        password: body.password,
      }),
    }
  );
  var result = await response.json();
  if (!response.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  response = await fetch(
    `${process.env.NEXT_API_URL}/v2/panel/member/change-password`,
    {
      method: "post",
      headers: GetAuthHeader(req),
      body: JSON.stringify({
        password: body.newPassword,
      }),
    }
  );

  result = await response.json();
  if (!response.ok) return NextResponse.json(result, { status: 400 });

  return NextResponse.json(result, { status: 200 });
}
