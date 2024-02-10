import EmailVerificationForm from "@/components/auth/EmailVerificationForm";
import AuthLayout from "@/components/layout/AuthLayout";

export default function Verify() {
    return (
        <AuthLayout>
            <EmailVerificationForm />
        </AuthLayout>
    )
}