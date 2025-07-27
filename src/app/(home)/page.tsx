import { HomeFaq } from "@/components/home/home-faq";
import { HomeFeatures } from "@/components/home/home-features";
import { HomeFooter } from "@/components/home/home-footer";
import { HomeHero } from "@/components/home/home-hero";
import { HomeTestomonial } from "@/components/home/home-testomonial";

type Props = {
    params: Promise<{ home: string }>;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
};

export default async function Page({}: Props) {
    return (
        <div>
            <HomeHero />
            <HomeFeatures />
            <HomeTestomonial />
            <HomeFaq />
            <HomeFooter />
        </div>
    );
}
