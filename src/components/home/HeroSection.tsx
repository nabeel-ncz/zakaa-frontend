import Image from "next/image"

export default function HeroSection() {
    return (
        <>
            <div className="h-screeen pl-8 pr-4 lg:pl-32 lg:pr-28 xl:pl-40 xl:pr-36 2xl:pl-56 2xl:pr-52">
                <Image
                    src="/ui/hero-img.png"
                    alt=""
                    style={{ backgroundSize: "cover" }}
                    width={600}
                    height={450}
                    layout="responsive"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/ui/hero-img-lazy.png"
                />
            </div>
        </>
    )
}