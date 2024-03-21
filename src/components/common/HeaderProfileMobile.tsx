import Link from "next/link";
import Skeleton from "../ui/Skeleton";

export default function HeaderProfileMobile({
    user,
    loading
}: {
    user: any;
    loading: boolean;
}) {
    return (
        <>
            <li className="w-full rounded cursor-pointer block sm:hidden pr-4">
                <div className="flex items-center justify-between gap-4">
                    <Link href={`${user ? "/" + user.role + "/" : "/auth/login"}`}>
                        {(loading && !user) && <Skeleton width="44px" height="44px" />}
                        {user && <img src={`${user?.profile?.avatar ? user?.profile?.avatar : "/ui/empty-profile.webp"}`} className="w-12 rounded-xl" />}
                    </Link>
                    <div className="w-full flex flex-col items-start h-full bg-white">
                        {user ? (
                            <>
                                <h2 className="font-semibold text-sm">{user?.username}</h2>
                                <h6 className="font-light text-xs">{user?.role}</h6>
                            </>
                        ) : (
                            <>
                                {(loading) ? (
                                    <div className="flex flex-col gap-2">
                                        <Skeleton width="80px" height="18px" />
                                        <Skeleton width="40px" height="14px" />
                                    </div>
                                ) : (
                                    <div className="rounded secondary-bg py-3.5 w-full flex items-center justify-center">
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
        </>
    )
}
