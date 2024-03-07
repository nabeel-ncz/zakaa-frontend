import { ChangeEvent, useRef } from "react";

export default function ChatFileUpload({
    fileUploadOpen,
    handleUploadMessage
}: {
    fileUploadOpen: boolean,
    handleUploadMessage: (evt: ChangeEvent<HTMLInputElement>, contentType: string) => void;
}) {

    const audioInputRef: any = useRef();
    const videoInputRef: any = useRef();
    const imageInputRef: any = useRef();
    const docsInputRef: any = useRef();

    return (
        <>
            {fileUploadOpen && (
                <div className="absolute w-80 h-[5.5rem] bg-white rounded-md shadow-xl top-[-5.5rem]">
                    <div className="w-full flex items-center justify-center gap-2">
                        <div onClick={() => {
                            audioInputRef.current.click();
                        }} className="p-4 flex flex-col items-center w-16 gap-2 cursor-pointer">
                            <img src="/icons/mic.png" alt="" className="object-fill" />
                            <h2 className="text-xs font-light">Audio</h2>
                            <input onChange={(evt) => {
                                handleUploadMessage(evt, "audio")
                            }} type="file" accept="audio/*" ref={audioInputRef} hidden />
                        </div>
                        <div onClick={() => {
                            imageInputRef.current.click();
                        }} className="p-4 flex flex-col items-center w-16 gap-2 cursor-pointer">
                            <img src="/icons/image.png" alt="" className="object-fill" />
                            <h2 className="text-xs font-light">Image</h2>
                            <input onChange={(evt) => {
                                handleUploadMessage(evt, "image")
                            }} type="file" accept="image/*" ref={imageInputRef} hidden />
                        </div>
                        <div onClick={() => {
                            videoInputRef.current.click();
                        }} className="p-4 flex flex-col items-center w-16 gap-2 cursor-pointer">
                            <img src="/icons/multimedia.png" alt="" className="object-fill" />
                            <h2 className="text-xs font-light">Video</h2>
                            <input onChange={(evt) => {
                                handleUploadMessage(evt, "video")
                            }} type="file" accept="video/*" ref={videoInputRef} hidden />
                        </div>
                        <div onClick={() => {
                            docsInputRef.current.click();
                        }} className="p-4 flex flex-col items-center w-16 gap-2 cursor-pointer">
                            <img src="/icons/pdf-file-format.png" alt="" className="object-fill" />
                            <h2 className="text-xs font-light">Docs</h2>
                            <input onChange={(evt) => {
                                handleUploadMessage(evt, "file")
                            }} type="file" accept=".pdf" ref={docsInputRef} hidden />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
