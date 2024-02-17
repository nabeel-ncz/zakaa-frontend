"use client"
import CourseFormField from "@/components/ui/CourseFormField";
import FormTypeSelector from "@/components/ui/FormTypeSelector";
import ImageUpload from "@/components/ui/ImageUpload";
import VideoUpload from "@/components/ui/VideoUpload";

export default function CreateCourse() {
    return (
        <>
            
            <div className="w-full px-10 flex items-end justify-end">
                <div>
                    <button className="bg-white px-6 py-2 rounded opacity-60 me-4">Prev</button>
                    <button className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Next</button>
                </div>
            </div>

            <div className="w-full px-10 py-4 flex gap-12">
                <div className="w-7/12">
                    <h2 className="font-medium text-xs mb-1 primary-text">Course thumbnail <span className="text-red-700">*</span></h2>

                    <ImageUpload onChange={(file: any) => { console.log(file) }} />

                    <CourseFormField
                        style={['mt-4']}
                        title="Course title"
                        fieldName="courseTitle"
                        fieldType="text"
                        required
                    />
                    <CourseFormField
                        style={['mt-4']}
                        title="Course title"
                        fieldName="courseTitle"
                        fieldType="text"
                        required
                    />
                    <CourseFormField
                        style={['mt-4']}
                        title="Course description"
                        fieldName="courseDescription"
                        fieldType="textarea"
                        required
                    />

                    <CourseFormField
                        style={['mt-4']}
                        title="Number of lessons"
                        fieldName="numberOfLessons"
                        fieldType="number"
                        required
                    />

                </div>
                <div className="w-5/12">

                    <FormTypeSelector
                        title="Pricing"
                        types={["free", "paid"]}
                        onChange={(item: string) => console.log(item)}
                        required
                    />

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Trial video <span className="text-red-700"></span></h2>
                    <VideoUpload onChange={(file: any) => { console.log(file) }} />

                    <CourseFormField
                        style={['mt-4']}
                        title="Video title"
                        fieldName="videoTitle"
                        fieldType="text"
                    />

                    <CourseFormField
                        style={['mt-4']}
                        title="Video description"
                        fieldName="videoDescription"
                        fieldType="textarea"
                    />

                </div>
            </div>            
        </>
    )
}