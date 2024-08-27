import RootTemplateLayout from "./root-layout";
import { Metadata } from "next";
import { GetCredHeader } from "./api/api-utils";
import { ISiteProfile } from "@/types/utils";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  var credentialHeader = GetCredHeader();
  var url = headers().get("host") ?? "/";

  // fetch data
  const res = await fetch(`${process.env.NEXT_API_URL}/v2/panel/site-profile`, {
    headers: {
      "Content-Type": "application/json",
      "X-Sign": credentialHeader.sign,
      "X-User-Id": credentialHeader.mitraid,
      "X-Timestamp": credentialHeader.timestamp.toString(),
    },
  });

  if (res.ok) {
    var data = await res.json();
    var setting: ISiteProfile = data.data;

    return {
      manifest: "/api/manifest.json",
      title: {
        template: `%s | ${setting.name}`,
        default: setting.name,
      },
      description: setting.description,
      keywords: setting.keywords,
      openGraph: {
        images: [setting.logo_url],
        title: `${setting.name} - ${setting.title}`,
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
