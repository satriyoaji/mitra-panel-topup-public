import { priceMask } from "@/Helpers";
import { ITransactionHistoryList } from "@/Type";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SketchLogoIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import BadgeTransaksi from "../badge-transaksi";

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
          <div className="md:flex justify-between pt-1">
            <div className="flex justify-between">
              <div className="flex space-x-4 h-full ml-2">
                <div className="mt-1">
                  <SketchLogoIcon />
                </div>
                {/* <img
                alt="Remy Sharp"
                className="rounded-sm border bg-card text-card-foreground shadow w-12 object-cover"
                src={""}
              /> */}
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
            <div className="flex items-end justify-between ml-10 md:ml-0 mt-1 md:mt-0 space-x-4">
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
