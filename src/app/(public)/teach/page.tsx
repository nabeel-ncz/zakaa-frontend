import Header from "@/components/common/Header";
import Link from "next/link";

export default function Teach() {
    return (
        <>
            <Header />
            <div className="w-full px-52 pt-10 pb-16">
                <img src="ui/teach-head-sec-img.png" alt="" />
            </div>
            <div className="w-full flex items-center justify-center pb-12 pl-64 pr-52">
                <div className="max-w-sm" >
                    <img src="ui/become-mentor-img.png" alt="" />
                </div>
                <div className="px-12 flex flex-col items-start">
                    <h2 className="font-semibold text-2xl">Apply as <span className="primary-text">instructor</span></h2>
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
            <div className="w-full px-52 pt-10 pb-6 relative">
                <h2 className="font-semibold text-2xl text-center absolute top-12 left-[36%]">
                    How to apply to join as
                    <span className="primary-text"> instructor</span>
                </h2>
                <img src="ui/tutorial-to-mentor.png" alt="" />
            </div>
        </>
    )
}