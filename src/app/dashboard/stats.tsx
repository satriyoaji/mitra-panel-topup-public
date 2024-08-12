import { nFormatter } from "@/Helpers";
import { GetCookie } from "@/infrastructures/cookieStore";
import React from "react";

function Stats() {
  let version = GetCookie("version");

  if (version === "1")
    return (
      <div className="md:w-full bg-primary space-y-2 pt-6 flex items-center justify-center">
        <div className="md:flex gap-8 pb-4 px-8 items-center">
          <div className="md:mb-4 w-full">
            <p className="text-white text-sm font-semibold mt-4">
              Dipercaya oleh gamers Indonesia
            </p>
            <p className="text-white text-2xl mt-2 font-bold w-fit">
              Termurah dan Terpercaya
            </p>
            <p className="text-slate-100 text-xs mt-1">
              Menyediakan layanan Top up berbagai puluhan game dengan ribuan
              produk dan Pulsa termurah dan terpercaya di Indonesia.
            </p>
          </div>
          <div className="w-full h-full">
            <div className="flex h-full items-center justify-between mt-8 px-6 mb-4 rounded-xl">
              {/* <div className="flex flex-col items-center"> */}
              <div>
                <p className="font-semibold md:text-3xl text-2xl text-white">
                  {nFormatter(1000)}
                </p>
                <p className="font-semibold md:text-base text-xs text-slate-100">
                  Pengguna
                </p>
              </div>
              {/* <div className="flex flex-col items-center"> */}
              <div>
                <p className="font-semibold md:text-3xl text-2xl text-white">
                  {nFormatter(9230)}
                </p>
                <p className="font-semibold md:text-base text-xs text-slate-100">
                  Produk
                </p>
              </div>
              {/* <div className="flex flex-col items-center"> */}
              <div>
                <p className="font-semibold md:text-3xl text-2xl text-white">
                  {nFormatter(238000)}
                </p>
                <p className="font-semibold md:text-base text-xs text-slate-100">
                  Transaksi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Stats;
