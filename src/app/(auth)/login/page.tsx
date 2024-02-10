import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function Login() {
    return (
        <AuthLayout>
            <>
                <div className="flex flex-col items-center">
                    <button
                        className="w-full max-w-sm font-bold shadow-sm rounded-lg py-3 bg-purple-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                        <img src="icons/google.png" alt="" />
                        <span className="ml-4">
                            Sign In with Google
                        </span>
                    </button>
                </div>

                <div className="mt-2 mb-8 border-b text-center">
                    <div
                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium transform translate-y-1/2">
                        OR
                    </div>
                </div>

                <div className="mx-auto max-w-sm my-auto">
                    <LoginForm />
                </div>
            </>
        </AuthLayout>
    )
}