"use client";
import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";

export default function Courses() {

    const router = useRouter();

    return (
        <>
            <Header />
            <div className="w-full px-52 pt-10 pb-16">
                <img src="ui/course-head-sec-img.png" alt="" />
            </div>
            <div className="w-full px-52 flex gap-4 mb-8">
                <div className="w-9/12 flex flex-col items-start">
                    <div className="flex items-center justify-center secondary-bg rounded-md overflow-hidden">
                        <div className="w-1/3 bg-white shadow">
                            <img src="ui/sample-thumb.png" alt="" className="" />
                        </div>
                        <div className="w-2/3 ps-4 flex flex-col">
                            <h2 className="font-light text-sm mb-4">by <span className="font-medium">Determined-Poitras</span></h2>
                            <h2 className="font-medium text-xl line-clamp-1">Software development</h2>
                            <p className="font-light text-sm text-gray-800 line-clamp-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sunt</p>
                            <h2 className="font-medium text-sm">20 <span className="font-medium">lessons</span></h2>
                            <div className="flex items-center justify-between mt-4">
                                <h2 className="font-medium text-sm text-green-800">Free</h2>
                                <span onClick={() => {
                                    router.push("courses/courseId")
                                }} className="cursor-pointer font-medium text-sm me-4 px-2 py-1 bg-white rounded">View more</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/12 secondary-bg h-80 rounded-md">
                    <h2>Filter</h2>
                </div>
            </div>
        </>
    )
}