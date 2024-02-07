

export default function ForgotPassword() {
    return (
        <>
            <div className="min-h-screen text-gray-900 flex justify-center px-12 md:px-24 mt-12">
                <div className="lg:w-1/2 xl:w-6/12 sm:p-12">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1">
                            <div className="mx-auto max-w-sm my-auto">
                                <h2 className="font-bold text-2xl">Forgot your <span className="primary-text">password </span> ?</h2>
                                <h2 className="font-light text-lg">Don't worry we're here to help!!</h2>
                                <div className="flex flex-col items-center mt-6">
                                    <input placeholder={`Email`} className="custom-form-input" type={`email`} />
                                </div>
                                <button
                                    type="submit"
                                    className="custom-form-button primary-bg">
                                    <span>
                                        Continue
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}