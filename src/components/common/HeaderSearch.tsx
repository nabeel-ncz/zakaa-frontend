import React from 'react'

export default function HeaderSearch({
    pathname,
    searchQuery,
    handleSearch
}: {
    pathname: string;
    searchQuery: string;
    handleSearch:(evt: any) => void;
}) {
    return (
        <div className="ml-8 secondary-light-bg items-center justify-center gap-12 px-4 rounded lg:flex md:hidden hidden">
            {pathname === "/courses" ? (
                <input defaultValue={searchQuery || ""} onChange={handleSearch} name="search" className="bg-transparent outline-none py-3.5 px-8 text-sm" type="text" placeholder="Search Anything..." />
            ) : (
                <form action="" onSubmit={handleSearch}>
                    <input name="search" className="bg-transparent outline-none py-3.5 px-8 text-sm" type="text" placeholder="Search Anything..." />
                </form>
            )}
            <img src="/icons/search-icon.png" alt="" className="w-6" />
        </div>
    )
}
