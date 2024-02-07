export default function HeroSearch() {
    return (
        <>
            <div className="w-full py-20 flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-extrabold text-2xl">
                        Search among <span className="primary-text">58340</span> courses and
                    </h2>
                    <h2 className="font-extrabold text-2xl">
                        find your favorite course
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center px-2 py-1 secondary-bg rounded">
                        <div className="flex items-center justify-between gap-4">
                            <button className="px-4 py-2 rounded primary-bg text-xs font-normal text-white">categories</button>
                            <input placeholder="Search anything..." type="text" className="text-sm outline-none min-w-96 bg-transparent" />
                        </div>
                    </div>
                    <span className="bg-white text-xs font-medium">Or view the following courses...</span>
                </div>

            </div>
        </>
    )
}