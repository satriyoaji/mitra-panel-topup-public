import { TProduct, TProductItem } from "@/Type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useCallback, useContext, useEffect, useState } from "react";
import PromoCard from "./promo-card";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { IPromo, IPromoDetail } from "@/types/transaction";
import { isBefore, parseISO } from "date-fns";
import TransactionContext, {
  ITransactionContext,
} from "@/infrastructures/context/transaction/transaction.context";
import PromoDetail from "./promo-detail";

function Promo({ categoryUuid }: { categoryUuid: string }) {
  const [selectedPromo, setSelectedPromo] = useState<IPromo>();
  const [selectedDetailPromo, setSelectedDetailPromo] = useState<IPromo>();
  const [promos, setPromos] = useState<IPromo[]>([]);
  const [hiddenPromo, setHiddenPromo] = useState<IPromoDetail>();
  const [hiddenPromoCode, setHiddenPromoCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const { toast } = useToast();
  const { data, dispatch } = useContext(
    TransactionContext
  ) as ITransactionContext;

  const onPromoSelected = (e?: IPromo) => {
    dispatch({
      action: "SET_PROMO",
      payload: e,
    });
  };

  const getData = async (id?: string) => {
    if (!id || !categoryUuid) return;
    setLoading(true);

    let qParams = new URLSearchParams();
    qParams.append("product_key", id);
    qParams.append("category_key", categoryUuid);

    var res = await fetch(`/api/products/promo?` + qParams);

    if (res.ok) {
      var result = await res.json();

      if (result.data) {
        var list = result.data.filter((i: any) =>
          isBefore(new Date(), parseISO(i.time_finish))
        );
        setPromos(list);
        setLoading(false);
        return;
      }

      setPromos([]);
    }
    setLoading(false);
  };

  const getHiddenPromo = async () => {
    setLoading(true);
    var res = await fetch(`/api/products/promo/${hiddenPromoCode}?by-code=1`);
    if (res.ok) {
      var result = await res.json();

      if (
        result.data &&
        !isBefore(parseISO(result.data.time_finish), new Date())
      ) {
        {
          setHiddenPromo(result.data);
          setSelectedPromo(result.data.id);
          setLoading(false);
          return;
        }
      }
    }

    toast({
      title: "Failed",
      description: "Promo Tidak Ditemukan",
      variant: "destructive",
    });
    setHiddenPromo(undefined);
    setLoading(false);
  };

  useEffect(() => {
    getData(data.product?.key);
    setSelectedPromo(undefined);
    onPromoSelected();
  }, [data.product, categoryUuid]);

  const selectPromo = (promo?: IPromo) => {
    setSelectedPromo(promo);
    onPromoSelected(promo);
    setOpen(false);
  };

  return (
    <>
      {selectedPromo ? (
        <PromoCard
          selected={selectedPromo}
          promo={selectedPromo}
          setSelected={() => setOpen(true)}
          onClose={() => selectPromo(undefined)}
        />
      ) : (
        <div
          onClick={() => setOpen(true)}
          className="rounded-lg cursor-pointer hover:bg-slate-50 py-2 px-4 border flex justify-between items-center"
        >
          <p className="p-0 m-0">Pilih Promo</p>
          <ChevronRightIcon />
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promo</DialogTitle>
            <DialogDescription>Pilih promo paling cuan.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="mt-2 flex space-x-2 items-center">
              <Input
                placeholder="Punya Kode Promo? Masukan di sini"
                value={hiddenPromoCode}
                onChange={(e) => setHiddenPromoCode(e.target.value)}
              />
              <Button disabled={loading} size="sm" onClick={getHiddenPromo}>
                {loading ? "Loading..." : "Get Promo"}
              </Button>
            </div>
            <div className="space-y-3 max-h-[56vh] overflow-y-auto">
              {hiddenPromo ? (
                <PromoCard
                  promo={hiddenPromo}
                  selected={selectedPromo}
                  setSelected={(e) => selectPromo(e)}
                  isSecret
                  onDetailClicked={(p) => {
                    setSelectedDetailPromo(p);
                    setOpen(false);
                    setDetailOpen(true);
                  }}
                />
              ) : null}
              {promos.map((i) => (
                <PromoCard
                  key={i.promo_code}
                  promo={i}
                  selected={selectedPromo}
                  setSelected={(e) => selectPromo(e)}
                  onDetailClicked={(p) => {
                    setSelectedDetailPromo(p);
                    setOpen(false);
                    setDetailOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <PromoDetail
        p={selectedDetailPromo}
        onSelected={() => selectPromo(selectedDetailPromo)}
        onBack={() => {
          setDetailOpen(false);
          setOpen(true);
        }}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}

export default Promo;
