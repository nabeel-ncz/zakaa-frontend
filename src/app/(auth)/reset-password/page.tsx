import AuthLayout from "@/components/layout/AuthLayout"

export default function ResetPassword() {
    return (
        <AuthLayout>
            <>
                <div className="mx-auto max-w-sm my-auto">
                    <h2 className="font-bold text-2xl">Reset your <span className="primary-text">password </span> ?</h2>
                    <h2 className="font-light text-lg">Don't worry we're here to help!!</h2>
                    <div className="flex flex-col items-center mt-6 gap-4">
                        <input placeholder={`Current password`} className="custom-form-input" type={`password`} />
                        <input placeholder={`New password`} className="custom-form-input" type={`password`} />
                        <input placeholder={`Confirm password`} className="custom-form-input" type={`password`} />
                    </div>
                    <button
                        type="submit"
                        className="custom-form-button primary-bg">
                        <span>
                            Continue
                        </span>
                    </button>
                </div>
            </>
        </AuthLayout>
    )
}