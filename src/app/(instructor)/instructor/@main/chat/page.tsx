export default function Chat() {
    return (
        <>
            <div className="w-full max-h-screen flex">
                <div className="w-3/12 h-full">
                    <div className="flex w-full items-center justify-between px-6 py-4 gap-4">
                        <div className="w-full flex items-center gap-2">
                            <h2 className="font-bold text-lg">Messages</h2>
                            <img src="/icons/down-arrow.png" alt="" className="w-4" />
                        </div>
                        <img src="/icons/plus-button.png" alt="" className="w-6 h-6 cursor-pointer" />
                    </div>
                    <div className="flex w-full px-4">
                        <input placeholder="search message" type="text" className="text-sm font-light outline-none w-full px-4 py-2 rounded border border-gray-100" />
                    </div>
                    <div className="flex flex-col w-full items-start px-4 py-4 gap-4">
                        <div className="cursor-pointer w-full flex items-start gap-2 p-2 rounded">
                            <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                            <div className="flex flex-col items-start">
                                <h1 className="text-sm font-medium line-clamp-1">Jame sckei</h1>
                                <h1 className="text-xs font-light line-clamp-1">hey man, how!🔥</h1>
                            </div>
                        </div>
                        <div className="w-full flex items-start gap-2 p-2 rounded secondary-bg">
                            <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                            <div className="flex flex-col items-start">
                                <h1 className="text-sm font-medium line-clamp-1">Jame sckei</h1>
                                <h1 className="text-xs font-light line-clamp-1">hey man, how!🔥</h1>
                            </div>
                        </div>
                        <div className="w-full flex items-start gap-2 p-2 rounded">
                            <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                            <div className="flex flex-col items-start">
                                <h1 className="text-sm font-medium line-clamp-1">Jame sckei</h1>
                                <h1 className="text-xs font-light line-clamp-1">hey man, how!🔥</h1>
                            </div>
                        </div>
                        <div className="w-full flex items-start gap-2 p-2 rounded">
                            <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                            <div className="flex flex-col items-start">
                                <h1 className="text-sm font-medium line-clamp-1">Jame sckei</h1>
                                <h1 className="text-xs font-light line-clamp-1">hey man, how!🔥</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-9/12 border-l border-gray-200 h-full bg-white flex flex-col items-start">
                    <div className="w-full py-4 px-8 flex justify-between border-b">
                        <div className="flex gap-4">
                            <img src="/icons/profile-copy-2.png" alt="" className="w-10 h-10" />
                            <div className="flex flex-col items-start">
                                <h2 className="text-sm font-medium">Jame sckei</h2>
                                <h2 className="text-xs font-light">Online...</h2>
                            </div>
                        </div>
                        <div className="">
                            <button className="px-4 py-2 secondary-bg primary-text rounded font-medium text-sm">Call</button>
                        </div>
                    </div>
                    <div className="relative w-full h-[31rem] overflow-y-scroll p-4">
                        <div className="flex justify-start">
                            <div className="secondary-bg rounded-xl w-fit px-6 py-1 mb-1">
                                <h2 className="font-medium text-sm">hellow guyz</h2>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="secondary-bg rounded-xl w-fit px-6 py-1 mb-1">
                                <h2 className="font-medium text-sm">hellow guyz dfsdfs sfs</h2>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-[#e7c7fd] rounded-xl w-fit px-6 py-1 mb-1">
                                <h2 className="font-medium text-sm">hellow guyz dfsdfs sfs</h2>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-[#e7c7fd] rounded-xl w-fit px-6 py-1 mb-1">
                                <h2 className="font-medium text-sm">hellow guy sdfsf sdfsz</h2>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="bg-[#e7c7fd] rounded-xl w-fit px-6 py-1 mb-1">
                                <h2 className="font-medium text-sm">hellow guyz</h2>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="secondary-bg rounded-xl w-fit px-6 py-1 mb-1">
                                <h2 className="font-medium text-sm">hellow guy sdfsf sdfsz</h2>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full py-4 px-8 flex">
                        <button className="px-4 h-[2.35rem] secondary-bg flex items-center justify-center rounded-tl rounded-bl">
                            <img src="/icons/attached.png" alt="" className="w-5" />
                        </button>
                        <input placeholder="Type a message..." type="text" className="text-sm text-light w-full px-4 py-2 outline-none border border-gray-300" />
                        <button className="px-4 h-[2.35rem] primary-bg rounded-tr rounded-br text-white text-sm font-medium flex items-center justify-center">Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}