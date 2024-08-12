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

function V1DetailCategory(props: IUseCategoryData) {
  if (props.data.category !== null && props.data.category !== undefined)
    return (
      <div className="md:grid md:grid-cols-5 md:gap-4 md:container px-4">
        <div className="col-span-2 my-0.5">
          <div>
            <Header category={props.data.category} />
          </div>
        </div>
        <div className="col-span-3">
          {props.data.category.forms ? (
            <Card ref={props.formRef} className="w-full my-4 md:mt-2">
              <CardContent className="mt-3">
                <FormAccount forms={props.data.category.forms} />
              </CardContent>
            </Card>
          ) : null}
          <div ref={props.productListRef}>
            <ProductList
              number={props.data.category.forms ? 2 : 1}
              // category={data.category.name}
              nextRef={props.methodRef}
              products={props.products}
              // productSelected={data.product}
            />
          </div>
          <div className="my-4" ref={props.methodRef}>
            <Payment number={props.data.category.forms ? 3 : 2} />
          </div>
          <Card className="w-full my-4" ref={props.couponRef}>
            <CardContent>
              <div className="flex gap-2 items-center mt-3">
                <div className="bg-primary p-2 w-7 h-7 flex justify-center items-center rounded-full">
                  <h6 className="font-bold rounded-full text-white">
                    {props.data.category.forms ? 4 : 3}
                  </h6>
                </div>
                <h6 className="font-medium ml-1">Promo</h6>
              </div>
              <Separator className="my-3" />
              <Promo categoryUuid={props.data.category?.key} />
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
    );
}

export default V1DetailCategory;
