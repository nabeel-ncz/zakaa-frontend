import Skeleton from '../ui/Skeleton'

export default function MentorSectionCardLoading() {
    return (
        <div className="w-full md:w-1/3 lg:w-1/4 px-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-10 pb-6">
                <div className='w-full h-32 bg-gray-100 rounded flex items-center justify-center'>
                    <div className='w-24 h-24 bg-gray-300 rounded-full animate-pulse'>

                    </div>
                </div>
                <div className="px-1 text-center">
                    <div className="w-full mt-6 flex flex-col gap-1 items-center justify-center">
                        <Skeleton width={"90%"} height={"14px"} />
                        <Skeleton width={"70%"} height={"14px"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
