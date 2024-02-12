"use client";
import { TypeDispatch } from "@/store";
import { resetPasswordAction } from "@/store/actions";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function ResetPasswordForm() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmition = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return setError("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
        }
        if (newPassword !== confirmPassword) {
            return setError("Confirm password do not match!");
        }
        dispatch(resetPasswordAction({
            currentPassword,
            newPassword
        })).then(() => {
            setError("");
            toast.success("Password changed successfully!", {
                position: "bottom-right"
            });
            router.push("/");
        }).catch((error: any) => {
            setError(error.message || "Something went wrong, Try again!");
        })
    }

    return (
        <div className="mx-auto max-w-sm my-auto">
            <h2 className="font-bold text-2xl">Reset your <span className="primary-text">password </span> ?</h2>
            <h2 className="font-light text-lg">Don't worry we're here to help!!</h2>
            <div className="flex flex-col items-center mt-6 gap-4">
                <input value={currentPassword} onChange={(e) => {
                    setCurrentPassword(e.target.value);
                }} placeholder={`Current password`} className="custom-form-input" type={`password`} />
                <input value={newPassword} onChange={(e) => {
                    setNewPassword(e.target.value);
                }} placeholder={`New password`} className="custom-form-input" type={`password`} />
                <input value={confirmPassword} onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }} placeholder={`Confirm password`} className="custom-form-input" type={`password`} />
            </div>
            {error && <p className="text-start custom-form-error my-1">{error}</p>}
            <button
                onClick={handleSubmition}
                className="custom-form-button primary-bg">
                <span>
                    Continue
                </span>
            </button>
        </div>
    )
}
