export default function FormField({
    fieldName,
    fieldType,
    register,
    errors
}: {
    fieldName: string,
    fieldType: string,
    register: any,
    errors: any
}) {
    return (
        <>
            <input className="custom-form-input" type={`${fieldType}`} {...register(`${fieldName}`)} />
            {<span> {errors[`${fieldName}`]?.message}</span>}
        </>
    )
}