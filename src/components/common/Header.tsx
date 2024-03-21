"use client"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { TypeDispatch, TypeState } from "@/store"
import { fetchUserAction } from "@/store/actions";
import { useEffect, useState } from "react";
import Skeleton from "@/components/ui/Skeleton";
import HeaderLink from "./HeaderLink";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import HeaderSearch from "./HeaderSearch";
import HeaderSearchMobile from "./HeaderSearchMobile";
import HeaderProfile from "./HeaderProfile";
import HeaderProfileMobile from "./HeaderProfileMobile";
import NavLink from "./NavLink";

export default function Header() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const user: any = useSelector((state: TypeState) => state.user.data);
    const [loading, setLoading] = useState(true);
    const dispatch: TypeDispatch = useDispatch();
    const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserAction()).finally(() => {
                setLoading(false);
            })
        }
    }, []);

    const handleSearch = (evt: any) => {
        evt.preventDefault();
        if (pathname === "/courses") {
            const { name, value } = evt.target;
            router.push(`/courses?${name}=${value}`);
            return;
        }
        const { name, value } = evt.target.search;
        router.push(`/courses?${name}=${value}`);
    };

    const toggleMobileNav = () => {
        setMobileNavOpen((state) => !state);
    }

    const closeMobileNav = () => {
        setMobileNavOpen(false);
    }

    return (
        <>
            <header className="bg-white border-b">
                <div className="container mx-auto px-8 sm:px-24 pt-6 pb-4 flex items-center justify-center">
                    <div className="mr-auto flex-shrink-0">
                        <img className="h-6 mb-1" src="/icons/zakaa-logo.png" alt="" />
                    </div>
                    <nav className="contents">
                        <ul className="items-center gap-2 hidden xl:hidden 2xl:flex">
                            <HeaderLink href={"/"}>
                                <h2 className="primary-text font-bold text-sm">Home</h2>
                            </HeaderLink>
                            <HeaderLink href={"/courses"}>
                                <h2 className="primary-text font-bold text-sm">Courses</h2>
                            </HeaderLink>
                            <HeaderLink href={"/teach"}>
                                <h2 className="primary-text font-bold text-sm">Teach</h2>
                            </HeaderLink>
                            <HeaderLink href={"/announcements"}>
                                <h2 className="primary-text font-bold text-sm">Announcements</h2>
                            </HeaderLink>
                            <HeaderLink href={"/instructors"}>
                                <h2 className="primary-text font-bold text-sm">Instructors</h2>
                            </HeaderLink>
                        </ul>
                    </nav>
                    {/* Menu for Large Screens */}
                    <HeaderSearch
                        pathname={pathname}
                        handleSearch={handleSearch}
                        searchQuery={searchParams.get('search') || ""}
                    />

                    {/* User Navigation */}
                    <nav className="contents">
                        <ul className="flex items-center gap-4">
                            {/* User Profile */}
                            <HeaderProfile
                                user={user}
                                loading={loading}
                            />
                            {/* Notification */}
                            <li className="">
                                <Link href={""}>
                                    <img src="/icons/notification.png" className="w-12" />
                                </Link>
                            </li>
                            <li onClick={toggleMobileNav} className="bg-[#f5e6ff] cursor-pointer px-3.5 py-3.5 rounded-lg block 2xl:hidden">
                                <img src="/icons/menu.png" className="w-5 opacity-60" />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className={`fixed z-50 top-0 ${mobileNavOpen ? "left-0" : "-left-[18rem]"} transition-all h-screen max-h-screen flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 w-full max-w-[17rem] p-4 shadow-xl shadow-blue-gray-900/5`}>
                <div className="mb-2 p-4">
                    <img className="h-6 mb-1" src="/icons/zakaa-logo.png" alt="" />
                </div>
                <HeaderSearchMobile
                    pathname={pathname}
                    handleSearch={handleSearch}
                    searchQuery={searchParams.get('search') || ""}
                />
                <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
                    <NavLink href={"/"} >
                        <div onClick={closeMobileNav} role="button" className="flex items-center w-full p-3 rounded-lg text-start font-semibold leading-tight transition-all hover:bg-[#F5E6FF] bg-purple-50 hover:text-purple-900">
                            Home
                        </div>
                    </NavLink>
                    <NavLink href={"/courses"} >
                        <div onClick={closeMobileNav} role="button" className="flex items-center w-full p-3 rounded-lg text-start font-semibold leading-tight transition-all hover:bg-[#F5E6FF] bg-purple-50 hover:text-purple-900">
                            Courses
                        </div>
                    </NavLink>
                    <NavLink href={"/teach"} >
                        <div onClick={closeMobileNav} role="button" className="flex items-center w-full p-3 rounded-lg text-start font-semibold leading-tight transition-all hover:bg-[#F5E6FF] bg-purple-50 hover:text-purple-900">
                            Teach
                        </div>
                    </NavLink>
                    <NavLink href={"/announcements"} >
                        <div onClick={closeMobileNav} role="button" className="flex items-center w-full p-3 rounded-lg text-start font-semibold leading-tight transition-all hover:bg-[#F5E6FF] bg-purple-50 hover:text-purple-900">
                            Announcement
                        </div>
                    </NavLink>
                    <NavLink href={"/instructors"} >
                        <div onClick={closeMobileNav} role="button" className="flex items-center w-full p-3 rounded-lg text-start font-semibold leading-tight transition-all hover:bg-[#F5E6FF] bg-purple-50 hover:text-purple-900">
                            Instructors
                        </div>
                    </NavLink>
                </nav>
                <HeaderProfileMobile
                    user={user}
                    loading={loading}
                />
            </div>
        </>
    )
}