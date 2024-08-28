import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { GetCredHeader } from "./app/api/api-utils";

export const config = {
  matcher: ["/((?!_next/static|assets|_next/image|favicon.ico).*)"],
};

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });

  if (req.nextUrl.pathname.startsWith("/api")) {
    var credentials = GetCredHeader();

    var res = NextResponse.next();
    res.headers.set("X-Sign", credentials.sign);
    res.headers.set("X-User-Id", credentials.mitraid);
    res.headers.set("X-Timestamp", credentials.timestamp.toString());
    res.headers.set("Authorization", `Bearer ${token?.token}`);

    return res;
  }

  if (req.nextUrl.pathname.includes("/auth") && token)
    return NextResponse.redirect(new URL("/", req.url));

  var res = NextResponse.next();
  res.headers.set("x-url", req.url);

  if (
    req.nextUrl.pathname.includes("/profile") ||
    req.nextUrl.pathname.includes("/redeem-coupon")
  ) {
    const authMiddleware = withAuth({
      pages: {
        signIn: `/auth/login`,
        newUser: "/auth/register",
      },
    });

    // @ts-expect-error
    return authMiddleware(req, event);
  }

  return res;
}
