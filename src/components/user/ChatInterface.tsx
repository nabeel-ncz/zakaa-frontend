"use client";
import UserSearchInChat from "@/components/user/UserSearchInChat";
import { TypeDispatch } from "@/store";
import { fetchUserAction, getChatsByUserIdAction } from "@/store/actions";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SocketContext } from "../providers/SocketProvider";

export default function ChatInterface() {

    const { socket } = useContext(SocketContext)
    const dispatch: TypeDispatch = useDispatch();
    const [user, setUser] = useState<any>(null);
    const [messages, setMessages] = useState<any>([]);
    const [openUserSearch, setOpenUserSearch] = useState<boolean>(false);
    const [chats, setChats] = useState<any[] | null>(null);
    const [currChat, setCurrChat] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [requestedChats, setRequestedChats] = useState<any>([]);
    const [accepters, setAccepters] = useState<any>(null);
    const [formMessage, setFormMessage] = useState<string>("");
    const chatContainerRef: any = useRef();

    useEffect(() => {
        handleLoadChats();
    }, []);

    useEffect(() => {
        const handleMessage = (payload: any) => {
            setMessages((prev: any[]) => [...prev, payload]);
        };
        socket.on("recieve_message", handleMessage);
        return () => {
            socket.off("recieve_message", handleMessage);
        };
    }, [socket])

    const handleLoadChats = () => {
        dispatch(fetchUserAction()).then((res) => {
            if (res.payload?.success) {
                setUser(res.payload?.data);
                handleGetChats(res.payload?.data?._id);
            }
        });
    }

    const handleGetChats = (userId: string) => {
        dispatch(getChatsByUserIdAction({
            userId: userId
        })).then((res) => {
            if (res.payload?.success) {
                const chats1 = res.payload?.data?.filter((item: any) => {
                    return item.participants[0]?._id !== userId;
                }).map((item: any) => {
                    return {
                        ...item.participants[0],
                        chatId: item._id,
                        type: item.type,
                        status: item.status
                    };
                });

                const acc: any = [];

                const chats2 = res.payload?.data?.filter((item: any) => {
                    if (item.participants[1]?._id === userId) {
                        acc.push(item._id);
                    };
                    return item.participants[1]?._id !== userId;
                }).map((item: any) => {
                    return {
                        ...item.participants[1],
                        chatId: item._id,
                        type: item.type,
                        status: item.status
                    };
                });

                setAccepters(acc);
                const reqChats = [...chats1, ...chats2].filter((item) => item.status === "requested").map((item) => item?.chatId);
                setRequestedChats(reqChats);
                setChats([...chats1, ...chats2]);
            }
        }).finally(() => {
            setLoading(false)
        });
    }

    const scrollToBottomOfTheMessageContainer = () => {
        if (chatContainerRef?.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    const handleOpenChatRoom = (chat: any) => {
        setCurrChat(chat);
        handleJoinRoom(chat?.chatId);
        scrollToBottomOfTheMessageContainer();
    }

    const handleCloseSearch = () => {
        setOpenUserSearch(false);
    }

    const handleJoinRoom = (chatId: string) => {
        socket.emit("join_room", { chatId });
    }

    const handleSendMessage = (chatId: string, senderId: string) => {
        if(!formMessage.trim()) return;
        const payload = {
            content: formMessage,
            sender: senderId,
            chat: chatId,
            createdAt: Date.now()
        };
        socket.emit("send_message", payload);
        setMessages((prev: any[]) => [...prev, payload]);
        setFormMessage("");
    }

    return (
        <>
            {openUserSearch && (
                <UserSearchInChat closeSearch={handleCloseSearch} />
            )}
            <div className="w-full max-h-screen flex">
                <div className="w-3/12 h-full">
                    <div className="flex w-full items-center justify-between px-6 py-4 gap-4">
                        <div className="w-full flex items-center gap-2">
                            <h2 className="font-bold text-lg">Messages</h2>
                            <img src="/icons/down-arrow.png" alt="" className="w-4" />
                        </div>
                        <img onClick={() => {
                            setOpenUserSearch(true)
                        }} src="/icons/plus-button.png" alt="" className="w-6 h-6 cursor-pointer" />
                    </div>
                    <div className="flex w-full px-4">
                        <input placeholder="search message" type="text" className="text-sm font-light outline-none w-full px-4 py-2 rounded border border-gray-100" />
                    </div>
                    <div className="flex flex-col w-full items-start px-4 py-4 gap-4">
                        {loading && (
                            <div className="w-full flex flex-col items-center justify-center">
                                <img src="/ui/32.png" alt="" className="w-32" />
                            </div>
                        )}
                        {chats?.map((item) => (
                            <div key={item._id} onClick={() => {
                                handleOpenChatRoom(item);
                            }} className="cursor-pointer w-full flex items-start gap-2 p-2 rounded hover:bg-[#e7c7fd] transition-all delay-100">
                                <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                                <div className="flex flex-col items-start">
                                    <h1 className="text-sm font-medium line-clamp-1">{item.username}</h1>
                                    <h1 className="text-xs font-light line-clamp-1">{item.email}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-9/12 border-l border-gray-200 h-full bg-white flex flex-col items-start">
                    {currChat ? (
                        <>
                            <div className="w-full py-4 px-8 flex justify-between border-b">
                                <div className="flex gap-4">
                                    <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                                    <div className="flex flex-col items-start">
                                        <h2 className="text-sm font-medium">{currChat?.username}</h2>
                                        <h2 className="text-xs font-light">Online...</h2>
                                    </div>
                                </div>
                                <div className="">
                                    <button className="px-4 py-2 secondary-bg primary-text rounded font-medium text-sm">Call</button>
                                </div>
                            </div>
                            <div ref={chatContainerRef} className="relative w-full h-[31rem] overflow-y-scroll p-4">
                                {requestedChats?.includes(currChat?.chatId) && (
                                    <>
                                        <img src="/ui/186.png" alt="" className="h-80 absolute left-64" />
                                        <h2 className="font-bold text-lg absolute bottom-32 left-[26rem]">Chat requested !</h2>
                                        {accepters?.includes(currChat?.chatId) && (
                                            <button className="absolute bottom-20 left-[28rem] ext-sm font-medium text-white primary-bg rounded px-4 py-1">Accept</button>
                                        )}
                                    </>
                                )}
                                {messages?.map((item: any, index: number) => (
                                    <div key={index} className={`flex ${item.sender === user?._id ? "justify-end" : "justify-start"}`}>
                                        <div className={`${item.sender === user?._id ? "bg-[#e7c7fd]" : "secondary-bg"} rounded-xl w-fit max-w-96 px-6 py-2 mb-1`} style={{ wordWrap: "break-word" }}>
                                            <h2 className="font-medium text-sm">{item.content}</h2>
                                            <p className={`text-xs font-light ${item.sender === user?._id ? "text-end " : "text-start"}`}>{new Date(item.createdAt).toTimeString().split('GMT')[0]}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="h-16"></div>
                            </div>
                            <div className="w-full h-full py-4 px-8 flex">
                                <button className="px-4 h-[2.35rem] secondary-bg flex items-center justify-center rounded-tl rounded-bl">
                                    <img src="/icons/attached.png" alt="" className="w-5" />
                                </button>
                                <input
                                    onChange={(evt) => {
                                        setFormMessage(evt.target.value);
                                    }}
                                    onKeyDown={(evt) => {
                                        if (evt.key === 'Enter') {
                                            handleSendMessage(currChat?.chatId, user?._id);
                                        }
                                    }}
                                    value={formMessage} placeholder="Type a message..." type="text" className="text-sm text-light w-full px-4 py-2 outline-none border border-gray-300" />
                                <button
                                    onClick={() => { handleSendMessage(currChat?.chatId, user?._id) }}
                                    className="px-4 h-[2.35rem] primary-bg rounded-tr rounded-br text-white text-sm font-medium flex items-center justify-center">Send</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full flex flex-col items-center justify-normal">
                                <img src="/ui/80.png" alt="" className="w-[70%]" />
                                <h2 className="font-bold text-lg">Empty Chat !</h2>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}