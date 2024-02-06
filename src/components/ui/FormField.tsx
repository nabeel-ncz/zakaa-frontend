export default function FormField({
    fieldName,
    fieldType,
    placeHolder,
    register,
    errors
}: {
    fieldName: string;
    fieldType: string;
    placeHolder: string;
    register: any;
    errors: any;
}) {
    return (
        <>
        <div className="mb-4">
            <input placeholder={`${placeHolder}`} className="custom-form-input" type={`${fieldType}`} {...register(`${fieldName}`)} />
            {errors[`${fieldName}`] && <span className="custom-form-error"> {errors[`${fieldName}`]?.message}</span>}
        </div>
        </>
    )
}