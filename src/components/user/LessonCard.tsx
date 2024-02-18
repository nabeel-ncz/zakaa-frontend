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
            <img src={image ? image : "https://i.pinimg.com/736x/08/7b/3a/087b3a4b4cf46d58bb1ed5c7b777cdf4.jpg"} alt="" className="w-11/12" />
            <div className="flex flex-col items-start justify-start w-11/12">
                <h2 className="mt-2 font-medium text-md text-wrap">Web development besics</h2>
                <p className="text-xs font-light line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, cumque fugit dolor provident exercitationem quaerat doloribus dicta voluptatibus aperiam</p>
            </div>
            {loading && (
                <div className="absolute inset-0 w-full h-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
                    <WobbleLoader />
                </div>
            )}
        </div>
    )
}
