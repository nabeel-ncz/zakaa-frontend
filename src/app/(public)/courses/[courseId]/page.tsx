"use client";
import Header from "@/components/common/Header";
import { TypeDispatch } from "@/store";
import { getCourseAction } from "@/store/actions/course";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function CourseDetailed({ params }: any) {

    const { courseId } = params;

    const dispatch: TypeDispatch = useDispatch();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        dispatch(getCourseAction({
            courseId
        })).then((res) => {
            if(res.payload?.success){
                setCourse(res.payload?.data);
            }
        });
    }, []);

    return (
        <>
            <Header />
            <div className="w-full px-44 pt-10 pb-16">
                <div className="w-full h-full secondary-bg rounded-lg px-8 py-12 flex gap-8">
                    <div className="w-8/12 relative">
                        <img src="/ui/sample-thumb.png" alt="" className="w-full" />
                        <div className="absolute left-[48%] top-[48%] w-12 h-12">
                            <img src="/icons/play.png" alt="" className="" />
                        </div>
                    </div>
                    <div className="w-4/12">
                        <div className="flex items-center justify-center gap-2 bg-white shadow p-2 rounded">
                            <img src="/ui/sample-thumb.png" alt="" className="w-1/3" />
                            <div className="flex flex-col items-start w-2/3">
                                <h3 className="line-clamp-1 font-medium text-sm">Lesson basics of html</h3>
                                <p className="line-clamp-2 font-light text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem culpa perspiciatis laboriosam nemo voluptate provident aspernatur hic</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-8 px-8">
                    <h2 className="font-medium text-2xl">Web development course volume - 1</h2>
                    <p className="font-light text-sm mt-2">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus ipsam praesentium minima eos vero! Aliquid dolore, veritatis officiis libero impedit provident atque? Porro aut quisquam tempora asperiores fugit, ducimus tenetur?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vitae incidunt eius eaque quos, distinctio asperiores esse ab neque laborum perferendis, tenetur ullam? Excepturi distinctio totam mollitia asperiores, eum et!
                    </p>
                </div>
            </div>
        </>
    )
}
