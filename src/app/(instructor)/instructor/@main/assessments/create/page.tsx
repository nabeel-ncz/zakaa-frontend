export default function AssessmentCreation() {
    return (
        <>
            <div className="relative w-full px-10 flex items-end justify-end">
                <div>
                    <button className="bg-white px-6 py-2 rounded opacity-60 me-4">Prev</button>
                    <button className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Next</button>
                </div>
            </div>
            <div className="w-full px-80 py-4 flex items-center">
                <div className="w-full flex flex-col">

                    <div className="absolute top-[86px] mt-4">
                        <h2 className="font-bold text-2xl">Craft Your <span className="primary-text">Assessment </span> ?</h2>
                        <h2 className="font-light text-lg">Personalize Your Assessment Structure!</h2>
                    </div>

                    <div className="mt-8">
                        <h2 className="font-medium text-xs mb-1 ">Select your course <span className="text-red-700">*</span></h2>
                        <select
                            name={"name"}
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        >
                            <option>select your course</option>
                        </select>

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Select lesson <span className="text-red-700">*</span></h2>
                        <select
                            name={"name"}
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        >
                            <option>select your course</option>
                        </select>

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Total number of questions <span className="text-red-700">*</span></h2>
                        <input
                            name={"name"}
                            type="number"
                            placeholder="Total questions"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        />

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Score for each question <span className="text-red-700">*</span></h2>
                        <input
                            name={"name"}
                            type="number"
                            placeholder="Score for each question"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        />

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Pass mark <span className="text-red-700">*</span></h2>
                        <input
                            name={"name"}
                            type="number"
                            placeholder="Pass mark"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        />
                    </div>
                </div>
            </div>
        </>

    )
}
