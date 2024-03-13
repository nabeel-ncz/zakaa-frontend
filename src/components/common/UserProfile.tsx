"use client";
import { TypeDispatch, TypeState } from "@/store";
import { logoutAction } from "@/store/actions/auth/logoutAction";
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Loading from "@/components/ui/Loading";
import { updateProfileAction } from "@/store/actions/user";
import { fetchUserAction } from "@/store/actions";
import { storeUserData } from "@/store/slices";

export default function UserProfile() {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const user: any = useSelector((state: TypeState) => state.user.data);
    const [loading, setLoading] = useState<boolean>(true);
    const [profileLoading, setProfileLoading] = useState<boolean>(false);
    const [updateProfileOpen, setUpdateProfileOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        github: "",
        instagram: "",
        additionalEmail: "",
        phone: "",
        gender: "",
        dob: "",
        linkedIn: ""
    });
    const [formError, setFormError] = useState<string | null>(null);
    const inputRef: any = useRef();

    useEffect(() => {
        dispatch(fetchUserAction()).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleLogout = () => {
        dispatch(logoutAction()).then(() => {
            router.replace("/");
        });
    };

    const uploadProfile = async (evt: ChangeEvent<HTMLInputElement>) => {
        setProfileLoading(true);
        const file: File | null = evt.target.files![0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await response.json();
        const res = await dispatch(updateProfileAction({
            ...user,
            profile: {
                avatar: data.secure_url
            }
        }));
        if (res.payload?.success) {
            dispatch(storeUserData(res.payload?.data));
        }
        setProfileLoading(false);
    }

    const handleUploadProfile = () => {
        inputRef.current.click();
    };

    const handleFormDataChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (formError) setFormError(null);
        setFormData((state) => ({
            ...state,
            [evt.target.name]: evt.target.value
        }));
    };

    const updateProfile = async () => {
        setProfileLoading(true);
        try {
            const res = await dispatch(updateProfileAction({
                ...user,
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                profile: {
                    ...user?.profile,
                    dob: formData.dob,
                    gender: formData.gender
                },
                contact: {
                    ...user?.contact,
                    additionalEmail: formData.additionalEmail,
                    phone: formData.phone,
                    socialMedia: {
                        instagram: formData.instagram,
                        linkedIn: formData.linkedIn,
                        github: formData.github
                    }
                }
            }));
            if (res.payload?.success) {
                setFormError(null);
                dispatch(storeUserData(res.payload?.data));
                setUpdateProfileOpen(false);
            }
        } catch (error: any) {
            setFormError(error?.message || "Something went wrong!");
        } finally {
            setProfileLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="w-full relative">
                        <div className={`${updateProfileOpen ? "opacity-100 z-20" : "opacity-0 -z-20"} transition-all absolute flex items-center justify-center backdrop-blur-sm top-0 w-full min-h-[88vh] bg-[rgba(0,0,0,0.2)]`}>
                            <div className="w-1/2 h-[38rem] bg-white rounded px-12 py-8 flex flex-col items-start gap-5">
                                {formError && <h1 className="text-xs text-red-800 font-bold opacity-80">{formError}</h1>}
                                {profileLoading && <h1 className="text-xs text-green-800 font-bold opacity-80">Updating...</h1>}
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-full flex flex-col items-start justify-center gap-1">
                                        <h1 className="text-xs font-bold opacity-80">First Name <span className="text-red-800">*</span></h1>
                                        <input
                                            required
                                            name="firstName"
                                            onChange={handleFormDataChange}
                                            type="text" value={formData.firstName}
                                            className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                    </div>
                                    <div className="w-full flex flex-col items-start justify-center gap-1">
                                        <h1 className="text-xs font-bold opacity-80">Last Name <span className="text-red-800">*</span></h1>
                                        <input
                                            required
                                            name="lastName"
                                            onChange={handleFormDataChange}
                                            type="text" value={formData.lastName}
                                            className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                    </div>
                                </div>

                                <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <h1 className="text-xs font-bold opacity-80">User name <span className="text-red-800">*</span></h1>
                                    <input
                                        required
                                        name="username"
                                        onChange={handleFormDataChange}
                                        type="text" value={formData.username}
                                        className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                </div>
                                <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <h1 className="text-xs font-bold opacity-80">Contact (Optional)</h1>
                                    <input
                                        name="additionalEmail"
                                        placeholder="Additional Email"
                                        onChange={handleFormDataChange}
                                        value={formData.additionalEmail}
                                        type="text"
                                        className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                    <input
                                        name="phone"
                                        placeholder="Phone"
                                        onChange={handleFormDataChange}
                                        value={formData.phone}
                                        type="text"
                                        className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                </div>
                                <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <h1 className="text-xs font-bold opacity-80">Personal Details (Optional)</h1>
                                    <div className="flex items-center gap-2 w-full">
                                        <select
                                            onChange={handleFormDataChange}
                                            name="gender"
                                            value={formData.gender}
                                            className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded">
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <input
                                            name="dob"
                                            placeholder="Date of birth"
                                            onChange={handleFormDataChange}
                                            value={formData.dob}
                                            type="date"
                                            className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                    </div>
                                </div>
                                <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <h1 className="text-xs font-bold opacity-80">Social media links (Optional)</h1>
                                    <input
                                        name="github"
                                        placeholder="Github"
                                        onChange={handleFormDataChange}
                                        value={formData.github}
                                        type="text"
                                        className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                    <input
                                        name="instagram"
                                        placeholder="Instagram"
                                        onChange={handleFormDataChange}
                                        value={formData.instagram}
                                        type="text"
                                        className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                    <input
                                        name="linkedIn"
                                        placeholder="LinkedIn"
                                        onChange={handleFormDataChange}
                                        value={formData.linkedIn}
                                        type="text"
                                        className="w-full px-4 py-2 text-sm font-medium border border-gray-300 outline-none rounded" />
                                </div>
                                <div className="w-full flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => { setUpdateProfileOpen(false) }}
                                        className="text-xs font-medium px-4 py-2 rounded border-purple-800 text-purple-800 border">Cancel</button>
                                    <button
                                        onClick={updateProfile}
                                        className="text-xs font-medium px-4 py-2 rounded primary-bg text-white">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white py-12 px-4">
                            <div className="w-full flex items-center justify-start px-12">
                                <div className="w-1/4 flex items-center justify-center">
                                    <div className="w-32 relative rounded-full overflow-hidden">
                                        <img src={`${user?.profile?.avatar ? user?.profile?.avatar : "/ui/empty-profile.webp"}`} alt="" className="w-full" />
                                        <input ref={inputRef} type="file" onChange={uploadProfile} accept="image/*" hidden />
                                        <div onClick={handleUploadProfile} className="cursor-pointer w-full h-[50%] flex items-center justify-center absolute bg-[rgba(0,0,0,0.2)] backdrop-blur bottom-0 left-0">
                                            <span className="font-base text-sm text-white">
                                                {profileLoading ? "Loading..." : "Change Profile"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-3/4 flex flex-col gap-4">
                                    <div className="flex gap-2">
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">First name</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.firstName}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Last name</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.lastName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Username</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.username}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Email</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Role</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.role}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Account Verified</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.isVerified ? "Yes" : "No"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Gender</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.profile?.gender ? user?.profile?.gender : "Not given"}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Date of birth</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.profile?.dob ? user?.profile?.dob : "Not given"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Additional Email</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.contact?.additionalEmail ? user?.contact?.additionalEmail : "Not given"}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Phone</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.contact?.phone ? user?.contact?.phone : "Not given"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Github</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.contact?.socialMedia?.github ? `${user?.contact?.socialMedia?.github}` : "Not given"}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">Instagram</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.contact?.socialMedia?.instagram ? user?.contact?.socialMedia?.instagram : "Not given"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-full flex flex-col items-start">
                                            <span className="text-xs font-medium">LinkedIn</span>
                                            <div className="w-full px-4 py-2 border rounded font-medium text-sm">
                                                {user?.contact?.socialMedia?.linkedIn ? user?.contact?.socialMedia?.linkedIn : "Not given"}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col items-start">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-end px-12 mt-8 gap-4">
                                <button onClick={() => {
                                    router.push("/auth/reset-password");
                                }} className="mr-2  border border-purple-800 bg-white shadow cursor-pointer rounded px-6 py-2 font-medium primary-text">Reset Password</button>
                                <button onClick={() => {
                                    setFormData((state) => ({
                                        ...state,
                                        firstName: user?.firstName,
                                        lastName: user?.lastName,
                                        username: user?.username,
                                        github: user?.contact?.socialMedia?.github || "",
                                        instagram: user?.contact?.socialMedia?.instagram || "",
                                        additionalEmail: user?.contact?.additionalEmail || "",
                                        phone: user?.contact?.phone || "",
                                        gender: user?.profile?.gender || "",
                                        dob: user?.profile?.dob || "",
                                        linkedIn: user?.contact?.socialMedia?.linkedIn || ""
                                    }));
                                    setUpdateProfileOpen(state => !state);
                                }} className="bg-white border border-purple-800  shadow cursor-pointer rounded px-6 py-2 font-medium primary-text">Update profile</button>
                                <button onClick={handleLogout} className="border border-purple-800 bg-white shadow cursor-pointer rounded px-6 py-2 font-medium primary-text">Logout</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}