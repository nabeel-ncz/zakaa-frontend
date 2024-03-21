import Header from "@/components/common/Header";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Teach() {
    return (
        <>
            <Header />
            <div className="w-full px-2 pt-2 pb-8 md:px-12 xl:px-52 xl:pt-10 xl:pb-16">
                <Image
                    src="/ui/teach-head-sec-img.png"
                    alt=""
                    style={{ backgroundSize: "cover" }}
                    width={500}
                    height={160}
                    layout="responsive"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/ui/teach-head-sec-img-lazy.png"
                />
            </div>
            <div className="w-full flex items-center justify-center pb-12 pl-12 pr-8 xl:pl-56 xl:pr-52">
                <div className="sm:block hidden w-2/6 xl:w-2/6" >
                    {/* <img src="ui/become-mentor-img.png" alt="" /> */}
                    <Image
                        src="/ui/become-mentor-img.png"
                        alt=""
                        style={{ backgroundSize: "cover" }}
                        width={700}
                        height={550}
                        layout="responsive"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="/ui/become-mentor-img-lazy.png"
                    />
                </div>
                <div className="w-6/6 sm:w-4/6 xl:w-4/6 px-2 sm:px-12 flex flex-col items-start">
                    <h2 className="font-semibold text-lg lg:text-2xl">Apply as <span className="primary-text">instructor</span></h2>
                    <p className="mt-4 font-light text-sm text-gray-600">Join our vibrant community of instructors and share your knowledge with
                        the world! As an instructor on our platform, you'll have the opportunity
                        to inspire others, build connections, and make a meaningful impact.
                        Whether you're an expert in your field, passionate about a particular subject,
                        or simply love to teach, we welcome you to join us. Teach at your own pace,
                        create engaging courses, and empower learners to achieve their goals. Together,
                        let's make learning accessible and enjoyable for everyone.</p>
                    <ul className="mt-6 list-disc">
                        <li className="font-light text-sm mt-2 text-gray-600">
                            <span className="font-bold">No Formal Requirements</span>
                            There are no formal educational or professional requirements to become an instructor on our platform.
                        </li>

                        <li className="font-light text-sm mt-2 text-gray-600">
                            <span className="font-bold">Focus on Passion and Expertise</span>
                            We value passion for teaching and subject matter expertise over formal qualifications, making this opportunity accessible to all.
                        </li>

                        <li className="font-light text-sm mt-2 text-gray-600">
                            <span className="font-bold">No Barriers to Entry</span>
                            We believe in removing barriers to entry, allowing anyone with a desire to teach to contribute to our platform.
                        </li>
                        <div className="w-1/4">
                            <button className="custom-form-button primary-bg">
                                <Link href={"/apply-to-teach"}>
                                    Apply now!
                                </Link>
                            </button>
                        </div>
                    </ul>
                </div>
            </div >
            <div className="w-full xl:px-52 pt-10 pb-6 relative sm:block hidden">
                <h2 className="font-semibold text-lg lg:text-2xl text-center absolute top-12 left-[26%] md:left-[30%] xl:left-[36%]">
                    How to apply to join as
                    <span className="primary-text"> instructor</span>
                </h2>
                <img src="ui/tutorial-to-mentor.png" alt="" />
            </div>
            <Footer />
        </>
    )
}