"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TypeDispatch, TypeState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "@/store/actions";
import Skeleton from "../ui/Skeleton";
import NavLink from "../common/NavLink";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);
    const dispatch: TypeDispatch = useDispatch();
    const user: any = useSelector((state: TypeState) => state.user.data);

    useEffect(() => {
        dispatch(fetchUserAction()).then((res) => {
            if (!res.payload?.success) {
                router.replace("/auth/login");
            }
            else if (!res.payload?.data?.isVerified) {
                router.replace("/auth/verify");
            }
            else if (res.payload?.data?.role !== "admin") {
                router.replace("/");
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className={`${open ? "flex" : "hidden"} flex-col w-64`}>
                <div className="flex items-center justify-start ps-8 h-[5.3rem] bg-white border-b">
                    <span className="text-white text-2xl font-bold primary-text">Admin</span>
                </div>
                <div className="flex-1 overflow-y-auto border-r secondary-bg">
                    <nav className="flex flex-col gap-4 flex-1 px-4 py-4">
                        <NavLink href="/admin">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg shadow">
                                <img src="/svgs/home.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Overview</span>
                            </div>
                        </NavLink>
                        <NavLink href="/admin/courses">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/book-open.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Courses</span>
                            </div>
                        </NavLink>
                        <NavLink href="/admin/assessments">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/pie-chart.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Assessments</span>
                            </div>
                        </NavLink>
                        <NavLink href="/admin/categories">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/bar-chart-2.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Categories</span>
                            </div>
                        </NavLink>
                        <NavLink href="/admin/transactions">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/message-circle.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Transactions</span>
                            </div>
                        </NavLink>
                        <NavLink href="/admin/applications">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/book-open.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Applications</span>
                            </div>
                        </NavLink>
                        <NavLink href="/admin/settings">
                            <div className="pl-6 py-4 flex items-center justify-start gap-4 bg-white rounded-lg">
                                <img src="/svgs/settings.svg" alt="" className="w-5 opacity-80" />
                                <span className="mt-1 font-medium text-sm">Settings</span>
                            </div>
                        </NavLink>
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
                                        {loading ? (
                                            <>
                                                <Skeleton width="44px" height="44px" />
                                                <div className="flex flex-col gap-2">
                                                    <Skeleton width="80px" height="18px" />
                                                    <Skeleton width="40px" height="14px" />
                                                </div>
                                            </>

                                        ) : (
                                            <>
                                                <img src={`${user?.profile?.avatar ? user?.profile?.avatar : "/ui/empty-profile.webp"}`} className="w-12 rounded-xl" />
                                                <div className="flex flex-col items-start h-full bg-white">
                                                    <h2 className="font-semibold text-sm">{user.username}</h2>
                                                    <h6 className="font-light text-xs">{user.role}</h6>
                                                </div>
                                            </>
                                        )}
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
                <div className="secondary-light-bg h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}