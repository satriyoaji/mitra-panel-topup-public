"use client";

import { Button } from "@/components/ui/button";
import { priceMask } from "@/Helpers";
import { useCountdown } from "@/Hooks";
import { IPromo } from "@/types/transaction";
import { Cross1Icon } from "@radix-ui/react-icons";
import React from "react";

function PromoCard({
  promo,
  selected,
  setSelected,
  isSecret,
  onDetailClicked,
  onClose,
}: {
  promo: IPromo;
  selected?: IPromo;
  setSelected: (promo?: IPromo) => void;
  isSecret?: boolean;
  onDetailClicked?: (promo?: IPromo) => void;
  onClose?: () => void;
}) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(
    promo.time_finish
  );

  if (!isExpired)
    return (
      <>
        <div
          className={`rounded-xl relative shadow-sm cursor-pointer text-primary-900 overflow-clip hover:bg-zinc-50 ${
            promo.id == selected?.id ? "border-2 border-primary" : "border-2"
          }`}
        >
          {onClose && (
            <div className="absolute right-0 top-0 p-1.5 bg-primary-200 rounded-bl-xl text-primary-700">
              <Cross1Icon className="w-3 h-3" onClick={onClose} />
            </div>
          )}
          <div
            className="flex"
            onClick={() => {
              if (promo.id != selected?.id) setSelected(promo);
              else setSelected();
            }}
          >
            <div className="flex flex-col items-center justify-center p-4 w-[12rem] bg-primary">
              <p className="font-bold text-3xl text-white">
                {promo.discount_percent > 0
                  ? `${promo.discount_percent}%`
                  : priceMask(promo.discount_amount)}
              </p>
              {promo.stock && promo.stock > 0 ? (
                <p className="text-center text-white">Tersisa {promo.stock}</p>
              ) : null}
            </div>
            <div className="items-center justify-center w-full bg-background">
              <div className="pr-4 pl-6 pb-6 space-y-2">
                <div className="flex pt-3 justify-between items-center">
                  <p className="text-xs bg-primary-200 text-primary-900 font-bold bg-slate-100 px-1.5 py-0.5 w-fit">
                    {promo.promo_code}
                  </p>
                </div>
                <div className="flex-row justify-between items-center rounded-xl bg-background">
                  <p className="text-sm font-medium">{promo.name}</p>
                  <p className="text-xs mt-0.5">{promo.short_description}</p>
                </div>
              </div>
              {isSecret ? (
                <div className="bg-primary-400 text-white mt-4 rounded-br">
                  <p className="text-center text-xs font-semibold">
                    Secret Promo
                  </p>
                </div>
              ) : null}
              <div className="flex justify-between items-end">
                <div>
                  <div
                    className={`px-3 py-1.5 bg-red-500 text-white rounded-tr-xl`}
                  >
                    <p className="text-xs">
                      Berakhir dalam
                      <span className="font-semibold ml-1">
                        {days != null && days != 0
                          ? `${days} hari`
                          : hours != null && hours != 0
                          ? `${hours} jam`
                          : `${minutes} menit`}
                      </span>
                    </p>
                  </div>
                </div>
                {onDetailClicked && (
                  <Button
                    size="sm"
                    variant="link"
                    className="text-primary-900 text-xs mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDetailClicked(promo);
                    }}
                  >
                    Detail
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default PromoCard;
