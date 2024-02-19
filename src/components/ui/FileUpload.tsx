"use client";
import { useState, useRef } from "react";

export default function FileUpload(
    {
        onChange
    }: {
        onChange: (file: any) => void;
    }
) {

    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [showClearButton, setShowClearButton] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<any>(null);

    const handleDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
        if (file.type?.startsWith("application/pdf")) {
            onChange(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file.type?.startsWith("application/pdf")) {
            onChange(file);
        }
    };

    const handleClearFile = () => {
        setSelectedFile(null);
        onChange(null);
    };

    return (
        <>
            {selectedFile ? (
                <>
                    <div
                        className="w-full relative h-56 flex items-center justify-center secondary-bg border border-gray-400 border-dashed rounded-md"
                        onMouseEnter={() => setShowClearButton(true)}
                        onMouseLeave={() => setShowClearButton(false)}
                    >

                        {selectedFile.type.startsWith("application/pdf") ? (
                             <iframe src={URL.createObjectURL(selectedFile)} title="PDF Viewer" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
                        ) : (
                            <h2>Unsuppoarted file format!</h2>
                        )}
                       
                        {showClearButton && (
                            <button
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded"
                                onClick={handleClearFile}
                            >
                                Clear
                            </button>
                        )}

                    </div>
                </>
            ) : (
                <>
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`${isDragging ? "secondary-bg" : "bg-white"} w-full h-40 flex flex-col gap-2 items-center justify-center border border-gray-400 border-dashed rounded-md`}>
                        <img src="/icons/upload-file.png" alt="" className="w-12 opacity-20" />
                        <h1 className="font-medium text-xs opacity-30">Drag and drop an pdf here, or click to upload</h1>
                        <button
                            type="button"
                            className="bg-zinc-200 text-sm font-semibold py-2 px-4 rounded"
                            onClick={handleButtonClick}
                        >
                            Upload Document
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="application/pdf"
                            className="hidden"
                        />
                    </div>
                </>
            )}
        </>
    )
}