"use client";

import { Card } from "@/components/ui/card";
import { PlusIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { getTotalPrice, nPlainFormatter, priceMask } from "@/Helpers";
import { Button } from "@/components/ui/button";
import HorizontalStepper from "@/components/ui/horizontal-stepper";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { ITransactionHistoryDetail } from "@/types/transaction";

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

  if (loading) return <Loading />;

  if (data)
    return (
      <div className="mx-2">
        <div className="md:grid grid-cols-1">
          <div>
            <div className="grid gap-4 py-4">
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
              </Card>
              <Table>
                <TableBody className="text-xs">
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
            <Separator className="my-4" />
            <p>Pembayaran</p>
            <div className="flex items-center w-full gap-4">
              <div className="p-4 w-full h-full rounded-lg border flex flex-col justify-center items-center">
                <div className="flex items-center gap-1.5">
                  <p className="font-medium text-xl -mt-1">💳</p>
                  <p className="font-medium text-xs">
                    {data.payment_information &&
                      data.payment_information.payment_channel}
                  </p>
                </div>
                <Separator className="my-2" />
                <p className="font-medium text-sm">
                  {priceMask(data.paid_price)}
                </p>
              </div>
            </div>
          </div>
          <div className="m-8">
            <HorizontalStepper list={data.history_status} />
          </div>
        </div>
      </div>
    );
}

export default TransactionHistoryDetail;
