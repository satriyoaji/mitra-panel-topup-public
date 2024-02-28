import { nFormatter } from "@/Helpers";
import { Card } from "@/components/ui/card";
import React from "react";

function Stats() {
    return (
        <Card className="py-4 px-8 bg-black space-y-2">
            <p className="text-white text-sm font-semibold mt-4">
                Dipercaya oleh gamers Indonesia
            </p>
            <p className="text-red-500 text-2xl font-bold">
                Termurah dan Terpercaya
            </p>
            <p className="text-slate-400 text-xs">
                Menyediakan layanan Top up berbagai puluhan game dengan ribuan
                produk dan Pulsa termurah dan terpercaya di Indonesia.
            </p>
            <div>
                <div className="grid grid-cols-3 mt-8 bg-slate-700 px-6 py-4 mb-4 rounded">
                    {/* <div className="flex flex-col items-center"> */}
                    <div>
                        <p className="font-semibold text-2xl text-white">
                            {nFormatter(1000)}
                        </p>
                        <p className="font-semibold text-sm text-slate-400">
                            Pengguna
                        </p>
                    </div>
                    {/* <div className="flex flex-col items-center"> */}
                    <div>
                        <p className="font-semibold text-2xl text-white">
                            {nFormatter(9230)}
                        </p>
                        <p className="font-semibold text-sm text-slate-400">
                            Produk
                        </p>
                    </div>
                    {/* <div className="flex flex-col items-center"> */}
                    <div>
                        <p className="font-semibold text-2xl text-white">
                            {nFormatter(238000)}
                        </p>
                        <p className="font-semibold text-sm text-slate-400">
                            Transaksi
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default Stats;