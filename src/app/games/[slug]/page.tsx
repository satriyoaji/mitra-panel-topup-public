"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import useCategory, { IUseCategoryData } from "./useCategory";
import V1DetailCategory from "./(v1)/V1DetailCategory";

function Page({ params }: { params: { slug: string } }) {
  const data: IUseCategoryData = useCategory(params.slug);

  if (data.loading) return <Loading />;

  if (data.data.category === null) return <NotFound />;
  else if (data.data.category !== null && data.data.category !== undefined) {
    return <V1DetailCategory {...data} />;
  }
  return <NotFound />;
}

export default Page;
