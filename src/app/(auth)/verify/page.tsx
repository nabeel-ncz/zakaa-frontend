import EmailVerificationForm from "@/components/auth/EmailVerificationForm";
import AuthLayout from "@/components/layout/AuthLayout";
import { ToastContainer } from "react-toastify";

export default function Verify() {
    return (
        <>
            <ToastContainer />
            <AuthLayout>
                <EmailVerificationForm />
            </AuthLayout>
        </>
    )
}