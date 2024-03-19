import Image from "next/image"

export default function HeroSection() {
    return (
        <>
            <div className="h-screeen pl-56 pr-52">
                <Image
                    src="/ui/hero-img-min.png"
                    alt=""
                    style={{ backgroundSize: "cover" }}
                    width={600}
                    height={450}
                    layout="responsive"
                    loading="lazy"
                />
            </div>
        </>
    )
}