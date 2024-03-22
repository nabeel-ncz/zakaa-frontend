"use client";
import Header from "@/components/common/Header";
import Footer from "@/components/home/Footer";
import MentorSectionCardLoading from "@/components/home/MentorSectionCardLoading";
import { TypeDispatch } from "@/store";
import { getInstructorsAction } from "@/store/actions/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function page() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [mentors, setMentors] = useState<any>(null);

    useEffect(() => {
        dispatch(getInstructorsAction({})).then((res) => {
            if (res.payload?.success) setMentors(res.payload?.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Header />
            <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                {(!loading && (!mentors || mentors?.length === 0)) && (
                    <div className="w-full pt-6 flex flex-col gap-2 items-center justify-center">
                        <h2 className="font-bold text-xl pb-6">Unfortunately, there are no instructors available!</h2>
                        <img src="/icons/not-found.png" alt="" className="h-80" />
                    </div>
                )}
                {loading && (
                    <div className="flex flex-wrap -mx-4">
                        <>
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                            <MentorSectionCardLoading />
                        </>
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
                        _id: string;
                        profile?: { avatar?: string };
                        username: string;
                        email: string;
                    }) => (
                        <div onClick={() => {
                            router.push(`/instructors/${item.username}`);
                        }} className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                            <div className="mb-8">
                                <img className="object-center object-cover rounded-full h-36 w-36" src={`${item.profile?.avatar || "/ui/empty-profile.webp"}`} alt="photo" />
                            </div>
                            <div className="text-center">
                                <p className="text-xl text-gray-700 font-bold mb-2">{item.username}</p>
                                <p className="text-base text-gray-400 font-normal">{item.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
