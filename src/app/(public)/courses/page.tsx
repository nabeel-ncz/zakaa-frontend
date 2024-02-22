"use client";
import Header from "@/components/common/Header";
import { TypeDispatch } from "@/store";
import { getPublicCoursesAction } from "@/store/actions/course";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Courses() {

    const dispatch: TypeDispatch = useDispatch();
    const [courses, setCourses] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        dispatch(getPublicCoursesAction())
            .then((res) => {
                if (res.payload.success) {
                    setCourses(res.payload.data);
                }
            });
    }, []);

    return (
        <>
            <Header />
            <div className="w-full px-52 pt-10 pb-16">
                <img src="/ui/course-head-sec-img.png" alt="" />
            </div>
            <div className="w-full px-52 flex gap-4 mb-8">
                <div className="w-9/12 flex flex-col items-start gap-2 bg-white">
                    {courses?.map((item: any) => (
                        <div className="flex items-center justify-center secondary-bg rounded-md overflow-hidden px-2 py-3">
                            <div className="w-5/12 bg-white shadow">
                                <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.thumbnail}`} alt="" className="rounded" />
                            </div>
                            <div className="w-7/12 ps-4 flex flex-col">
                                <h2 className="font-light text-sm">{item.categoryRef.title}</h2>
                                <h2 className="font-light text-sm">by <span className="font-medium">{item.instructorRef.username}</span></h2>
                                <h2 className="mt-4 font-medium text-xl line-clamp-1">{item.title}</h2>
                                <p className="font-light text-sm text-gray-800 line-clamp-1">{item.description}</p>
                                <h2 className="font-medium text-sm">{item.lessons.length} <span className="font-medium"> lessons</span></h2>
                                <div className="flex items-center justify-between mt-4">
                                    <h2 className="font-medium text-sm text-green-800">{item.pricing.type}</h2>
                                    <span onClick={() => {
                                        router.push(`courses/${item._id}`)
                                    }} className="cursor-pointer font-medium text-sm me-4 px-2 py-1 bg-white rounded">View more</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-3/12 secondary-bg h-80 rounded-md">
                    <h2>Filter</h2>
                </div>
            </div>
        </>
    )
}