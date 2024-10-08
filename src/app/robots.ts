import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  var url = headers().get("host") ?? "/";

  return {
    rules: {
      userAgent: "*",
      disallow: ["/transaksi/", "/profile/", "/saldo/"],
    },
    sitemap: url + "/sitemap.xml",
  };
}
