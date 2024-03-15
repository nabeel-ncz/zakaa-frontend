"use client";
import Header from "@/components/common/Header";
import AnnouncementCard from "@/components/ui/AnnouncementCard";
import { TypeDispatch, TypeState } from "@/store";
import { fetchUserAction } from "@/store/actions";
import { commentAnnoucementAction, getAnnouncementsAction } from "@/store/actions/announcements";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function page() {

    const dispatch: TypeDispatch = useDispatch();
    const announcements: any = useSelector((state: TypeState) => state.course?.announcements);
    const user: any = useSelector((state: TypeState) => state.user?.data);
    const [commentOpen, setCommentOpen] = useState<{ _id: string; comments: any[]; } | null>(null);
    const [comment, setComment] = useState<string>("");

    useEffect(() => {
        dispatch(fetchUserAction());
        dispatch(getAnnouncementsAction());
    }, []);

    const handleCommentOpen = (data: {
        _id: string;
        comments: any[];
    }) => {
        setCommentOpen(data);
    }

    const handleCommentPost = async () => {

        if (!user) {
            toast.error("Please create an account", { position: "top-right" });
            return;
        }

        if (!comment) {
            return;
        }
        const res = await dispatch(commentAnnoucementAction({
            _id: commentOpen?._id,
            comment: comment,
            userRef: user?._id
        }))

        if (res.payload?.success) {
            setCommentOpen((prevState) => {
                if (!prevState) return null;
                return { ...prevState, comments: res.payload?.data?.comments };
            });
            setComment("");
        }
    }

    return (
        <>
            <Header />
            <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                {commentOpen && (
                    <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000020] backdrop-blur-sm">
                        <div
                            onClick={() => { setCommentOpen(null); }}
                            className="cursor-pointer absolute top-[23%] right-[35%] px-4 py-1 rounded border border-gray-400">
                            <span className="font-bold text-xs">close</span>
                        </div>
                        <div className="px-12 py-12 w-1/3 bg-white flex flex-col items-center justify-center rounded-md gap-2">
                            <div className="w-full flex items-center justify-start gap-2">
                                <img src="/icons/speech-bubble.png" alt="" className="w-4" />
                                <span className="ml-1">{commentOpen?.comments?.length} Comments</span>
                            </div>
                            <div className="mt-4 w-full flex flex-col items-start justify-start overflow-y-scroll h-64 gap-4">
                                {commentOpen?.comments?.map((item: any) => (
                                    <div className="w-full flex gap-4 items-center justify-start">
                                        <img src={item?.userRef?.profile?.avatar ? item?.userRef?.profile?.avatar : "/ui/empty-profile.webp"} alt="" className="w-6 h-6 rounded-full" />
                                        <div className="flex flex-col items-start">
                                            <h2 className="font-semibold text-xs">{item?.userRef?.username}</h2>
                                            <h2 className="font-normal text-xs">{item?.comment}</h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <input
                                    onChange={(evt) => { setComment(evt.target.value) }}
                                    placeholder="Type here..."
                                    type="text"
                                    className="w-full font-normal text-xs px-4 py-2 rounded outline-none border border-gray-300" />
                                <button onClick={handleCommentPost} className="px-4 text-xs font-semibold bg-purple-800 rounded text-white h-[33px]">Send</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {announcements?.map((item: any) => (
                        <AnnouncementCard
                            handleCommentOpen={handleCommentOpen}
                            _id={item._id}
                            content={item.content}
                            user={user}
                            title={item.title}
                            description={item.description}
                            likes={item.likes}
                            dislikes={item.dislikes}
                            comments={item.comments}
                            instructor={item.userRef}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
