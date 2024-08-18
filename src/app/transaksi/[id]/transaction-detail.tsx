"use client";

import {
  ArrowLeftIcon,
  InfoCircledIcon,
  SketchLogoIcon,
} from "@radix-ui/react-icons";
import { priceMask } from "@/Helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { ITransactionHistoryDetail } from "@/types/transaction";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Separator } from "@/components/ui/separator";
import VAPayment from "./(payment)/va-payment";
import QRPayment from "./(payment)/qr-payment";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import BadgeTransaksi from "../badge-transaksi";
import LinkPayment from "./(payment)/link-payment";
import { isFuture, parseISO } from "date-fns";
import CountdownCard from "@/app/dashboard/countdown-card";
import { useSession } from "next-auth/react";
import PrintInvoice from "./print-invoice";
import { ISiteProfile } from "@/types/utils";
import { ETransactionStatus } from "@/types/enums";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

function TransactionHistoryDetail({
  id,
  profile,
}: {
  id: string;
  profile?: ISiteProfile;
}) {
  const [data, setData] = useState<ITransactionHistoryDetail | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      var re = await fetch(`/api/transaction/${id}`);

      var res = await re.json();
      setLoading(false);
      setData(res.data);
    })();
  }, [id]);

  if (loading) return <Loading />;

  if (data)
    return (
      <>
        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center space-x-1">
            <ArrowLeftIcon
              className="h-5 w-5 text-primary cursor-pointer"
              onClick={() => router.back()}
            />
            <div className="sm:flex items-center space-x-2">
              <h4 className="font-medium ml-2 p-0 text-primary">
                Detail Transaksi
              </h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-xs text-muted-foreground">
                    {data.transaction_code}
                  </p>
                  <CopyToClipboard text={data.transaction_code} />
                </div>
              </div>
            </div>
          </div>
          <PrintInvoice {...data} profile={profile} />
        </div>

        <div className="flex flex-row justify-stretch items-center mt-2 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 h-full mt-1">
            <div className="h-max">
              {!session ? (
                <Alert className="bg-red-50 text-red-900 mb-3">
                  <InfoCircledIcon className="text-white" />
                  <AlertTitle>Penting!</AlertTitle>
                  <AlertDescription className="text-xs">
                    Pastikan anda menyimpan nomor transaksi dan email serta
                    nomor telpon yang anda gunakan dalam proses transaksi.
                  </AlertDescription>
                </Alert>
              ) : null}
              <div className="w-full bg-background px-4 pt-3 pb-6 rounded-lg shadow border flex-1 h-full">
                <p className="font-medium text-lg text-primary">
                  Rincian Transaksi
                </p>
                <div className="mt-4 space-y-4 h-full">
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">
                      Order Expired
                    </p>
                    {data.payment_information &&
                    data.payment_information.expired_at &&
                    isFuture(parseISO(data.payment_information.expired_at)) ? (
                      <CountdownCard
                        date={parseISO(data.payment_information.expired_at)}
                      />
                    ) : (
                      <Badge variant="destructive">Expired</Badge>
                    )}
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Produk</p>
                    <p className="">{data.category_name}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Item</p>
                    <p className="">{data.product_name}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Informasi</p>
                    <div>
                      <p>{data.customer_data}</p>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">Status</p>
                    <div>
                      <BadgeTransaksi status={data.status} />
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-muted-foreground text-sm">
                      Informasi Kontak
                    </p>
                    <div className="text-right space-y-1">
                      <p>{data.email}</p>
                      <p>{data.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {data.payment_information ? (
              <div className="h-max">
                <div className="bg-background border h-full pt-3 rounded-lg shadow relative overflow-clip">
                  <div className="px-4">
                    <p className="font-medium text-lg text-primary">
                      Rincian Pembayaran
                    </p>
                    <div className="mt-4 space-y-4 h-full">
                      <div className="flex justify-between w-full">
                        <p className="text-muted-foreground text-sm">
                          Pilihan Pembayaran
                        </p>
                        <div className="flex flex-col items-end">
                          <p className="text-sm">
                            {`${data.payment_information.payment_method.replace(
                              "_",
                              " "
                            )} - ${data.payment_information.payment_channel}`}
                          </p>
                          {data.payment_information.image_url ? (
                            <Image
                              className="mt-1.5"
                              alt={data.payment_information.payment_method}
                              src={data.payment_information.image_url}
                              width={50}
                              height={50}
                            />
                          ) : (
                            <p className="text-xl text-left">💳</p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="text-muted-foreground text-sm">
                          Total Pembayaran
                        </p>
                        <p className="font-semibold text-green-600">
                          {priceMask(data.payment_information.payment_amount)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-3 w-full" />
                  <div className="px-4 pb-12">
                    <p className="font-medium text-lg text-primary">
                      Tujuan Pembayaran
                    </p>
                    <div className="mt-4 space-y-4 h-full">
                      {data.payment_information.payment_method ==
                      "VIRTUAL_ACCOUNT" ? (
                        <VAPayment payment={data.payment_information} />
                      ) : data.payment_information.payment_method ==
                        "EWALLET" ? (
                        <LinkPayment payment={data.payment_information} />
                      ) : (
                        <QRPayment payment={data.payment_information} />
                      )}
                    </div>
                  </div>
                  <div className="w-full bottom-0 mt-6 absolute">
                    {data.status !== ETransactionStatus.Refunded ? (
                      <div className="bg-amber-50 border-t flex items-center rounded-b-lg space-x-2 text-amber-800 px-4 py-1.5">
                        <InfoCircledIcon />
                        <p className="text-xs">
                          Jika transaksi gagal, saldo anda akan dikembalikan
                          dalam bentuk point
                        </p>
                      </div>
                    ) : (
                      <div className="bg-blue-50 border flex items-center rounded-b-lg space-x-2 text-blue-800 px-4 py-1.5">
                        <InfoCircledIcon />
                        <p className="text-xs">
                          Saldo anda sudah dikembalikan. Silahkan cek{" "}
                          <Link href="/profile" className="font-semibold">
                            Saldo Point
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {data.payment_information.guide ? (
                  <div className="bg-background mt-3 border px-4 pt-3 pb-6 rounded-lg shadow text-muted-foreground">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.payment_information.guide,
                      }}
                    ></div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  else
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <h3 className="font-bold text-slate-300 text-center">
          Transaksi Tidak Ada
        </h3>
      </div>
    );
}

export default TransactionHistoryDetail;
