import LessonCard from "@/components/user/LessonCard";

export default function CourseCreationFinish() {
    return (
        <div className="w-full px-10 py-4 flex flex-wrap gap-5">
            <LessonCard title="" description="" loading={true} />
            <LessonCard title="" description="" loading={false} />
            <LessonCard title="" description="" loading={false} />
        </div>
    )
}
