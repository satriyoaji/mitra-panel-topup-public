import RootTemplateLayout from "./root-layout";
import { Metadata } from "next";
import { GetCredHeader } from "./api/api-utils";
import { ISiteProfile } from "@/types/utils";

export async function generateMetadata(): Promise<Metadata> {
  var credentialHeader = GetCredHeader();

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
      title: setting.name,
      description: setting.description,
      keywords: setting.keywords,
      openGraph: {
        images: [setting.logo_url],
      },
      icons: {
        icon: setting.logo_url,
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
