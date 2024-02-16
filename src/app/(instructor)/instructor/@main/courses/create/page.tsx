"use client"
import BanterLoader from "@/components/ui/BanterLoader";
import FileUpload from "@/components/ui/FileUpload";
import ImageUpload from "@/components/ui/ImageUpload";
import VideoUpload from "@/components/ui/VideoUpload";
import WobbleLoader from "@/components/ui/WobbleLoader";

export default function CreateCourse() {
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

            {/* <div className="w-full px-10 py-4 flex gap-12">
                <div className="w-7/12">
                    <h2 className="font-medium text-xs mb-1 primary-text">Course thumbnail <span className="text-red-700">*</span></h2>
                    <ImageUpload onChange={(file: any) => { console.log(file) }} />

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Course title <span className="text-red-700">*</span></h2>
                    <input type="text" className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white" />

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Description <span className="text-red-700">*</span></h2>
                    <input type="text" className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white" />

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Category <span className="text-red-700">*</span></h2>
                    <input type="text" className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white" />

                </div>
                <div className="w-5/12">
                    
                    <h2 className="font-medium text-xs mb-1 primary-text">No of Lessons <span className="text-red-700">*</span></h2>
                    <input type="text" className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white" />
                    
                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Pricing <span className="text-red-700">*</span></h2>

                    <div className="flex gap-2">
                        <div className="w-1/2 h-12 bg-white rounded flex items-center justify-center border">
                            <span className="font-bold">Free</span>
                        </div>
                        <div className="w-1/2 h-12 bg-white rounded flex items-center justify-center border border-gray-400">
                            <span className="font-bold">Paid</span>
                        </div>
                    </div>

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Trial video <span className="text-red-700"></span></h2>
                    <VideoUpload onChange={(file: any) => { console.log(file) }} />

                </div>
            </div> */}

            {/* <div className="w-full px-10 py-4 flex gap-12">
                <div className="w-6/12">


                    <h2 className="font-medium text-xs mb-1 primary-text">Lesson Resource <span className="text-red-700">*</span></h2>
                    <VideoUpload onChange={(file: any) => { console.log(file) }} />

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Lesson title <span className="text-red-700">*</span></h2>
                    <input type="text" className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white" />

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Lesson description <span className="text-red-700">*</span></h2>
                    <textarea className="w-full px-8 py-3 h-36 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white" />

                </div>
                <div className="w-6/12">

                    <h2 className="font-medium text-xs mb-1 primary-text">Lesson thumbnail <span className="text-red-700">*</span></h2>
                    <ImageUpload onChange={(file: any) => { console.log(file) }} />

                    <h2 className="mt-4 font-medium text-xs mb-1 primary-text">Lesson Attachments</h2>
                    <FileUpload onChange={(file: any) => { console.log(file) }} />

                </div>
            </div> */}

            <div className="w-full px-10 py-4 flex flex-wrap gap-5">
                <div className="w-[17rem] relative bg-white h-64 shadow-md rounded-md overflow-hidden flex flex-col items-center justify-center">
                    <img src="https://i.pinimg.com/736x/08/7b/3a/087b3a4b4cf46d58bb1ed5c7b777cdf4.jpg" alt="" className="w-11/12" />
                    <div className="flex flex-col items-start justify-start w-11/12">
                        <h2 className="mt-2 font-medium text-md text-wrap">Web development besics</h2>
                        <p className="text-xs font-light line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, cumque fugit dolor provident exercitationem quaerat doloribus dicta voluptatibus aperiam</p>
                    </div>
                    <div className="absolute inset-0 w-full h-full bg-white/5 backdrop-blur-sm flex items-center justify-center">
                        <WobbleLoader />
                    </div>
                </div>
                
            </div>
        </>
    )
}