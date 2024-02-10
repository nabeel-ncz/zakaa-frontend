export default function AuthLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div className="min-h-screen text-gray-900 flex justify-center px-12 md:px-24 mt-12">
            <div className="lg:w-1/2 xl:w-6/12 sm:p-6">
                <div className="flex flex-col items-center">
                    <div className="w-full flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}