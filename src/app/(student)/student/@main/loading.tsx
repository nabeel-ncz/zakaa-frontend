export default function Loading() {
    return (
        <div className="border border-gray-200 p-4">
            <div className="animate-pulse space-y-2">
                <div className="bg-gray-200 h-48"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-200 full"></div>
                    <div className="h-6 bg-gray-200 w-2/3"></div>
                </div>
            </div>
        </div>
    )
}