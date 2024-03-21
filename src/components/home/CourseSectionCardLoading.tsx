import Skeleton from '../ui/Skeleton'

export default function CourseSectionCardLoading() {
    return (
        <div className="w-full md:w-1/3 lg:w-1/4 px-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-10 pb-6">
                <Skeleton width={"100%"} height={"162px"} />
                <div className="px-1 text-center">

                    <div className="w-full mt-6 flex flex-col gap-1 items-center justify-center">
                        <Skeleton width={"90%"} height={"14px"} />
                        <Skeleton width={"70%"} height={"14px"} />
                    </div>
                    <div className="w-full mt-6 flex flex-col gap-1 items-center justify-center">
                        <Skeleton width={"90%"} height={"7px"} />
                        <Skeleton width={"90%"} height={"7px"} />
                        <Skeleton width={"70%"} height={"7px"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
