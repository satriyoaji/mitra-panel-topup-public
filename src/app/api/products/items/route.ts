import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url as string);

    // const strUrl = `${process.env.NEXT_PUBLIC_API}/products?mitra_id=${process.env.NEXT_MITRA_ID}&${url.searchParams}`;

    // var re = await fetch(strUrl, {
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //     },
    //     cache: "no-store",
    // });

    // var result = await re.json();

    var result = {
        "status": "SUCCESS",
        "code": "0000",
        "data": [
            {
                "created_at": "2023-12-26T23:39:01.705357+07:00",
                "updated_at": "2023-12-30T21:40:45.478294+07:00",
                "uuid": "c72be282-1175-401d-a885-a429ed952b47",
                "product_sku": "GSIXBWM",
                "product_name": "Genshin Impact Blessing of the Welkin Moon",
                "sale_price": 71102.8,
                "category_alias": "Genshin Impact",
                "category_code": "GenshinImpact-C",
                "active": true,
                "group_name": "Trial",
                "flash_sales": [
                    {
                        "id": 4,
                        "discount_price": 2000,
                        "start_at": "2023-05-07T07:00:00+07:00",
                        "finish_at": "2023-05-08T07:00:00+07:00",
                        "active": true
                    }
                ]
            },
            {
                "created_at": "2023-12-26T23:39:01.703743+07:00",
                "updated_at": "2023-12-26T23:39:01.703743+07:00",
                "uuid": "3dcd16cb-e78b-425c-8356-e3250b5e7a0c",
                "product_sku": "ISATTRF50",
                "product_name": "Indosat Pulsa Transfer 50.000",
                "sale_price": 59876,
                "category_alias": "INDOSAT",
                "category_code": "Indosat-C",
                "active": true,
                "group_name": "Pulsa Provider",
                "flash_sales": [
                    {
                        "id": 6,
                        "discount_price": 1000,
                        "start_at": "2023-05-06T07:00:00+07:00",
                        "finish_at": "2023-05-07T07:00:00+07:00",
                        "active": true
                    }
                ]
            },
            {
                "created_at": "2023-12-26T23:39:01.702975+07:00",
                "updated_at": "2023-12-26T23:39:01.702975+07:00",
                "uuid": "1fb1a5e6-9b1a-4fc0-b25c-6e0aa0336872",
                "product_sku": "ISATTRF25",
                "product_name": "Indosat Pulsa Transfer 25.000",
                "sale_price": 34900,
                "category_alias": "INDOSAT",
                "category_code": "Indosat-C",
                "active": true,
                "group_name": "Pulsa Provider",
                "flash_sales": null
            },
            {
                "created_at": "2023-12-26T23:39:01.702197+07:00",
                "updated_at": "2023-12-26T23:39:01.702197+07:00",
                "uuid": "e4a3235c-f834-422f-b828-53039e91a893",
                "product_sku": "ISATTRF200",
                "product_name": "Indosat Pulsa Transfer 200.000",
                "sale_price": 201719,
                "category_alias": "INDOSAT",
                "category_code": "Indosat-C",
                "active": true,
                "group_name": "Pulsa Provider",
                "flash_sales": null
            },
            {
                "created_at": "2023-12-26T23:39:01.701358+07:00",
                "updated_at": "2023-12-26T23:39:01.701358+07:00",
                "uuid": "e67264cf-c556-411e-8e66-dfdfd1f42042",
                "product_sku": "ISATTRF20",
                "product_name": "Indosat Pulsa Transfer 20.000",
                "sale_price": 29733,
                "category_alias": "INDOSAT",
                "category_code": "Indosat-C",
                "active": true,
                "group_name": "Pulsa Provider",
                "flash_sales": null
            },
            {
                "created_at": "2023-12-26T23:39:01.700808+07:00",
                "updated_at": "2023-12-26T23:39:01.700808+07:00",
                "uuid": "bc39fb3d-17ad-431d-9e30-3a6f940fc255",
                "product_sku": "ISATTRF100",
                "product_name": "Indosat Pulsa Transfer 100.000",
                "sale_price": 107671,
                "category_alias": "INDOSAT",
                "category_code": "Indosat-C",
                "active": true,
                "group_name": "Pulsa Provider",
                "flash_sales": null
            },
            {
                "created_at": "2023-12-26T23:39:01.699591+07:00",
                "updated_at": "2023-12-26T23:39:01.699591+07:00",
                "uuid": "de2f1727-f870-4221-bece-da794955fbda",
                "product_sku": "ISATTRF10",
                "product_name": "Indosat Pulsa Transfer 10.000",
                "sale_price": 20358,
                "category_alias": "INDOSAT",
                "category_code": "Indosat-C",
                "active": true,
                "group_name": "Pulsa Provider",
                "flash_sales": null
            },
            {
                "created_at": "2023-12-26T23:39:01.69829+07:00",
                "updated_at": "2023-12-26T23:39:01.69829+07:00",
                "uuid": "0dfe387e-9416-492d-bcc4-cace1aedcd67",
                "product_sku": "YS6_3280-S13",
                "product_name": "3280 Emelas + 1520 Emelas",
                "sale_price": 543110,
                "category_alias": "YS 6 Mobile",
                "category_code": "YS6",
                "active": true,
                "group_name": null,
                "flash_sales": null
            },
            {
                "created_at": "2023-12-26T23:39:01.6975+07:00",
                "updated_at": "2023-12-26T23:39:01.6975+07:00",
                "uuid": "882977f6-9d7e-4ae6-b6f9-2f7a7c995961",
                "product_sku": "YS6_1980-S13",
                "product_name": "1980 Emelas + 820 Emelas",
                "sale_price": 348200,
                "category_alias": "YS 6 Mobile",
                "category_code": "YS6",
                "active": true,
                "group_name": null,
                "flash_sales": null
            },
            {
                "created_at": "2023-12-26T23:39:01.696975+07:00",
                "updated_at": "2023-12-26T23:39:01.696975+07:00",
                "uuid": "d0f42176-ac97-478f-82de-1f3a55de7256",
                "product_sku": "ROB25-S51",
                "product_name": "Roblox (USD) 25",
                "sale_price": 361855,
                "category_alias": "Voucher Roblox",
                "category_code": "ROB",
                "active": true,
                "group_name": null,
                "flash_sales": null
            }
        ],
        "pagination": {
            "page_num": 1,
            "page_size": 10,
            "total_data": 3755
        },
        "error_message": null
    }

    return NextResponse.json(result, { status: 200 });
}
