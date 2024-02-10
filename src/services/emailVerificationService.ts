import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { TypeDispatch } from "@/store";
import { verifyAccountAction } from "@/store/actions";

export const emailVerificationService = async (
    otp: string,
    onError: Function
) => {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();

    try {

        const result = await dispatch(verifyAccountAction({ otp }));

        if (!result?.payload) {
            throw new Error("OTP is incorrect, Try again!");
        }

        if (!result?.payload?.success) {
            throw new Error("OTP is incorrect, Try again!");
        }

        onError("");

        router.replace("/");

    } catch (error: any) {
        onError(error?.message);
    }
}