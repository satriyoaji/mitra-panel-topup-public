import AuthPage from "./(authenticated)/auth-page";
import PublicPage from "./(public)/public-page";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Head from "next/head";
import { Metadata } from "next";
import { GetCredHeader } from "../api/api-utils";
import { ISiteProfile } from "@/types/utils";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  var credentialHeader = GetCredHeader();
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

    var host = headers().get("host") ?? "";
    var url = "https://" + host + "/transaksi";
    var title = `Daftar Pesanan | ${setting.name}`;
    description = `Temukan semua daftar pesanan kamu di ${setting.name}.`;

    return {
      manifest: "/api/manifest.json",
      title,
      description,
      keywords: setting.keywords,
      openGraph: {
        images: [setting.logo_url],
        title,
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

async function Page() {
  const session = await getServerSession(options);
  var url = headers().get("host") ?? "";

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: { "@id": url, name: "Home" },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@id": url + "/transaksi",
                    name: "List Transaksi",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <h1 className="hidden">Cek Pesananku</h1>
      {session ? <AuthPage /> : <PublicPage />}
    </>
  );
}

export default Page;
