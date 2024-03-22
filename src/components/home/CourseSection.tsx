"use client";
import { TypeDispatch } from "@/store";
import { getPublicCoursesAction } from "@/store/actions/course";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import CourseSectionCardLoading from "./CourseSectionCardLoading";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function CourseSection() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [courses, setCourses] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getPublicCoursesAction({ page: 1 })).then((res) => {
            setCourses(res.payload?.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <section className="bg-white px-12 lg:px-24">
            <h2 className="font-extrabold text-lg sm:text-2xl mb-6">
                Latest <span className="primary-text">Courses</span>
            </h2>
            <div className="container">
                <div className="flex flex-wrap -mx-4">
                    {loading && (
                        <>
                            <CourseSectionCardLoading />
                            <CourseSectionCardLoading />
                            <CourseSectionCardLoading />
                            <CourseSectionCardLoading />
                        </>
                    )}
                    {courses?.map((item: {
                        _id: string;
                        thumbnail: string;
                        title: string;
                        description: string;
                    }) => (
                        <>
                            <div onClick={() => {
                                router.push(`/courses/${item._id}`);
                            }} className="w-full md:w-1/3 lg:w-1/4 px-4">
                                <div className="bg-white rounded-lg overflow-hidden mb-10">
                                    <img
                                        src={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.thumbnail}`}
                                        alt="image"
                                        className="w-full"
                                    />
                                    <div className="px-1 text-center">
                                        <h3>
                                            <a
                                                href="javascript:void(0)"
                                                className="mt-2 font-semibold text-base xl:text-xl mb-4 line-clamp-1"
                                            >
                                                {item?.title}
                                            </a>
                                        </h3>
                                        <p className="text-xs leading-relaxed mb-2 line-clamp-2">
                                            {item?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </section>
    )
}
