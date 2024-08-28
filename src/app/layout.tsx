import RootTemplateLayout from "./root-layout";
import { Metadata } from "next";
import { GetCredHeader } from "./api/api-utils";
import { ISiteProfile } from "@/types/utils";
import { headers } from "next/headers";
import { IProductCategory } from "@/Type";

export async function generateMetadata(): Promise<Metadata> {
  var credentialHeader = GetCredHeader();
  var baseUrl = headers().get("host") ?? "/";
  var header = {
    "Content-Type": "application/json",
    "X-Sign": credentialHeader.sign,
    "X-User-Id": credentialHeader.mitraid,
    "X-Timestamp": credentialHeader.timestamp.toString(),
  };

  // fetch data
  const res = await fetch(`${process.env.NEXT_API_URL}/v2/panel/site-profile`, {
    headers: header,
    next: {
      revalidate: 120,
    },
  });

  if (res.ok) {
    var data = await res.json();
    var setting: ISiteProfile = data.data;
    var description = setting.description;

    var games: IProductCategory | undefined = undefined;
    var url = headers().get("x-url") ?? "";
    if (url.includes("/games/")) {
      var split = url.split("/");
      var slug = split[split.length - 1];
      var re = await fetch(
        `${process.env.NEXT_API_URL}/v2/panel/category/${slug}`,
        {
          next: {
            revalidate: 30,
          },
          headers: header,
        }
      );
      if (re.ok) {
        var result = await re.json();
        games = result.data;
        if (games) description = games?.description;
      }
    }

    var path = url.split(baseUrl).pop()?.split("/") ?? "";
    var pathTitle = "";
    if (path.length > 0) {
      var pathName = path[1];
      if (pathName)
        pathTitle = pathName.charAt(0).toUpperCase() + pathName.slice(1);
    }

    description = description
      .replace(/<[^>]*>/g, " ")
      .replace(/&#?[a-z0-9]+;/g, "");

    return {
      manifest: "/api/manifest.json",
      title: {
        template: `%s | ${setting.name}`,
        default: games?.name
          ? `${setting.name} | ${games.name}`
          : `${setting.name} ${pathTitle ? ` | ${pathTitle}` : ""}`,
      },
      description,
      keywords: setting.keywords,
      openGraph: {
        images: [games?.image_url || setting.logo_url],
        title: `${setting.name} - ${games?.name || setting.title}`,
        url,
        type: "website",
      },
      icons: {
        icon: setting.logo_url,
      },
      alternates: {
        canonical: url,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {};
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-repeat antialiased">
        <RootTemplateLayout>{children}</RootTemplateLayout>
      </body>
    </html>
  );
}
