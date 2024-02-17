"use client";
import { useState } from "react";

export default function FormTypeSelector({
    title,
    required,
    types,
    onChange
}: {
    title: string,
    types: string[],
    required: boolean,
    onChange: any
}) {

    const [state, setState] = useState(types[0] || "");

    const handleChange = (selected: string) => {
        setState(selected);
        onChange(selected);
    };

    return (
        <>
            <h2 className="mt-4 font-medium text-xs mb-1 primary-text">{title}{required && <span className="text-red-700">*</span>}</h2>
            <div className="flex gap-2">
                {types?.map((item: string) => (
                    <div
                        onClick={() => { handleChange(item) }}
                        className={`cursor-pointer w-1/2 h-12 bg-white rounded flex items-center justify-center border ${state === item && "border-gray-400"}`}
                    >
                        <span className="font-bold">{item}</span>
                    </div>
                ))}
            </div>
        </>
    )
}
