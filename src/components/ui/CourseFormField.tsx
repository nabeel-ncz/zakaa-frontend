import React from 'react'

export default function CourseFormField({
    style,
    title,
    required,
    fieldName,
    fieldType,
    placeHolder,
    register,
    errors,
    isNotZod
}: {
    style?: string[],
    title: string,
    required?: boolean,
    fieldName: string,
    fieldType: string,
    placeHolder?: string,
    register?: any,
    errors?: any
    isNotZod?: boolean
}) {
    return (
        <div className={style?.join(' ')}>
            <h2 className="font-medium text-xs mb-1">{title} {required && <span className="text-red-700">*</span>}</h2>
            {fieldType === "textarea" ? (
                <>
                    {isNotZod ? (
                        <>
                            <textarea
                                name={fieldName}
                                placeholder={placeHolder ? placeHolder : ""}
                                className="w-full h-28 px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
                            >
                            </textarea>
                        </>
                    ) : (
                        <>
                            <textarea
                                name={fieldName}
                                placeholder={placeHolder ? placeHolder : ""}
                                className="w-full h-28 px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
                                {...register && register(fieldName)}
                            >
                            </textarea>
                            {errors && errors[`${fieldName}`] && <span className="custom-form-error"> {errors[`${fieldName}`]?.message}</span>}
                        </>
                    )}
                </>
            ) : (
                <>
                    {isNotZod ? (
                        <input
                            name={fieldName}
                            type={fieldType}
                            placeholder={placeHolder ? placeHolder : ""}
                            className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
                        />
                    ) : (
                        <>
                            <input
                                name={fieldName}
                                type={fieldType}
                                placeholder={placeHolder ? placeHolder : ""}
                                className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
                                {...register && register(fieldName)}
                            />
                            {errors && errors[`${fieldName}`] && <span className="custom-form-error"> {errors[`${fieldName}`]?.message}</span>}
                        </>
                    )}
                </>
            )}
        </div>
    )
}
