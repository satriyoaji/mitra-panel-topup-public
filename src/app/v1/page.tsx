import FlashSale from "@/app/v1/dashboard/flash-sale";
import ListGame from "@/app/v1/dashboard/list-game";
import CarouselWrapper from "./dashboard/carousel-wrapper";
import Stats from "./dashboard/stats";
import Promo from "./dashboard/promo";

export default async function Home() {
  return (
    <>
      <div className="pt-2">
        <CarouselWrapper />
        <FlashSale />
        <ListGame />
        <div className="mt-8 flex justify-center items-center">
          <Stats />
        </div>
      </div>
      <Promo />
    </>
  );
}
