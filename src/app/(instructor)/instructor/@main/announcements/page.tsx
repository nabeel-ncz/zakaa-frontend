"use client";
import { TypeDispatch, TypeState } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { getAnnouncementsByInstructorIdAction } from "@/store/actions/announcements";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function page() {

    const router = useRouter();
    const announcements: any = useSelector((state: TypeState) => state.course?.instructorAnnouncements);
    const dispatch: TypeDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAction()).then((res) => {
            dispatch(getAnnouncementsByInstructorIdAction({
                instructorId: res.payload?.data?._id
            }));
        })
    }, []);

    return (
        <>
            <div className="w-full min-h-screen pt-4">
                <div className="px-4 flex items-end justify-end w-full">
                    <button
                        onClick={() => { router.push("announcements/create") }}
                        className="px-4 py-2 rounded border-[rgba(127,39,194,0.5)] border-2 bg-white font-medium"
                    >Create</button>
                </div>
                <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        {announcements?.map((item: {
                            _id: string;
                            title: string;
                            description: string;
                            content: string;
                            likes: string[];
                            dislikes: string[];
                            comments: any[];
                        }) => (
                            <div className="rounded overflow-hidden shadow-lg flex flex-col h-[360px]">
                                <div className="relative">
                                    <img className="w-full" src={item.content} />
                                    <div onClick={() => {
                                        router.push(`announcements/update/${item._id}`);
                                    }} className="cursor-pointer text-xs font-bold absolute top-0 right-0 rounded bg-white px-4 py-2 mt-3 mr-3 hover:bg-white transition duration-500 ease-in-out flex items-center justify-center gap-2">
                                        <span>{"Update"}</span>
                                    </div>
                                </div>
                                <div className="px-6 py-4 mb-auto">
                                    <h2 className="font-medium text-base line-clamp-1 hover:text-purple-800 transition duration-500 ease-in-out inline-block">Simplest
                                        {item.title}
                                    </h2>
                                    <h2 className="text-gray-500 text-sm line-clamp-2">
                                        {item.description}
                                    </h2>
                                </div>
                                <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                                    <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                        <div className="cursor-pointer flex gap-2 items-start justify-center">
                                            <img src={"/icons/like.png"} alt="" className="w-4" />
                                            <span>{item.likes?.length}</span>
                                        </div>
                                        <div className="cursor-pointer ml-5 flex gap-2 items-start justify-center">
                                            <img src={"/icons/dislike.png"} alt="" className="w-4" />
                                            <span>{item?.dislikes?.length}</span>
                                        </div>
                                    </span>
                                    <span className="cursor-pointer py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                        <img src="/icons/speech-bubble.png" alt="" className="w-4" />
                                        <span className="ml-1">{item?.comments?.length} Comments</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
