import CardProduct from "../../../flash-sale/flash-sale-card";
import { IFlashSaleInfo } from "@/types/flash-sale";
import Link from "next/link";
import CountdownCard from "../../countdown-card";
import { parseISO } from "date-fns";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

function FlashSaleV2({ data }: { data: IFlashSaleInfo }) {
    if (data)
        return (
            <div className="relative flex justify-center md:p-4 bg-gradient-to-r from-theme-secondary-900/95 to-theme-secondary-200/70">
                <div className="max-w-6xl p-2 w-full">
                    <div className="bg-white/50 backdrop-blur rounded-xl pb-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center py-1 pr-1 rounded-tl-lg rounded-br-lg mt-2">
                                <p className="px-2 ml-2 text-sm font-semibold flex">
                                    <span className="mr-3">
                                        <Image
                                            src={
                                                "/assets/illustration/lightning.gif"
                                            }
                                            alt="flash"
                                            width={20}
                                            height={20}
                                        />
                                    </span>
                                    {data.name}
                                </p>{" "}
                                <CountdownCard
                                    date={parseISO(data.expired_at)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center relative py-3">
                            <div className="max-w-[8rem] ml-4">
                                <img
                                    src={data.image_url}
                                    className="w-full h-full rounded-lg"
                                />
                            </div>
                            <Carousel className="py-3 rounded-x w-full">
                                <CarouselContent className="pl-40 mr-12">
                                    {data?.products
                                        ?.slice(0, 8)
                                        .map((item, idx) => (
                                            <CarouselItem
                                                className="h-full w-full min-w-[9.5rem] max-w-[11.5rem]"
                                                key={`${idx}`}
                                            >
                                                <CardProduct data={item} />
                                            </CarouselItem>
                                        ))}
                                    {data.products.length > 8 && (
                                        <Link
                                            href="/flash-sale"
                                            className="cursor-pointer"
                                        >
                                            <CarouselItem className="h-full w-full min-w-[9.5rem] max-w-[11.5rem]">
                                                <div
                                                    className={`min-h-[6rem] bg-cover h-full hover:bg-slate-50 rounded-lg border-0 flex`}
                                                    style={{
                                                        backgroundImage:
                                                            'url("/assets/thunder.svg")',
                                                    }}
                                                >
                                                    <div className="bg-theme-secondary-300/95 flex items-center justify-center rounded-lg w-full">
                                                        <p className="text-sm text-white font-medium">
                                                            See More
                                                        </p>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        </Link>
                                    )}
                                </CarouselContent>
                                <CarouselNext className="mr-14 bg-background" />
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default FlashSaleV2;
