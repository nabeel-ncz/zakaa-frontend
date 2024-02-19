export default function AssessmentQuestion({ params }: any) {
    const { question } = params;
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
                        <h2 className="font-bold text-2xl">Question <span className="primary-text">No : {question} </span> ?</h2>
                        <h2 className="font-light text-lg">Optimize Question Quality for Effective Evaluation!</h2>
                    </div>

                    <div className="mt-8">
                        <h2 className="mt-4 font-medium text-xs mb-1 ">Question <span className="text-red-700">*</span></h2>
                        <input
                            name={"name"}
                            type="text"
                            placeholder="Write your question"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        />

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Option 1 <span className="text-red-700">*</span></h2>
                        <input
                            name={"name"}
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        />

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Option 2 <span className="text-red-700">*</span></h2>
                        <input
                            name={"name"}
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        />

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Option 3 <span className="text-red-700">*</span></h2>
                        <input
                            name={"name"}
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        />

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Option 4 <span className="text-red-700">*</span></h2>
                        <input
                            name={"name"}
                            type="text"
                            placeholder="Write your answer"
                            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-400 text-xs focus:outline-none border-gray-400 bg-white"
                        />

                        <h2 className="mt-4 font-medium text-xs mb-1 ">Answer <span className="text-red-700">*</span></h2>
                        <select
                            name={"name"}
                            className="w-full h-12 rounded-lg font-medium border px-4 text-xs focus:outline-none border-gray-400 bg-white"
                        >
                            <option>Select the correct answer</option>
                            <option value={"option_1"}>Option 1</option>
                            <option value={"option_2"}>Option 2</option>
                            <option value={"option_3"}>Option 3</option>
                            <option value={"option_4"}>Option 4</option>
                        </select>
                    </div>
                </div>
            </div>
        </>

    )
}
