import WobbleLoader from "../ui/WobbleLoader";

export default function LessonCard({
    image,
    title,
    description,
    loading
}: {
    image?: string,
    title: string,
    description: string,
    loading: boolean
}) {
    return (
        <div className="w-[17rem] relative bg-white h-64 shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
            <img crossOrigin="anonymous" src={image} alt="" className="w-11/12 h-36" />
            <div className="flex flex-col items-start justify-start w-11/12">
                <h2 className="mt-2 font-medium text-md text-wrap">{title}</h2>
                <p className="text-xs font-light line-clamp-2">{description}</p>
            </div>
            {loading && (
                <div className="absolute inset-0 w-full h-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
                    <WobbleLoader />
                </div>
            )}
        </div>
    )
}
