"use client";

import { Card } from "@/components/ui/card";
import { InfoCircledIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { priceMask } from "@/Helpers";
import { Button } from "@/components/ui/button";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { ITransactionHistoryDetail } from "@/types/transaction";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VAPayment from "./(payment)/va-payment";
import QRPayment from "./(payment)/qr-payment";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function TransactionHistoryDetail({ id }: { id: string }) {
  const [data, setData] = useState<ITransactionHistoryDetail | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      var re = await fetch(`/api/transaction/${id}`);

      var res = await re.json();
      setLoading(false);
      setData(res.data);
    })();
  }, [id]);

  const canRefund = () => {
    if (!data?.history_status) return false;
    const status = data.history_status.findLast((i) => true);
    return status?.status == 2 || status?.status == 3;
  };

  if (loading) return <Loading />;

  if (data)
    return (
      <div className="pt-4 mx-2 flex w-full justify-center">
        <div className="max-w-5xl w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="font-medium ml-2 text-lg">Detail Transaksi 📃</p>
            </div>
            {canRefund() && (
              <Link href="/redeem-coupon">
                <Button size="sm">Refund</Button>
              </Link>
            )}
          </div>
          <div className="w-full my-2">
            <Alert className="bg-theme-secondary-50 text-theme-secondary-900">
              <InfoCircledIcon className="text-white" />
              <AlertTitle>Penting!</AlertTitle>
              <AlertDescription>
                Pastikan anda menyimpan nomor transaksi dan email serta nomor
                telpon yang anda gunakan dalam proses transaksi.
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="flex md:flex-row flex-col w-full bg-background p-4">
              <div className="w-full">
                <div className="grid gap-4 pb-4">
                  <div>
                    <p className="text-xs mb-0.5 text-muted-foreground">
                      Kode Transaksi
                    </p>
                    <div className="flex items-center">
                      <p className="text-sm">{data.transaction_code}</p>
                      <CopyToClipboard text={data.transaction_code} />
                    </div>
                  </div>
                  <Card className="bg-slate-50  p-4">
                    <div className="text-xs mb-4 flex items-center space-x-4">
                      {/* {val.logo_image !== "" ? (
                                            <img
                                                alt="Remy Sharp"
                                                className="rounded hover:scale-125 transition duration-300 hover:rotate-12"
                                                src={val.logo_image}
                                            />
                                        ) : ( */}
                      <div className="h-fit w-fit p-2">
                        <SketchLogoIcon className="m-auto" />
                      </div>
                      {/* )} */}
                      <div>
                        <p>{data.category_name}</p>
                        <p className="font-semibold">{data.product_name}</p>
                      </div>
                    </div>
                    {/* {form && category.forms && (
              <div className="mt-6">
                <p className="text-xs font-semibold">Data Tambahan</p>
                <Table className="border-y bg-background rounded mt-1">
                  <TableBody className="text-xs">
                    {Object.keys(form).map((key) => (
                      <TableRow key={key}>
                        <TableCell>
                          {category.forms
                            ?.find((i) => i.key == key)
                            ?.alias.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell className="text-right space-y-1">
                          {form[key]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )} */}
                    {data.payment_information && (
                      <>
                        <VAPayment payment={data.payment_information} />
                        <QRPayment payment={data.payment_information} />
                      </>
                    )}
                  </Card>
                  <Table>
                    <TableBody className="text-xs">
                      {data.payment_information && (
                        <TableRow>
                          <TableCell>Metode Pembayaran</TableCell>
                          <TableCell className="text-right">
                            {data.payment_information.payment_channel}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell>Harga</TableCell>
                        <TableCell className="text-right space-y-1">
                          {data.price != data.paid_price ? (
                            <>
                              <div className="flex space-x-2 justify-end">
                                <p className="text-red-500">Discount</p>
                                <p className="line-through">
                                  {priceMask(data.price)}
                                </p>
                              </div>
                              <p>{priceMask(data.paid_price)}</p>
                            </>
                          ) : (
                            <>{priceMask(data.paid_price)}</>
                          )}
                        </TableCell>
                      </TableRow>
                      {/* {promo && (
                <TableRow>
                  <TableCell>Promo</TableCell>
                  <TableCell className="text-right text-red-500">
                    {promo.promo_type == "fix"
                      ? `- ${priceMask(promo.promo_value)}`
                      : `- ${promo.promo_value}%`}
                  </TableCell>
                </TableRow>
              )} */}
                      {/* {payment && payment.fee_amount ? (
                <TableRow>
                  <TableCell>Admin Fee</TableCell>
                  <TableCell className="text-right">
                    {`+ ${priceMask(payment.fee_amount)}`}
                  </TableCell>
                </TableRow>
              ) : (
                <></>
              )} */}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell>Total Harga</TableCell>
                        <TableCell className="text-right">
                          {priceMask(data.paid_price)}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              </div>
              <div className="md:mx-8 md:mb-8 mt-8 md:mt-0 mx-4 w-full">
                <div className="hidden md:block">
                  <p className="mb-4 font-medium">Order History</p>
                  <HorizontalStepper list={data.history_status} />
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full md:hidden -ml-4"
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Order History</AccordionTrigger>
                    <AccordionContent>
                      <HorizontalStepper list={data.history_status} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TransactionHistoryDetail;
