"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Skeleton from "../ui/Skeleton";
import { TypeDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { getUsersByUsernameAction } from "@/store/actions/user";
import { createChatAction, fetchUserAction, getChatsByUserIdAction } from "@/store/actions";
import toast from "react-hot-toast";

export default function UserSearchInChat(
    {
        closeSearch
    }: {
        closeSearch: () => void;
    }
) {

    const dispatch: TypeDispatch = useDispatch();
    const [typing, setTyping] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [users, setUsers] = useState<any[] | null>(null);
    const [currUser, setCurrUser] = useState<any>(null);
    const [chats, setChats] = useState<any[] | null>(null);
    const [createdChats, setCreatedChats] = useState<any[] | null>(null);
    const [sendRequestLoading, setSendRequestLoading] = useState<any>(null)

    useEffect(() => {
        handleChatsFetch();
    }, []);

    const handleChatsFetch = () => {
        dispatch(fetchUserAction()).then((res) => {
            if (res.payload?.success) {
                setCurrUser(res.payload?.data);
                dispatch(getChatsByUserIdAction({
                    userId: res.payload?.data?._id
                })).then((res) => {
                    setChats(res.payload?.data);
                    const individualChats = res.payload?.data?.filter((item: any) => {
                        return item.type === "individual";
                    });
                    const alreadyCreateChatsAccepted = individualChats?.map((item: any) => {
                        return item.participants[1]
                    });
                    const alreadyCreatedChatsRequested = individualChats?.map((item: any) => {
                        return item.participants[0]
                    }).reduce((arr: string[], curr: string) => {
                        if (!arr.includes(curr)) {
                            arr.push(curr);
                            return arr;
                        }
                        return arr;
                    }, []);
                    setCreatedChats([...alreadyCreateChatsAccepted, ...alreadyCreatedChatsRequested]);
                });
            }
        });
    }

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!typing) {
            setTyping(true);
        }
        setSearch(event.target.value);
    }

    const handleSearch = () => {
        if (!search.trim()) {
            return;
        }
        setTyping(false);
        dispatch(getUsersByUsernameAction({
            username: search
        })).then((res) => {
            if (res.payload?.success) {
                setUsers(res.payload?.data);
            }
        })
    }

    const handleSendRequest = (userId: string) => {
        setSendRequestLoading(userId)
        dispatch(fetchUserAction()).then((res) => {
            if (res.payload?.success) {
                const sender = res.payload?.data;
                dispatch(createChatAction({
                    participants: [sender?._id, userId],
                    type: "individual",
                    status: "requested"
                })).finally(() => {
                    handleChatsFetch();
                    handleSearch();
                    setSendRequestLoading(null);
                })
            }
        })
    };

    return (
        <div className="z-50 w-full min-h-screen fixed top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] backdrop-blur-sm">
            <div className="w-2/4 h-2/3 bg-white rounded p-8">
                <div className="w-full pb-8 pt-2 flex items-center justify-center">
                    <input
                        onChange={handleSearchChange}
                        type="text"
                        className="w-full py-3 ps-4 outline-none border border-gray-300 rounded-tl rounded-bl text-xs font-medium"
                        placeholder="Type here..." />
                    <button
                        onClick={handleSearch}
                        className="w-fit px-4 h-[41px] flex items-center justify-center bg-black rounded-tr rounded-tb text-white font-medium text-sm"
                    >Search</button>
                    
                    <img onClick={closeSearch} src="/icons/close-icon.png" alt="" className="ms-2 w-8 h-8 cursor-pointer" />
                </div>

                {typing && (
                    <>
                        <div className="cursor-pointer w-full flex items-center justify-between p-2 rounded">
                            <div className="flex items-start gap-2">
                                <Skeleton width={"40px"} height={"40px"} />
                                <div className="flex flex-col h-full items-start justify-center mt-1 gap-1">
                                    <Skeleton width={"120px"} height={"14px"} />
                                    <Skeleton width={"120px"} height={"10px"} />
                                </div>
                            </div>
                            <Skeleton width={"130px"} height={"26px"} />
                        </div>
                        <div className="cursor-pointer w-full flex items-center justify-between p-2 rounded">
                            <div className="flex items-start gap-2">
                                <Skeleton width={"40px"} height={"40px"} />
                                <div className="flex flex-col h-full items-start justify-center mt-1 gap-1">
                                    <Skeleton width={"120px"} height={"14px"} />
                                    <Skeleton width={"120px"} height={"10px"} />
                                </div>
                            </div>
                            <Skeleton width={"130px"} height={"26px"} />
                        </div>
                        <div className="cursor-pointer w-full flex items-center justify-between p-2 rounded">
                            <div className="flex items-start gap-2">
                                <Skeleton width={"40px"} height={"40px"} />
                                <div className="flex flex-col h-full items-start justify-center mt-1 gap-1">
                                    <Skeleton width={"120px"} height={"14px"} />
                                    <Skeleton width={"120px"} height={"10px"} />
                                </div>
                            </div>
                            <Skeleton width={"130px"} height={"26px"} />
                        </div>
                        <div className="cursor-pointer w-full flex items-center justify-between p-2 rounded">
                            <div className="flex items-start gap-2">
                                <Skeleton width={"40px"} height={"40px"} />
                                <div className="flex flex-col h-full items-start justify-center mt-1 gap-1">
                                    <Skeleton width={"120px"} height={"14px"} />
                                    <Skeleton width={"120px"} height={"10px"} />
                                </div>
                            </div>
                            <Skeleton width={"130px"} height={"26px"} />
                        </div>

                    </>
                )}
                {!typing && (
                    <>
                        {currUser && users?.filter((item) => item?._id !== currUser?._id)?.length === 0 && (
                            <h2 className="font-medium text-sm mt-4">
                                {!search.trim() ? (
                                    <span>Search is empty!</span>
                                ) : (
                                    <span>Users doesn't exist with this "{search}" username!</span>
                                )}
                            </h2>
                        )}

                        {currUser && users?.filter((item) => item?._id !== currUser?._id).map((item) => (
                            <div className="cursor-pointer w-full flex items-center justify-between p-2 rounded">
                                <div className="flex items-start gap-2">
                                    <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                                    <div className="flex flex-col items-start">
                                        <h1 className="text-sm font-medium line-clamp-1">{item.username}</h1>
                                        <h1 className="text-xs font-light line-clamp-1">{item.email}</h1>
                                    </div>
                                </div>
                                {createdChats?.includes(item._id) ? (
                                    <button
                                        onClick={() => { toast("You are already requested for the chat!", { position: "top-right" }) }}
                                        className="font-medium text-sm px-4 py-1 rounded border border-gray-300">
                                        Requested
                                    </button>
                                ) : (
                                    <>
                                        {(sendRequestLoading && sendRequestLoading === item._id) ? (
                                            <Skeleton width={"130px"} height={"26px"} />
                                        ) : (
                                            <button onClick={() => {
                                                handleSendRequest(item?._id)
                                            }} className="font-medium text-sm px-4 py-1 rounded border border-gray-300">
                                                Send Request
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
