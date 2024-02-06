import SignupForm from "@/components/auth/SignupForm";

export default function Signup() {
    return (
        <>
            <div className="min-h-screen text-gray-900 flex justify-center px-12 md:px-24 mt-12">
                <div className="lg:w-1/2 xl:w-6/12 sm:p-6">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1">
                            <div className="flex flex-col items-center">
                                <button
                                    className="w-full max-w-sm font-bold shadow-sm rounded-lg py-3 bg-purple-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <img src="icons/google.png" alt="" />
                                    <span className="ml-4">
                                        Sign Up with Google
                                    </span>
                                </button>
                            </div>

                            <div className="mt-2 mb-8 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium transform translate-y-1/2">
                                    OR
                                </div>
                            </div>

                            <div className="mx-auto max-w-sm">
                                <SignupForm />
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                I agree to abide by templatana's
                                <a href="#" className="border-b border-gray-500 border-dotted">
                                    Terms of Service
                                </a>
                                and its
                                <a href="#" className="border-b border-gray-500 border-dotted">
                                    Privacy Policy
                                </a>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}