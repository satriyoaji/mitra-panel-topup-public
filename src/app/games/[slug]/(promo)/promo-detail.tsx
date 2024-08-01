import CountdownCard from "@/app/dashboard/countdown-card";
import Loading from "@/app/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import TransactionContext, { ITransactionContext } from "@/infrastructures/context/transaction/transaction.context";
import { IPromo, IPromoDetail } from "@/types/transaction";
import { parseISO } from "date-fns";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

function PromoDetail({
    p,
    onBack,
    onSelected,
    open,
    onOpenChange,
}: {
    p?: IPromo;
    onBack: () => void;
    onSelected: () => void;
    open: boolean;
    onOpenChange: (val: boolean) => void;
}) {
    const [promo, setPromo] = useState<IPromoDetail | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const getData = async (idIn: string) => {
        setLoading(true);
        var res = await fetch(`/api/products/promo/${idIn}`);
        setLoading(false);
        if (res.ok) {
            var data = await res.json();
            setPromo(data.data);
            return;
        }

        setPromo(undefined);
    };

    useEffect(() => {
        if (p) {
            getData(p.id);
        }
    }, [p]);

    if (p)
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    {loading ? (
                        <p className="text-center w-full">Loading...</p>
                    ) : (
                        promo && (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="flex justify-between">
                                        {promo.name}
                                        <div className="mr-3">
                                            <CountdownCard
                                                date={parseISO(
                                                    promo.time_finish
                                                )}
                                            />
                                        </div>
                                    </DialogTitle>
                                    <DialogDescription>
                                        {promo.promo_code}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-3">
                                    <Image
                                        src={promo.image_url}
                                        width={100}
                                        height={100}
                                        alt={promo.name}
                                    />
                                    <div
                                        className="text-xs text-muted-foreground"
                                        dangerouslySetInnerHTML={{
                                            __html: promo?.description,
                                        }}
                                    ></div>
                                    <div className="flex gap-1 flex-wrap w-full">
                                        {promo?.products.map((i) => (
                                            <div key={i}>
                                                <Badge>{i}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <Button
                                            className="w-full mt-2"
                                            size="sm"
                                            onClick={() => {
                                                onSelected();
                                                onOpenChange(false);
                                            }}
                                        >
                                            Pakai Promo
                                        </Button>
                                        <Button
                                            className="w-full mt-2"
                                            variant="link"
                                            size="sm"
                                            onClick={() => {
                                                onOpenChange(false);
                                                onBack();
                                            }}
                                        >
                                            Kembali ke list
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )
                    )}
                </DialogContent>
            </Dialog>
        );
    return null;
}

export default PromoDetail;
