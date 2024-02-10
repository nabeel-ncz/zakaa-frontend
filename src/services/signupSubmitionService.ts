import { useDispatch, useSelector } from "react-redux";
import { TypeDispatch, TypeState } from "@/store";
import { useRouter } from "next/router";
import { findUsernameAction, signupAction } from "@/store/actions";
import { SignupFormData } from "@/types";

export const signupSubmitionService = async (
    username: string,
    onError: Function
) => {

    const dispatch: TypeDispatch = useDispatch();
    const signupData = useSelector((state: TypeState) => state.user.temp);
    const router = useRouter();

    try {

        const result = await dispatch(findUsernameAction(username));

        if (!result?.payload) {
            throw new Error("Username is not available!");
        }

        if (!result?.payload?.success) {
            throw new Error("Username is not available!");
        }

        onError('');

        const data = signupData ? signupData : {};

        await dispatch(signupAction({
            ...data,
            username
        } as SignupFormData));

        router.replace("/verify");

    } catch (error: any) {
        onError(error?.message);
    }
}