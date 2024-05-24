import {
    DiscordLogoIcon,
    InstagramLogoIcon,
    TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

interface Sosmed {
    name: string;
    link: string;
}

const getSocmed = async () => {
    // var res = await fetch(
    //     `${process.env.API}/all-socmeds?mitra_id=${process.env.NEXT_MITRA_ID}`,
    //     {
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         next: {
    //             revalidate: 7200,
    //         },
    //     }
    // );
    // console.log("RESS: ", res)

    // if (res.ok) {
    //     var result = await res.json();
    //     return result.data;
    // }

    // return [];
    return [
        {
            id: 1,
            created_at: "2023-12-16T22:20:25.32085+07:00",
            updated_at: "2023-12-16T22:20:25.32085+07:00",
            name: "instagram",
            link: "http://www.instagram.com",
        },
        {
            id: 2,
            created_at: "2023-12-16T22:20:25.32085+07:00",
            updated_at: "2023-12-16T22:20:25.32085+07:00",
            name: "twitter",
            link: "http://www.twitter.com",
        },
    ];
};

async function Footer() {
    var data: Sosmed[] = await getSocmed();

    const getIcon = (type: string) => {
        switch (type) {
            case "instagram":
                return (
                    <InstagramLogoIcon className="w-6 h-6 text-theme-primary-foreground" />
                );
            case "twitter":
                return (
                    <TwitterLogoIcon className="w-6 h-6 text-theme-primary-foreground" />
                );
            case "discord":
                return (
                    <DiscordLogoIcon className="w-6 h-6 text-theme-primary-foreground" />
                );
            case "facebook":
                return (
                    <svg
                        viewBox="0 0 32 32"
                        className="fill-theme-primary-foreground"
                    >
                        <path d="M 16 4 C 9.3844276 4 4 9.3844276 4 16 C 4 22.615572 9.3844276 28 16 28 C 22.615572 28 28 22.615572 28 16 C 28 9.3844276 22.615572 4 16 4 z M 16 6 C 21.534692 6 26 10.465308 26 16 C 26 21.027386 22.311682 25.161277 17.488281 25.878906 L 17.488281 18.916016 L 20.335938 18.916016 L 20.783203 16.023438 L 17.488281 16.023438 L 17.488281 14.443359 C 17.488281 13.242359 17.882859 12.175781 19.005859 12.175781 L 20.810547 12.175781 L 20.810547 9.6523438 C 20.493547 9.6093438 19.822688 9.515625 18.554688 9.515625 C 15.906688 9.515625 14.355469 10.913609 14.355469 14.099609 L 14.355469 16.023438 L 11.632812 16.023438 L 11.632812 18.916016 L 14.355469 18.916016 L 14.355469 25.853516 C 9.6088556 25.070647 6 20.973047 6 16 C 6 10.465308 10.465308 6 16 6 z"></path>
                    </svg>
                );
            case "tiktok":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        className="fill-theme-primary-foreground"
                    >
                        <path d="M 3 3 L 3 4 L 3 21 L 21 21 L 21 3 L 3 3 z M 5 5 L 19 5 L 19 19 L 5 19 L 5 5 z M 12 7 L 12 14 C 12 14.56503 11.56503 15 11 15 C 10.43497 15 10 14.56503 10 14 C 10 13.43497 10.43497 13 11 13 L 11 11 C 9.3550302 11 8 12.35503 8 14 C 8 15.64497 9.3550302 17 11 17 C 12.64497 17 14 15.64497 14 14 L 14 10.232422 C 14.616148 10.671342 15.259118 11 16 11 L 16 9 C 15.952667 9 15.262674 8.7809373 14.78125 8.3613281 C 14.299826 7.941719 14 7.4149911 14 7 L 12 7 z"></path>
                    </svg>
                );
            case "youtube":
                return (
                    <svg
                        viewBox="0 0 64 64"
                        className="fill-theme-primary-foreground"
                    >
                        <path d="M 32 15 C 14.938 15 12.659656 15.177734 10.472656 17.427734 C 8.2856563 19.677734 8 23.252 8 32 C 8 40.748 8.2856562 44.323266 10.472656 46.572266 C 12.659656 48.821266 14.938 49 32 49 C 49.062 49 51.340344 48.821266 53.527344 46.572266 C 55.714344 44.322266 56 40.748 56 32 C 56 23.252 55.714344 19.677734 53.527344 17.427734 C 51.340344 15.177734 49.062 15 32 15 z M 32 19 C 45.969 19 49.379156 19.062422 50.535156 20.232422 C 51.691156 21.402422 52 24.538 52 32 C 52 39.462 51.691156 42.597578 50.535156 43.767578 C 49.379156 44.937578 45.969 45 32 45 C 18.031 45 14.620844 44.937578 13.464844 43.767578 C 12.308844 42.597578 12.03125 39.462 12.03125 32 C 12.03125 24.538 12.308844 21.402422 13.464844 20.232422 C 14.620844 19.062422 18.031 19 32 19 z M 27.949219 25.017578 L 27.949219 38.982422 L 40.095703 31.945312 L 27.949219 25.017578 z"></path>
                    </svg>
                );
            case "telegram":
                return (
                    <svg viewBox="0 0 50 50" fill="white">
                        <path d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 34.087891 14.035156 C 33.403891 14.035156 32.635328 14.193578 31.736328 14.517578 C 30.340328 15.020578 13.920734 21.992156 12.052734 22.785156 C 10.984734 23.239156 8.9960938 24.083656 8.9960938 26.097656 C 8.9960938 27.432656 9.7783594 28.3875 11.318359 28.9375 C 12.146359 29.2325 14.112906 29.828578 15.253906 30.142578 C 15.737906 30.275578 16.25225 30.34375 16.78125 30.34375 C 17.81625 30.34375 18.857828 30.085859 19.673828 29.630859 C 19.666828 29.798859 19.671406 29.968672 19.691406 30.138672 C 19.814406 31.188672 20.461875 32.17625 21.421875 32.78125 C 22.049875 33.17725 27.179312 36.614156 27.945312 37.160156 C 29.021313 37.929156 30.210813 38.335938 31.382812 38.335938 C 33.622813 38.335938 34.374328 36.023109 34.736328 34.912109 C 35.261328 33.299109 37.227219 20.182141 37.449219 17.869141 C 37.600219 16.284141 36.939641 14.978953 35.681641 14.376953 C 35.210641 14.149953 34.672891 14.035156 34.087891 14.035156 z M 34.087891 16.035156 C 34.362891 16.035156 34.608406 16.080641 34.816406 16.181641 C 35.289406 16.408641 35.530031 16.914688 35.457031 17.679688 C 35.215031 20.202687 33.253938 33.008969 32.835938 34.292969 C 32.477938 35.390969 32.100813 36.335938 31.382812 36.335938 C 30.664813 36.335938 29.880422 36.08425 29.107422 35.53125 C 28.334422 34.97925 23.201281 31.536891 22.488281 31.087891 C 21.863281 30.693891 21.201813 29.711719 22.132812 28.761719 C 22.899812 27.979719 28.717844 22.332938 29.214844 21.835938 C 29.584844 21.464938 29.411828 21.017578 29.048828 21.017578 C 28.923828 21.017578 28.774141 21.070266 28.619141 21.197266 C 28.011141 21.694266 19.534781 27.366266 18.800781 27.822266 C 18.314781 28.124266 17.56225 28.341797 16.78125 28.341797 C 16.44825 28.341797 16.111109 28.301891 15.787109 28.212891 C 14.659109 27.901891 12.750187 27.322734 11.992188 27.052734 C 11.263188 26.792734 10.998047 26.543656 10.998047 26.097656 C 10.998047 25.463656 11.892938 25.026 12.835938 24.625 C 13.831938 24.202 31.066062 16.883437 32.414062 16.398438 C 33.038062 16.172438 33.608891 16.035156 34.087891 16.035156 z"></path>
                    </svg>
                );
        }
    };

    return (
        <div className="bg-theme-primary-400 pt-4 px-4 pb-12 flex flex-col items-center rounded-t-2xl border-t-4 border-theme-secondary">
            <p className="font-bold text-theme-primary-foreground">
                Follow Us On
            </p>
            <div className="flex justify-center space-x-2 mt-2">
                {data?.map((item, idx) => (
                    <Link
                        key={`${idx}`}
                        className="w-6 h-6 text-theme-primary-foreground"
                        href={item.link}
                    >
                        {getIcon(item.name)}
                    </Link>
                ))}
            </div>
            <Separator className="mb-3 mt-6" />
            <p className="text-theme-primary-foreground text-xs">
                {`Copyright © ${new Date().getFullYear()}`}{" "}
                <span className="font-semibold">Panel VC Gamers</span>
                {` - All Right Reserved`}
            </p>
        </div>
    );
}

export default Footer;
