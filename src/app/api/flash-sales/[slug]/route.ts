import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const url = new URL(req.url as string);
  const cookieStore = cookies();

  let qParams = url.searchParams;
  qParams.append("mitra_id", process.env.NEXT_MITRA_ID as string);

  // var re = await fetch(
  //     `${process.env.NEXT_API_URL}/v2/panel/product-flash-sales/${params.slug}?` +
  //         qParams,
  //     {
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //             // Authorization: `Bearer ${cookieStore.get("mantapu")?.value}`,
  //         },
  //         cache: "no-store",
  //     }
  // );

  // var result = await re.json();
  var result = {
    status: "SUCCESS",
    code: "0000",
    data: {
      id: 4,
      created_at: "2024-01-06T05:07:03.974191+07:00",
      updated_at: "2024-01-06T05:24:24.814001+07:00",
      product: {
        uuid: "c72be282-1175-401d-a885-a429ed952b47",
        product_sku: "GSIXBWM",
        product_name: "Genshin Impact Blessing of the Welkin Moon",
        sale_price: 71102.8,
        category_uuid: "105204e8-4235-4c0c-82ea-764db1089703",
        category_alias: "Genshin Impact",
        category_code: "GenshinImpact-C",
        active: true,
        group_name: "Trial",
      },
      discount_price: 2000,
      start_at: "2023-05-07T07:00:00+07:00",
      finish_at: "2023-05-08T07:00:00+07:00",
      active: true,
    },
    pagination: null,
    error_message: null,
  };
  return NextResponse.json(result, { status: 200 });
}
