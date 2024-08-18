import { IProductCategory } from "@/Type";
import { Card, CardContent } from "@/components/ui/card";
import { CubeIcon } from "@radix-ui/react-icons";
import React from "react";
import Description from "./collapsible-description";

function Header({ category }: { category: IProductCategory }) {
  return (
    <Card className="w-full mt-2 h-full min-w-fit mb-3">
      <CardContent className="p-0 mb-3">
        {category.banner_url && (
          <div
            className="w-full rounded-lg px-4 pt-4 max-h-24"
            style={{ aspectRatio: 27 / 9 }}
          >
            <img
              alt={category.name}
              src={category?.image_url ?? "/assets/hero-games.svg"}
              style={{ aspectRatio: 27 / 9 }}
              className={`object-cover w-full rounded-xl`}
            />
            {/* <Image
            fill
            alt={category.name}
            src={"/assets/hero-games.svg"}
            style={{ aspectRatio: 64 / 9 }}
            className={`relative object-cover w-full rounded-t-xl`}
            /> */}
          </div>
        )}
        <div className="px-3 pt-3">
          <div className="flex z-10 gap-4">
            {category?.image_url ? (
              <div className="rounded flex items-center justify-center w-16 h-16 bg-white">
                <img
                  alt={category.name}
                  className="h-auto w-14 rounded"
                  src={category?.image_url}
                />
              </div>
            ) : (
              <div className="border rounded flex items-center justify-center w-16 h-16 bg-zinc-200">
                <CubeIcon className="w-10 h-10 text-white" />
              </div>
            )}
            <Description description={category?.description} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Header;
