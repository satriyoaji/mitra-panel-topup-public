"use client";

import React, { useMemo } from "react";
import { Card } from "./ui/card";
import { PlusIcon, SketchLogoIcon } from "@radix-ui/react-icons";
import { Table, TableBody, TableCell, TableFooter, TableRow } from "./ui/table";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { getTotalPrice, nPlainFormatter, priceMask } from "@/Helpers";
import { useSession } from "next-auth/react";
import { ITransaction } from "@/types/transaction";

function TransactionDetail({
  product,
  category,
  promo,
  form,
  payment,
  account,
}: ITransaction) {
  const { data: session } = useSession();

  const total = useMemo(() => {
    if (product) return getTotalPrice(product, promo, payment);
    return 0;
  }, [product, promo, payment]);

  if (product && category) {
    return (
      <div>
        <div className="grid gap-4">
          <Card className="bg-zinc-50 p-4">
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
                <p className="text-xs">{category.name}</p>
                <p className="font-semibold">{product.name}</p>
              </div>
            </div>
            {form && category.forms ? (
              <div className="mt-6">
                <p className="text-xs font-semibold">Informasi</p>
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
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell className="text-right space-y-1">
                        {account?.email ?? session?.profile.email}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>No. Whatsapp</TableCell>
                      <TableCell className="text-right space-y-1">
                        {account?.noWhatsapp ?? session?.profile.phone}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ) : null}
          </Card>
          <Table>
            <TableBody className="text-xs">
              <TableRow>
                <TableCell>
                  <p className="text-xs">Metode Pembayaran</p>
                </TableCell>
                <TableCell className="space-y-1">
                  <div className="flex justify-end">
                    {payment?.image_url ? (
                      <Image
                        alt={payment.name}
                        src={payment.image_url}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <p>{payment?.name}</p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Harga</TableCell>
                <TableCell className="text-right space-y-1">
                  {product.discounted_price > 0 ? (
                    <>
                      <div className="flex space-x-2 justify-end text-xs">
                        <p className="text-red-500 text-xs">Discount</p>
                        <p className="line-through text-xs">
                          {priceMask(product.price)}
                        </p>
                      </div>
                      <p className="text-xs">
                        {priceMask(product.discounted_price)}
                      </p>
                    </>
                  ) : (
                    <p className="text-xs">{priceMask(product.price)}</p>
                  )}
                </TableCell>
              </TableRow>
              {promo ? (
                <TableRow>
                  <TableCell>Promo</TableCell>
                  <TableCell className="text-right text-red-500">
                    {!promo.is_discount_percent
                      ? `- ${priceMask(promo.discount_amount)}`
                      : `- ${promo.discount_percent}% (${priceMask(
                          (product.price * promo.discount_percent) / 100
                        )})`}
                  </TableCell>
                </TableRow>
              ) : null}
              {payment && payment.fee_amount ? (
                <TableRow>
                  <TableCell>Admin Fee</TableCell>
                  <TableCell className="text-right">
                    {`+ ${priceMask(payment.fee_amount)}`}
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total Harga</TableCell>
                <TableCell className="text-right font-semibold">
                  {priceMask(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    );
  }
  return <></>;
}

export default TransactionDetail;
