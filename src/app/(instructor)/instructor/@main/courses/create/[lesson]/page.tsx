"use client";
import CourseFormField from "@/components/ui/CourseFormField";
import FileUpload from "@/components/ui/FileUpload"
import ImageUpload from "@/components/ui/ImageUpload"
import VideoUpload from "@/components/ui/VideoUpload"

export default function CreateLesson() {
    return (
        <>
            <div className="w-full px-10 flex items-end justify-between">
                <div>
                    <h2 className="font-bold">Lesson 1</h2>
                </div>
                <div>
                    <button className="bg-white px-6 py-2 rounded opacity-60 me-4">Prev</button>
                    <button className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Next</button>
                </div>
            </div>
            <div className="w-full px-10 py-4 flex gap-12">
                <div className="w-6/12">


                    <h2 className="font-medium text-xs mb-1 primary-text">Lesson Resource <span className="text-red-700">*</span></h2>
                    <VideoUpload onChange={(file: any) => { console.log(file) }} />

                    <CourseFormField
                        style={['mt-4']}
                        title="Lesson title"
                        fieldName="lessonTitle"
                        fieldType="text"
                        required
                    />
                    <CourseFormField
                        style={['mt-4']}
                        title="Lesson description"
                        fieldName="lessonDescription"
                        fieldType="textarea"
                        required
                    />

                </div>
                <div className="w-6/12">

                    <h2 className="font-medium text-xs mb-1 primary-text">Lesson thumbnail <span className="text-red-700">*</span></h2>
                    <ImageUpload onChange={(file: any) => { console.log(file) }} />

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Lesson Attachments</h2>
                    <FileUpload onChange={(file: any) => { console.log(file) }} />

                    <CourseFormField
                        style={['mt-4']}
                        title="Attachment title"
                        fieldName="attachmentTitle"
                        fieldType="text"
                        required
                    />
                </div>
            </div>
        </>
    )
}
