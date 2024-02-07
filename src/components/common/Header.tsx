"use client"
import Link from "next/link";

export default function Header() {

    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-24 pt-6 pb-4 flex items-center justify-center">
                <div className="mr-auto flex-shrink-0">
                    <img className="h-6 mb-1" src="icons/zakaa-logo.png" alt="" />
                </div>
                <nav className="contents">
                    <ul className="flex items-center gap-2">
                        <li className="rounded secondary-bg py-3.5 px-4">
                            <Link href={""}>
                                <h2 className="primary-text font-bold text-sm">Home</h2>
                            </Link>
                        </li>
                        <li className="rounded secondary-light-bg py-3.5 px-4">
                            <Link href={""}>
                                <h2 className="primary-text font-bold text-sm">Courses</h2>
                            </Link>
                        </li>
                        <li className="rounded secondary-light-bg py-3.5 px-4">
                            <Link href={""}>
                                <h2 className="primary-text font-bold text-sm">Teach</h2>
                            </Link>
                        </li>
                        <li className="rounded secondary-light-bg py-3.5 px-4">
                            <Link href={""}>
                                <h2 className="primary-text font-bold text-sm">Contact us</h2>
                            </Link>
                        </li>
                        <li className="rounded secondary-light-bg py-3.5 px-4">
                            <Link href={""}>
                                <h2 className="primary-text font-bold text-sm">About us</h2>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* Menu for Large Screens */}
                <div className="ml-8 secondary-light-bg flex items-center justify-center gap-12 px-4 rounded">
                    <input className="bg-transparent outline-none py-3.5 px-8 text-sm" type="text" placeholder="Search Anything..." />
                    <img src="icons/search-icon.png" alt="" className="w-6" />
                </div>
                {/* User Navigation */}
                <nav className="contents">
                    <ul className="flex items-center gap-10">
                        {/* User Profile */}
                        <li className="p-2 rounded">
                            <div className="flex items-center justify-between gap-4">
                                <Link href={""}>
                                    <img src="icons/profile-logo.png" className="w-12" />
                                </Link>
                                <div className="flex flex-col items-start h-full bg-white">
                                    <h2 className="font-semibold text-sm">Behzadi Pashei</h2>
                                    <h6 className="font-light text-xs">UI UX designer</h6>
                                </div>
                            </div>
                        </li>
                        {/* Notification */}
                        <li className="">
                            <Link href={""}>
                                <img src="icons/notification.png" className="w-12" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}