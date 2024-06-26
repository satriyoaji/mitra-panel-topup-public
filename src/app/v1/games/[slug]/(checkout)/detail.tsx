"use client";

import { getTotalPrice, priceMask } from "@/Helpers";
import TransactionDetail from "@/components/transaction-detail";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  ICategoryForm,
  ITransaction,
  ITransactionCreate,
} from "@/types/transaction";
import { useState } from "react";
import Swal from "@/components/swal";

interface IDetailProp extends ITransaction {
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}

export function Purchase({
  product,
  category,
  promo,
  isOpen,
  onOpenChange,
  form,
  payment,
  account,
}: IDetailProp) {
  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const createTransaction = async () => {
    if (!account || !payment || !product || !category) return false;

    var payload: ITransactionCreate = {
      category_key: category?.key,
      product_key: product?.key,
      payment_method: payment.payment_method,
      payment_channel: payment.payment_channel,
      email: account?.email,
      phone: account?.noWhatsapp,
    };

    if (form) {
      var forms: ICategoryForm[] = [];
      for (const [key, value] of Object.entries(form)) {
        forms.push({
          key,
          value: value as string,
        });
      }

      payload.form_data = forms;
    }

    var res = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    onOpenChange(false);
    if (res.ok) {
      toast({
        title: "Success",
        description: "Transaksi Sukses",
        variant: "success",
      });

      var data = await res.json();
      setTimeout(() => {
        router.push(`/transaksi/${data.data.transaction_code}`);
      }, 3000);

      return;
    }

    setSuccess(false);
    return toast({
      title: "Failed",
      description: "Checkout Failed",
      variant: "destructive",
    });
  };

  if (!product) return <></>;
  return (
    <>
      <Dialog open={isOpen} defaultOpen={false} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm w-full">
          <DialogHeader>
            <DialogTitle>Detail Pesanan</DialogTitle>
            <DialogDescription>
              Cek pesanan anda terlebih dahulu sebelum melanjutkan pembayaran.
            </DialogDescription>
          </DialogHeader>
          <TransactionDetail
            payment={payment}
            category={category}
            form={form}
            product={product}
            promo={promo}
          />
          <div>
            <Separator className="mb-2" />
            <div className="flex justify-between items-center">
              <div className="text-xs space-y-0.5">
                <p className="">Total Harga</p>
                <p className="font-semibold text-sm">
                  {priceMask(getTotalPrice(product, promo, payment))}
                </p>
              </div>

              <Button type="submit" size="sm" onClick={createTransaction}>
                Bayar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Swal
        open={alertOpen}
        variant={success ? "success" : "failed"}
        title="Checkout Berhasil"
        description="Terimakasih telah memesan"
      />
    </>
  );
}
