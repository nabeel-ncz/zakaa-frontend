import EmailVerificationForm from "@/components/auth/EmailVerificationForm";
import { ToastContainer } from "react-toastify";

export default function Verify() {
    return (
        <>
            <ToastContainer />
            <EmailVerificationForm />
        </>
    )
}