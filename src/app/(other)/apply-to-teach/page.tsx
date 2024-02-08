import Link from "next/link";

export default function ApplyToTeach() {
    return (
        <>
            <div className="min-h-screen text-gray-900 flex justify-center px-12 md:px-24 mt-12">
                <div className="lg:w-1/2 xl:w-6/12 sm:p-12">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1">
                            <div className="mx-auto max-w-sm my-auto">
                                <h2 className="font-bold text-2xl">Become an <span className="primary-text">Instructor </span> ?</h2>
                                <h2 className="font-light text-lg">Provide some basic information about yourself!</h2>
                                <div className="flex flex-col items-center mt-6 gap-4">
                                    <select name="" id="" className="custom-form-input">
                                        <option value="">Choose profession</option>
                                        <option value="Musician">Musician</option>
                                        <option value="Software developer">Software developer</option>
                                        <option value="Teacher">Teacher</option>
                                    </select>
                                    <input placeholder={`Phone`} className="custom-form-input" type={`text`} />
                                    <textarea className="custom-form-input" placeholder="Profile description"></textarea>
                                    <input placeholder={`Linked In (Optional)`} className="custom-form-input" type={`url`} />
                                    <input placeholder={`Github (Optional)`} className="custom-form-input" type={`url`} />
                                </div>
                                <button
                                    type="submit"
                                    className="custom-form-button primary-bg">
                                    <Link href={"/apply-to-teach"}>
                                        Apply
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}