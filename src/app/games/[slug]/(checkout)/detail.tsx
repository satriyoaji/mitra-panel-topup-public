"use client";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

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

    if (promo) payload.promo_code = promo.promo_code;

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
      router.push(`/transaksi/${data.data.transaction_code}`);
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
          {!session && (
            <Alert className="bg-theme-primary-50 text-theme-primary-900">
              <InfoCircledIcon className="text-white" />
              <AlertTitle>Penting!</AlertTitle>
              <AlertDescription className="text-xs">
                Pastikan anda menyimpan nomor transaksi dan email serta nomor telpon yang anda gunakan dalam proses transaksi.
              </AlertDescription>
            </Alert>
          )}
          <TransactionDetail
            payment={payment}
            category={category}
            form={form}
            product={product}
            promo={promo}
          />
          <Alert className="bg-theme-secondary-50 text-theme-secondary-900">
              <InfoCircledIcon className="text-white" />
              <AlertDescription className="text-xs">
                Jika transaksi gagal, saldo anda akan dikembalikan dalam bentuk saldo point
              </AlertDescription>
            </Alert>
          <div className="flex justify-between items-center">
            <Button
              type="submit"
              className="w-full"
              size="sm"
              onClick={createTransaction}
            >
              <div>Bayar</div>
            </Button>
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
