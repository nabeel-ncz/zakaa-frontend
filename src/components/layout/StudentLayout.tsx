"use client";
import { useState } from "react";
import Link from "next/link";

export default function StudentLayout({
    children
}: {
    children: React.ReactNode
}) {

    const [open, setOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`${open ? "flex" : "hidden"} flex-col w-64`}>
                <div className="flex items-center justify-start ps-8 h-[5.3rem] bg-white border-b">
                    <span className="text-white text-2xl font-bold primary-text">Student</span>
                </div>
                <div className="flex-1 overflow-y-auto border-r secondary-bg">
                    <nav className="flex flex-col gap-4 flex-1 px-4 py-4">
                        <Link href="/student">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg shadow">
                                <img src="/svgs/home.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Overview</span>
                            </div>
                        </Link>
                        <Link href="/student/enrollments">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/book-open.svg" alt="" className="w-5 opacity-50" />
                                <span className="mt-1 font-medium text-sm opacity-50">Enrollments</span>
                            </div>
                        </Link>
                        <Link href="/student/exams">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/pie-chart.svg" alt="" className="w-5 opacity-50" />
                                <span className="mt-1 font-medium text-sm opacity-50">Exams</span>
                            </div>
                        </Link>
                        <Link href="/student/chat">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/message-circle.svg" alt="" className="w-5 opacity-50" />
                                <span className="mt-1 font-medium text-sm opacity-50">Messages</span>
                            </div>
                        </Link>
                        <Link href="/student/settings">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/settings.svg" alt="" className="w-5 opacity-50" />
                                <span className="mt-1 font-medium text-sm opacity-50">Settings</span>
                            </div>
                        </Link>
                    </nav>
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto">
                <div className="flex items-center justify-between h-24 bg-white border-b">
                    <div className="flex w-full items-center gap-96 ps-6">
                        <div className="flex gap-4">
                            <button onClick={() => {
                                setOpen((state) => !state);
                            }} className="focus:outline-none secondary-light-bg px-4 rounded-lg">
                                <img src="/svgs/menu.svg" alt="" />
                            </button>

                            <div className="secondary-light-bg flex items-center justify-center gap-12 px-4 rounded-lg">
                                <input className="bg-transparent outline-none py-3.5 px-8 text-sm" type="text" placeholder="Search Anything..." />
                                <img src="/icons/search-icon.png" alt="" className="w-6" />
                            </div>
                        </div>

                        <nav className="contents">
                            <ul className="flex items-center gap-10">
                                <li className="p-2 rounded cursor-pointer">
                                    <div className="flex items-center justify-between gap-4">
                                        <Link href={"/signup"}>
                                            <img src="/icons/profile-logo.png" className="w-12" />
                                        </Link>
                                        <div className="flex flex-col items-start h-full bg-white">
                                            <h2 className="font-semibold text-sm">Behzadi Pashei</h2>
                                            <h6 className="font-light text-xs">UI UX designer</h6>
                                        </div>
                                    </div>
                                </li>
                                <li className="">
                                    <Link href={""}>
                                        <img src="/icons/notification.png" className="w-12" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
                <div className="p-4 secondary-light-bg h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}