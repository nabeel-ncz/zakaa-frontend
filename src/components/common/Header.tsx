"use client"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { TypeDispatch, TypeState } from "@/store"
import { fetchUserAction } from "@/store/actions";
import { useEffect, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";
import HeaderLink from "./HeaderLink";

export default function Header() {

    const [loading, setLoading] = useState(true);
    const user: any = useSelector((state: TypeState) => state.user.data);
    const dispatch: TypeDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAction())
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-24 pt-6 pb-4 flex items-center justify-center">
                <div className="mr-auto flex-shrink-0">
                    <img className="h-6 mb-1" src="icons/zakaa-logo.png" alt="" />
                </div>
                <nav className="contents">
                    <ul className="flex items-center gap-2">
                        <HeaderLink href={"/"}>
                            <h2 className="primary-text font-bold text-sm">Home</h2>
                        </HeaderLink>
                        <HeaderLink href={"/courses"}>
                            <h2 className="primary-text font-bold text-sm">Courses</h2>
                        </HeaderLink>
                        <HeaderLink href={"/teach"}>
                            <h2 className="primary-text font-bold text-sm">Teach</h2>
                        </HeaderLink>
                        <HeaderLink href={"/contact"}>
                            <h2 className="primary-text font-bold text-sm">Contact</h2>
                        </HeaderLink>
                        <HeaderLink href={"/about"}>
                            <h2 className="primary-text font-bold text-sm">About</h2>
                        </HeaderLink>
                    </ul>
                </nav>
                {/* Menu for Large Screens */}
                <div className="ml-8 secondary-light-bg flex items-center justify-center gap-12 px-4 rounded">
                    <input className="bg-transparent outline-none py-3.5 px-8 text-sm" type="text" placeholder="Search Anything..." />
                    <img src="icons/search-icon.png" alt="" className="w-6" />
                </div>
                {/* User Navigation */}
                <nav className="contents">
                    <ul className="flex items-center gap-4">
                        {/* User Profile */}
                        <li className="p-2 rounded cursor-pointer">
                            <div className="flex items-center justify-between gap-4">
                                <Link href={`${user ? "/" + user.role + "/" : "/auth/login"}`}>
                                    {loading && <Skeleton width="44px" height="44px" />}
                                    {user && <img src="icons/profile-logo.png" className="w-12" />}
                                </Link>
                                <div className="flex flex-col items-start h-full bg-white">
                                    {user ? (
                                        <>
                                            <h2 className="font-semibold text-sm">{user?.username}</h2>
                                            <h6 className="font-light text-xs">{user?.role}</h6>
                                        </>
                                    ) : (
                                        <>
                                            {loading ? (
                                                <div className="flex flex-col gap-2">
                                                    <Skeleton width="80px" height="18px" />
                                                    <Skeleton width="40px" height="14px" />
                                                </div>
                                            ) : (
                                                <div className="rounded secondary-bg py-3.5 px-[34px]">
                                                    <Link href={"/auth/login"}>
                                                        <h2 className="primary-text font-bold text-sm">Login</h2>
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    )}

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