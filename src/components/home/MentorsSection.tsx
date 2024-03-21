"use client";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useEffect, useState } from "react";
import MentorSectionCardLoading from "./MentorSectionCardLoading";


export default function MentorsSection() {

    const [loading, setLoading] = useState<boolean>(true);
    const [mentors, setMentors] = useState<any>(null);

    useEffect(() => {

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
                        username: string;
                        profession: string;
                    }) => {
                        <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
                            <div className="mb-8">
                                <img className="object-center object-cover rounded-full h-36 w-36" src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" alt="photo" />
                            </div>
                            <div className="text-center">
                                <p className="text-xl text-gray-700 font-bold mb-2">Dany Bailey</p>
                                <p className="text-base text-gray-400 font-normal">Software Engineer</p>
                            </div>
                        </div>
                    })}
                </div>
                {/* {mentors?.map((item) => {
                        <>
                            <div className="w-full md:w-1/3 lg:w-1/4 px-4">
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
                                                className="mt-2 font-semibold text-base xl:text-xl mb-4 line-clamp-2"
                                            >
                                                50+ Best creative website themes & templates
                                            </a>
                                        </h3>
                                        <p className="text-xs leading-relaxed mb-2 line-clamp-2">
                                            Lorem ipsum dolor sit amet pretium consectetur adipiscing
                                            elit. Lorem consectetur adipiscing elit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    })} */}
            </div>
        </section>
    )
}
