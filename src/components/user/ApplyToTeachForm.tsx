"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplyToTeachSchema } from "@/lib/validation/schema/applyToTeach";
import { ApplyToTeachFormData } from "@/types";
import { useDispatch } from "react-redux";
import { TypeDispatch } from "@/store";
import { applyToTeachAction } from "@/store/actions/user/applyToTeachAction";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ApplyToTeachForm() {

    const dispatch: TypeDispatch = useDispatch();
    const [error, setError] = useState("");
    const router = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<z.infer<typeof ApplyToTeachSchema>>({
        resolver: zodResolver(ApplyToTeachSchema)
    });

    const onSubmit = async (data: ApplyToTeachFormData) => {
        try {

            const response: any = await dispatch(applyToTeachAction(data as ApplyToTeachFormData));

            if (response?.error && response?.error?.message) {
                throw new Error(response?.error?.message);
            }

            router.replace("/");

        } catch (error: any) {
            setError(error?.message || "Something went wrong, Try again!");
        }
    }

    return (
        <div className="min-h-screen text-gray-900 flex justify-center px-12 md:px-24 mt-12">
            <div className="lg:w-1/2 xl:w-6/12 sm:p-12">
                <div className="flex flex-col items-center">
                    <div className="w-full flex-1">
                        <div className="mx-auto max-w-sm my-auto">
                            <h2 className="font-bold text-2xl">Become an <span className="primary-text">Instructor </span> ?</h2>
                            <h2 className="font-light text-lg">Provide some basic information about yourself!</h2>
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="flex flex-col items-center mt-6 gap-4">
                                    
                                    {error && <p className="w-ful text-start custom-form-error">{error}</p>}
                                    
                                    <select
                                        {...register('profession')}
                                        name="profession"
                                        className="custom-form-input"
                                    >
                                        <option value="">Choose profession</option>
                                        <option value="Musician">Musician</option>
                                        <option value="Software developer">Software developer</option>
                                        <option value="Teacher">Teacher</option>
                                    </select>
                                    {errors[`profession`] && <p className="custom-form-error w-full text-start"> {errors[`profession`]?.message}</p>}

                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        className="custom-form-input"
                                        {...register('phone')}
                                    />
                                    {errors[`phone`] && <p className="custom-form-error w-full text-start"> {errors[`phone`]?.message}</p>}

                                    <textarea
                                        {...register('profileDescription')}
                                        name="profileDescription"
                                        className="custom-form-input"
                                        placeholder="Profile description">
                                    </textarea>
                                    {errors[`profileDescription`] && <p className="custom-form-error w-full text-start">{errors[`profileDescription`]?.message}</p>}

                                    <input
                                        type="url"
                                        placeholder="Linked In (Optional)"
                                        className="custom-form-input"
                                        {...register('linkedIn')}
                                    />
                                    {errors[`linkedIn`] && <p className="custom-form-error w-full text-start">{errors[`linkedIn`]?.message}</p>}

                                    <input
                                        type="url"
                                        placeholder="Github (Optional)"
                                        className="custom-form-input"
                                        {...register('github')}
                                    />
                                    {errors[`github`] && <p className="custom-form-error w-full text-start"> {errors[`github`]?.message}</p>}

                                </div>
                                <button
                                    type="submit"
                                    className="custom-form-button primary-bg">
                                    Apply
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
