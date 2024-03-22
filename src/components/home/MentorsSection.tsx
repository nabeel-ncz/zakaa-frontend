"use client";
import { useEffect, useState } from "react";
import MentorSectionCardLoading from "./MentorSectionCardLoading";
import { TypeDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { getTopInstructorsByEnrollmentAction } from "@/store/actions/course";
import { useRouter } from "next/navigation";


export default function MentorsSection() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [mentors, setMentors] = useState<any>(null);

    useEffect(() => {
        dispatch(getTopInstructorsByEnrollmentAction()).then((res) => {
            if (res.payload?.success) setMentors(res.payload?.data);
        }).finally(() => { setLoading(false) });
    }, []);

    return (
        <section className="bg-white px-12 lg:px-24">
            <h2 className="font-extrabold text-lg sm:text-2xl mb-6">
                Top <span className="primary-text">Instructors</span>
            </h2>
            <div className="container">
                {loading && (
                    <div className="flex flex-wrap -mx-4">
                        <>
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                        </>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mentors?.map((item: {
                        instructorDetails: {
                            _id: string;
                            profile?: { avatar?: string };
                            username: string;
                            email: string;
                        }
                    }) => (
                        <div onClick={() => {
                            router.push(`/instructors/${item.instructorDetails.username}`);
                        }} className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                            <div className="mb-8">
                                <img className="object-center object-cover rounded-full h-36 w-36" src={`${item.instructorDetails?.profile?.avatar || "/ui/empty-profile.webp"}`} alt="photo" />
                            </div>
                            <div className="text-center">
                                <p className="text-xl text-gray-700 font-bold mb-2">{item.instructorDetails.username}</p>
                                <p className="text-base text-gray-400 font-normal">{item.instructorDetails.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
