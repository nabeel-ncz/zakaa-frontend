"use client";
import UserSearchInChat from "@/components/user/UserSearchInChat";
import { TypeDispatch } from "@/store";
import { createMessageAction, fetchUserAction, getChatsByUserIdAction, getMessagesByChatIdAction, updateChatAction } from "@/store/actions";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { SocketContext } from "../providers/SocketProvider";
import LoaderSm from "../ui/LoaderSm";
import Loading from "../ui/Loading";
import ChatFileUpload from "./ChatFileUpload";
import ChatRooms from "./ChatRooms";

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
    const [chatAcceptLoading, setChatAcceptLoading] = useState<boolean>(false);
    const [openChatLoading, setOpenChatLoading] = useState<boolean>(false);
    const [fileUploadOpen, setFileUploadOpen] = useState<boolean>(false);
    const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false);
    const [filteredChats, setFilteredChats] = useState<any[] | null>(null);
    const [currChatUserStatus, setCurrChatUserStatus] = useState<string>("offline");

    useEffect(() => {
        handleLoadChats();
    }, []);

    useEffect(() => {
        const handleMessage = (payload: any) => {
            setMessages((prev: any[]) => [...prev, payload]);
        };
        const handleGetUserStatus = (payload: { status: string }) => {
            setCurrChatUserStatus(payload?.status);
        };
        socket.on("recieve_message", handleMessage);
        socket.on("user_status", handleGetUserStatus);
        return () => {
            socket.off("recieve_message", handleMessage);
            socket.off("user_status", handleGetUserStatus);
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
                        status: item.status,
                        groupName: item.groupName,
                        groupDescription: item.groupDescription
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
                        status: item.status,
                        groupName: item.groupName,
                        groupDescription: item.groupDescription
                    };
                });

                setAccepters(acc);
                const reqChats = [...chats1, ...chats2].filter((item) => item.status === "requested").map((item) => item?.chatId);
                setRequestedChats(reqChats);
                setChats([...chats1, ...chats2]);
                setFilteredChats([...chats1, ...chats2])
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
        setOpenChatLoading(true);
        setCurrChat(chat);
        handleJoinRoom(chat?.chatId, chat?._id);
        dispatch(getMessagesByChatIdAction({ chatId: chat?.chatId })).then((res) => {
            if (res.payload?.success) {
                setMessages(res.payload?.data);
            }
        }).finally(() => {
            scrollToBottomOfTheMessageContainer();
            setOpenChatLoading(false);
        })
    }

    const handleCloseSearch = () => {
        setOpenUserSearch(false);
    }

    const handleJoinRoom = (chatId: string, recieverId: string) => {
        socket.emit("join_room", { chat: chatId, user: recieverId });
    }

    const handleSendMessage = (chatId: string, senderId: string) => {
        if (!formMessage.trim()) return;
        const payload = {
            content: formMessage,
            sender: senderId,
            chat: chatId,
            contentType: 'text',
            createdAt: Date.now()
        };
        socket.emit("send_message", payload);
        dispatch(createMessageAction({
            ...payload,
            contentType: 'text',
            recieverSeen: false
        }));
        setMessages((prev: any[]) => [...prev, payload]);
        setFormMessage("");
        scrollToBottomOfTheMessageContainer();
    };

    const handleSendFileMessage = (chatId: string, senderId: string, url: string, contentType: string) => {
        const payload = {
            content: url,
            sender: senderId,
            chat: chatId,
            contentType: contentType,
            createdAt: Date.now()
        };
        socket.emit("send_message", payload);
        dispatch(createMessageAction({
            ...payload,
            contentType: contentType,
            recieverSeen: false
        }));
        setMessages((prev: any[]) => [...prev, payload]);
        setFormMessage("");
    }

    const handleAcceptMessage = () => {
        setChatAcceptLoading(true);
        dispatch(updateChatAction({
            _id: currChat?.chatId,
            status: "active",
            type: currChat?.type,
            groupName: currChat?.groupName,
            groupDescription: currChat?.groupDescription
        })).finally(() => {
            handleLoadChats();
            setChatAcceptLoading(false);
        })
    }

    const handleUploadMessage = async (evt: ChangeEvent<HTMLInputElement>, contentType: string) => {
        try {
            setFileUploadLoading(true);
            const file: File | null = evt.target.files![0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "ml_default");

            const type = (contentType === "image" || contentType === "file") ? "image" : "video";
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/${type}/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            handleSendFileMessage(
                currChat?.chatId,
                user?._id,
                data?.secure_url,
                contentType
            );
        } catch (error) {
            console.log(error);
        } finally {
            setFileUploadLoading(false);
            setFileUploadOpen(false);
        }
    }

    const hanldeChatsSearch = (evt: ChangeEvent<HTMLInputElement>) => {
        const search = evt.target.value;
        if (!search) {
            setFilteredChats(chats);
            return
        }
        const filtered = chats?.filter((item) => item.username.toLowerCase().includes(search.toLowerCase()));
        setFilteredChats(filtered!);
    }

    return (
        <>
            {openUserSearch && (
                <UserSearchInChat closeSearch={handleCloseSearch} />
            )}
            <div className="w-full max-h-screen flex">
                {/* chat rooms listing */}
                <ChatRooms
                    setOpenUserSearch={setOpenUserSearch}
                    handleOpenChatRoom={handleOpenChatRoom}
                    currChat={currChat}
                    filteredChats={filteredChats}
                    hanldeChatsSearch={hanldeChatsSearch}
                    loading={loading}
                />
                {/* chat-container */}
                <div className="w-9/12 border-l border-gray-200 h-full bg-white flex flex-col items-start">
                    {currChat ? (
                        <>
                            <div className="w-full py-4 px-8 flex justify-between border-b">
                                <div className="flex gap-4">
                                    <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                                    <div className="flex flex-col items-start">
                                        <h2 className="text-sm font-medium">{currChat?.username}</h2>
                                        <h2 className="text-xs font-light">{currChatUserStatus}{currChatUserStatus == "online" ? (<span className="inline-block w-2 h-2 bg-green-500 animate-pulse rounded-full ms-1"></span>) : (<span className="inline-block w-2 h-2 bg-red-500 animate-pulse rounded-full ms-1"></span>)}</h2>
                                    </div>
                                </div>
                                <div className="">
                                    <button className="px-4 py-2 secondary-bg primary-text rounded font-medium text-sm">Call</button>
                                </div>
                            </div>
                            {/* messages container */}
                            <div ref={chatContainerRef} className="relative w-full h-[31rem] overflow-y-scroll p-4">
                                {requestedChats?.includes(currChat?.chatId) ? (
                                    <>
                                        <img src="/ui/186.png" alt="" className="h-80 absolute left-64" />
                                        <h2 className="font-bold text-lg absolute bottom-32 left-[26rem]">Chat requested !</h2>
                                        {accepters?.includes(currChat?.chatId) && (
                                            <>
                                                {chatAcceptLoading ? (
                                                    <button
                                                        className="absolute bottom-20 left-[28rem] ext-sm font-medium text-white primary-bg rounded px-4 py-1"
                                                    >
                                                        <LoaderSm />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handleAcceptMessage}
                                                        className="absolute bottom-20 left-[28rem] ext-sm font-medium text-white primary-bg rounded px-4 py-1"
                                                    >Accept</button>
                                                )}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {openChatLoading && (
                                            <Loading />
                                        )}
                                        {messages?.map((item: any, index: number) => (
                                            <div key={index} className={`flex ${item.sender === user?._id ? "justify-end" : "justify-start"}`}>
                                                <div className={`${item.sender === user?._id ? "bg-[#e7c7fd]" : "secondary-bg"} rounded-xl w-fit max-w-96 px-6 py-2 mb-1`} style={{ wordWrap: "break-word" }}>
                                                    {item.contentType === "text" && (
                                                        <h2 className="font-medium text-sm">{item.content}</h2>
                                                    )}
                                                    {item.contentType === "image" && (
                                                        <img src={`${item.content}`} alt="" className="w-64" />
                                                    )}
                                                    {item.contentType === "video" && (
                                                        <video className="aspect-w-16 aspect-h-9" controls>
                                                            <source src={`${item.content}`} />
                                                        </video>
                                                    )}
                                                    {item.contentType === "audio" && (
                                                        <div className="w-[18.5rem]">
                                                            <audio controls>
                                                                <source src={`${item.content}`} />
                                                            </audio>
                                                        </div>
                                                    )}
                                                    {item.contentType === "file" && (
                                                        <div className="w-64">
                                                            <embed src={`${item.content}`} type="application/pdf" width="100%" height="300px" />
                                                        </div>
                                                    )}
                                                    <p className={`mt-2 text-xs font-light ${item.sender === user?._id ? "text-end " : "text-start"}`}>{new Date(item.createdAt).toTimeString().split('GMT')[0]}</p>

                                                </div>
                                            </div>
                                        ))}
                                        {fileUploadLoading && (
                                            <div className="w-full flex items-center justify-end">
                                                <div className="relative w-fit p-4 bg-[#e7c7fd] rounded-md overflow-hidden">
                                                    <img src={`/ui/sample-thumb.png`} alt="" className="w-64 filter blur-sm" />
                                                    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] backdrop-blur animate-pulse"></div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                                <div className="h-16"></div>
                            </div>
                            <div className="relative w-full h-full py-4 px-8 flex">
                                {/* chat file upload option */}
                                <ChatFileUpload
                                    fileUploadOpen={fileUploadOpen}
                                    handleUploadMessage={handleUploadMessage}
                                />
                                {/* -------------- */}

                                <button onClick={() => {
                                    setFileUploadOpen(prev => !prev);
                                }} className="px-4 h-[2.35rem] secondary-bg flex items-center justify-center rounded-tl rounded-bl">
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