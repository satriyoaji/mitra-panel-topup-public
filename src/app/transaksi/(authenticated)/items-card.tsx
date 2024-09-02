import { priceMask } from "@/Helpers";
import { ITransactionHistoryList } from "@/Type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import BadgeTransaksi from "../badge-transaksi";
import Image from "next/image";

export interface TItemsCard {
  onEditClick?: (transaction_code: string) => void;
  data: ITransactionHistoryList;
}

function ItemsCard(props: TItemsCard) {
  var date = format(parseISO(props.data.date), "dd MMM yyyy, hh:mm:ss");

  return (
    <Card className="flex">
      <div className="flex justify-between w-full my-2 mx-4">
        <div className="w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center justify-between md:justify-start space-x-3 w-full">
              <p className="text-muted-foreground text-xs">
                {props.data.transaction_code}
              </p>
              <Separator
                className="h-4 md:block hidden"
                orientation="vertical"
              />
              <p className="text-xs text-muted-foreground">{date}</p>
            </div>
            <div className="hidden md:flex justify-end w-full">
              <BadgeTransaksi status={props.data.status} />
            </div>
          </div>
          <Separator className="my-2" />
          <div className="md:flex justify-between pt-1 space-y-2">
            <div className="flex justify-between w-full">
              <div className="flex space-x-4 h-full ml-2">
                <div className="mt-1">
                  <SketchLogoIcon />
                </div>
                <div>
                  <div className="flex flex-col">
                    <p className="text-xs font-medium">
                      {props.data.category_name}
                    </p>
                    <p className="text-sm">{props.data.product_name}</p>
                  </div>
                </div>
              </div>
              <div className="md:hidden">
                <BadgeTransaksi status={props.data.status} />
              </div>
            </div>
            <div className="space-y-2 flex ml-10 md:ml-0 md:justify-end items-end space-x-2">
              {props.data.payment_logo ? (
                <Image
                  alt={props.data.payment_channel}
                  title={props.data.payment_channel}
                  src={props.data.payment_logo}
                  height={50}
                  width={50}
                />
              ) : (
                <p className="text-sm font-medium text-right p-0">
                  🪙 {props.data.payment_channel}
                </p>
              )}
            </div>
            <div className="flex items-end w-full md:max-w-[13rem] justify-between space-x-4 pl-10 md:pl-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Total</p>
                <p className="text-sm font-medium">
                  {priceMask(props.data.price)}
                </p>
              </div>
              <div>
                <Link href={`/transaksi/${props.data.transaction_code}`}>
                  <Button size="sm" variant="outline">
                    Detail
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ItemsCard;
