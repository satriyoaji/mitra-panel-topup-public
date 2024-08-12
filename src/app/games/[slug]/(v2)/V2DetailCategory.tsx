import React from "react";
import Header from "../header";
import ProductList from "../(product)/product-list";
import Payment from "../(payment-method)/payment";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Promo from "../(promo)/promo-list";
import FormConfirmation from "../(account-confirmation)/form-confirmation";
import CheckoutAction from "../(checkout)/checkout-action";
import { IUseCategoryData } from "../useCategory";
import FormAccount from "../(form-id)/form-account";

function V2DetailCategory(props: IUseCategoryData) {
  if (props.data.category !== null && props.data.category !== undefined)
    return (
      <div className="container max-w-6xl md:px-20 pt-2 px-4">
        <div className="">
          <div>
            <Header category={props.data.category} />
          </div>
        </div>
        <div className="md:grid md:grid-cols-5 md:gap-4 mt-1.5">
          <div className="col-span-3">
            <div ref={props.productListRef}>
              <ProductList
                number={props.data.category.forms ? 2 : 1}
                // category={data.category.name}
                nextRef={props.methodRef}
                products={props.products}
                // productSelected={data.product}
              />
            </div>
          </div>
          <div className="col-span-2">
            {props.data.category.forms ? (
              <Card ref={props.formRef} className="w-full my-4 md:mt-2">
                <CardContent className="mt-3">
                  <FormAccount forms={props.data.category.forms} />
                </CardContent>
              </Card>
            ) : null}
            <div className="my-4 md:mt-2" ref={props.methodRef}>
              <Payment number={props.data.category.forms ? 3 : 2} />
            </div>
            <Card className="w-full my-4" ref={props.couponRef}>
              <CardContent>
                <div className="flex gap-2 items-center mt-3">
                  <div className="bg-primary p-2 w-7 h-7 flex justify-center items-center rounded-full">
                    <h4 className="font-bold rounded-full text-white">
                      {props.data.category.forms ? 4 : 3}
                    </h4>
                  </div>
                  <h4 className="font-medium ml-1">Promo</h4>
                </div>
                <Separator className="my-3" />
                <Promo categoryUuid={props.data.category?.uuid} />
              </CardContent>
            </Card>
            <div ref={props.confirmationRef}>
              <FormConfirmation number={props.data.category.forms ? 5 : 4} />
            </div>
            <CheckoutAction
              confirmationRef={props.confirmationRef}
              formRef={props.formRef}
              paymentRef={props.methodRef}
            />
          </div>
        </div>
      </div>
    );
}

export default V2DetailCategory;
