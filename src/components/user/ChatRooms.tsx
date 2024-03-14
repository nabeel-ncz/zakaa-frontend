import { ChangeEvent } from "react";

export default function ChatRooms({
    setOpenUserSearch,
    hanldeChatsSearch,
    loading,
    filteredChats,
    handleOpenChatRoom,
    currChat
} : {
    setOpenUserSearch: any,
    hanldeChatsSearch: (evt: ChangeEvent<HTMLInputElement>) => void,
    loading: boolean,
    filteredChats: any[] | null,
    handleOpenChatRoom: (chat: any) => void,
    currChat: any
}) {
    return (
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
                <input onChange={hanldeChatsSearch} placeholder="search message" type="text" className="text-sm font-light outline-none w-full px-4 py-2 rounded border border-gray-100" />
            </div>
            <div className="flex flex-col w-full items-start px-4 py-4 gap-4">
                {loading && (
                    <div className="w-full flex flex-col items-center justify-center">
                        <img src="/ui/32.png" alt="" className="w-32" />
                    </div>
                )}
                {filteredChats?.map((item) => (
                    <div key={item._id} onClick={() => {
                        handleOpenChatRoom(item);
                    }} className={`${currChat?._id === item._id ? "bg-[#e7c7fd]" : ""} cursor-pointer w-full flex items-start gap-2 p-2 rounded hover:bg-[#e7c7fd] transition-all delay-100`}>
                        <img src={`${item?.profile?.avatar ? item?.profile?.avatar : "/ui/empty-profile.webp"}`} alt="" className="w-10 h-10 rounded-xl" />
                        <div className="flex flex-col items-start">
                            <h1 className="text-sm font-medium line-clamp-1">{item.username}</h1>
                            <h1 className="text-xs font-light line-clamp-1">{item.email}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
