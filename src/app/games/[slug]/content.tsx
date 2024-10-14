"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import useCategory, { IUseCategoryData } from "./useCategory";
import DetailCategory from "./DetailCategory";
import { useSession } from "next-auth/react";
import BackHeader from "@/components/header/back-header";
import Ldjson from "./ldjson";

function Content({
  id,
  appName,
  url,
}: {
  id: string;
  appName: string;
  url: string;
}) {
  const data: IUseCategoryData = useCategory(id);
  const { data: session } = useSession();

  if (data.loading) return <Loading />;

  if (data.data.category === null) return <NotFound />;
  else if (data.data.category !== null && data.data.category !== undefined) {
    return (
      <>
        <Ldjson appName={appName} url={url} />
        <BackHeader title="Beli Produk" />
        <div className="flex justify-center w-full">
          <div className="w-full mb-8 sm:mb-0">
            <DetailCategory appName={appName} session={session} {...data} />
          </div>
        </div>
      </>
    );
  }
  return <NotFound />;
}

export default Content;
