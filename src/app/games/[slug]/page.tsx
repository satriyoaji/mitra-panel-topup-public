"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import useCategory, { IUseCategoryData } from "./useCategory";
import DetailCategory from "./DetailCategory";
import { useSession } from "next-auth/react";
import BackHeader from "@/components/header/back-header";

function Page({ params }: { params: { slug: string } }) {
  const data: IUseCategoryData = useCategory(params.slug);
  const { data: session } = useSession();

  if (data.loading) return <Loading />;

  if (data.data.category === null) return <NotFound />;
  else if (data.data.category !== null && data.data.category !== undefined) {
    return (
      <>
        <BackHeader title="Beli Produk" />
        <div className="flex justify-center w-full">
          <div className="w-full mb-12 sm:mb-0">
            <DetailCategory session={session} {...data} />
          </div>
        </div>
      </>
    );
  }
  return <NotFound />;
}

export default Page;
