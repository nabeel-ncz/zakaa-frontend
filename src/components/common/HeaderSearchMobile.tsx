import React from 'react'

export default function HeaderSearchMobile({
    pathname,
    searchQuery,
    handleSearch
}: {
    pathname: string;
    searchQuery: string;
    handleSearch:(evt: any) => void;
}) {
    return (
        <div className="bg-purple-50 items-center justify-center rounded lg:hidden md:flex flex mx-2">
            {pathname === "/courses" ? (
                <input defaultValue={searchQuery || ""} onChange={handleSearch} name="search" className="bg-transparent outline-none py-3.5 text-sm max-w-40" type="text" placeholder="Search..." />
            ) : (
                <form action="" onSubmit={handleSearch}>
                    <input name="search" className="bg-transparent outline-none py-3.5 text-sm max-w-40" type="text" placeholder="Search..." />
                </form>
            )}
            <img src="/icons/search-icon.png" alt="" className="w-6" />
        </div>
    )
}
