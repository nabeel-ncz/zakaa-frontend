"use client";
import { TypeDispatch } from "@/store";
import { reactAnnouncementAction } from "@/store/actions/announcements";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function AnnouncementCard({
    user,
    instructor,
    _id,
    title,
    description,
    likes,
    dislikes,
    comments,
    content,
    handleCommentOpen
}: {
    user: any;
    instructor: any;
    _id: string;
    title: string;
    description: string;
    likes: any[];
    dislikes: any[];
    comments: any[];
    content: string;
    handleCommentOpen: (data: {_id: string; comments: any[]}) => void;
}) {

    const dispatch: TypeDispatch = useDispatch();
    const [isLikeHover, setIsLikeHover] = useState<boolean>(false);
    const [isDisLikeHover, setIsDisLikeHover] = useState<boolean>(false);
    const [likesCopy, setLikesCopy] = useState<string[]>(likes);
    const [disLikesCopy, setDisLikesCopy] = useState<string[]>(dislikes);

    const handleLikeAnnoucement = async () => {
        if(!user){
            toast.error("Please create an account", { position: "top-right" });
            return;
        }
        const res = await dispatch(reactAnnouncementAction({
            _id,
            type: "like",
            userRef: user?._id
        }));
        if (res.payload?.success) {
            setLikesCopy(res.payload?.data?.likes);
            setDisLikesCopy(res.payload?.data?.dislikes);
        }
    }

    const handleDisLikeAnnoucement = async () => {
        if(!user){
            toast.error("Please create an account", { position: "top-right" });
            return;
        }
        const res = await dispatch(reactAnnouncementAction({
            _id,
            type: "dislike",
            userRef: user?._id
        }));
        if (res.payload?.success) {
            setLikesCopy(res.payload?.data?.likes);
            setDisLikesCopy(res.payload?.data?.dislikes);
        }
    }

    return (
        <div className="rounded overflow-hidden shadow-lg flex flex-col h-[360px]">
            <div className="relative">
                <img className="w-full"
                    src={content} />
                <div
                    className="text-xs font-bold absolute top-0 right-0 rounded bg-white px-4 py-2 mt-3 mr-3 hover:bg-white transition duration-500 ease-in-out flex items-center justify-center gap-2">
                    <img src={instructor?.profile?.avatar ? instructor?.profile?.avatar : "/ui/empty-profile.webp"} alt="" className="w-4 h-4"/>
                    <span>{instructor?.username}</span>
                </div>
            </div>
            <div className="px-6 py-4 mb-auto">
                <h2 className="font-medium text-base line-clamp-1 hover:text-purple-800 transition duration-500 ease-in-out inline-block">Simplest
                    {title}
                </h2>
                <h2 className="text-gray-500 text-sm line-clamp-2">
                    {description}
                </h2>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <div className="cursor-pointer flex gap-2 items-start justify-center">
                        <img src={likesCopy?.includes(user?._id) ? "/icons/like-fill.png" : (isLikeHover ? "/icons/like-fill.png" : "/icons/like.png")} alt="" className="w-4"
                            onClick={handleLikeAnnoucement}
                            onMouseEnter={() => {
                                setIsLikeHover(true);
                            }}
                            onMouseLeave={() => {
                                setIsLikeHover(false);
                            }} />
                        <span>{likesCopy?.length}</span>
                    </div>
                    <div className="cursor-pointer ml-5 flex gap-2 items-start justify-center">
                        <img src={disLikesCopy?.includes(user?._id) ? "/icons/dislike-fill.png" : (isDisLikeHover ? "/icons/dislike-fill.png" : "/icons/dislike.png")} alt="" className="w-4"
                            onClick={handleDisLikeAnnoucement}
                            onMouseEnter={() => {
                                setIsDisLikeHover(true);
                            }}
                            onMouseLeave={() => {
                                setIsDisLikeHover(false);
                            }} />
                        <span>{disLikesCopy?.length}</span>
                    </div>
                </span>
                <span onClick={() => {
                    handleCommentOpen({
                        _id: _id,
                        comments: comments
                    })
                }} className="cursor-pointer py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                    <img src="/icons/speech-bubble.png" alt="" className="w-4" />
                    <span className="ml-1">{comments?.length} Comments</span>
                </span>
            </div>
        </div>
    )
}
