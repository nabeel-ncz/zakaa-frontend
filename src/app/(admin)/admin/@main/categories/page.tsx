"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import { TypeDispatch } from "@/store";
import { createCategoryAction, getAllCategoriesAction, updateCategoryAction } from "@/store/actions/category";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Categories() {

    const dispatch: TypeDispatch = useDispatch();
    const [createOpen, setCreateOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [isBlocked, setIsBlocked] = useState("false");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState<any>(null);
    const [updating, setUpdating] = useState("");
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedIsBlocked, setUpdatedIsBlocked] = useState("");

    useEffect(() => {
        handleGetCategories();
    }, []);

    const handleGetCategories = () => {
        dispatch(getAllCategoriesAction())
            .then((res) => {
                if (res.payload?.success) {
                    setCategories(res.payload.data);
                }
            });
    }

    const handleCreateOpen = () => { setCreateOpen(state => !state) };

    const handleSubmition = async () => {
        try {

            if (!title) {
                return;
            }

            setLoading(true);

            const result: any = await dispatch(createCategoryAction({
                title,
                isBlocked
            }));

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result.payload || !result.payload.success) {
                throw new Error("Something went wrong!");
            }

            setError(null);
            setLoading(false);
            handleCreateOpen();
            handleGetCategories();

        } catch (error: any) {
            setLoading(false);
            setError(error?.message || "Something went wrong, Try again!");
        }
    }

    const handleUpdation = async () => {
        try {

            if (!updatedTitle || !updating) {
                return;
            }

            setLoading(true);

            const result: any = await dispatch(updateCategoryAction({
                _id: updating,
                title: updatedTitle,
                isBlocked: updatedIsBlocked
            }));

            if (result?.error && result?.error?.message) {
                throw new Error(result?.error?.message);
            }

            if (!result.payload || !result.payload.success) {
                throw new Error("Something went wrong!");
            }

            setError(null);
            setLoading(false);
            handleGetCategories();
            setUpdating("");
            setUpdatedIsBlocked("");
            setUpdatedTitle("");

        } catch (error: any) {
            setLoading(false);
            setError(error?.message || "Something went wrong, Try again!");
        }
    }

    return (
        <div className="w-full">
            {createOpen && (
                <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
                    {loading ? (
                        <BanterLoader />
                    ) : (
                        <div className="px-12 py-12 bg-white flex flex-col items-center justify-center rounded-md gap-2">

                            <h2 className="font-medium text-lg">Create Category</h2>
                            {error && <p className="custom-form-error text-start">{error}</p>}

                            <input value={title} onChange={(evt) => { setTitle(evt.target.value) }} placeholder={`Category Title`} className="custom-form-input" type={`text`} />
                            {!title && <p className="custom-form-error text-start"> Title is required!</p>}

                            <select value={isBlocked} onChange={(evt) => { setIsBlocked(evt.target.value) }} name="" id="" className="custom-form-input">
                                <option value="false">Active</option>
                                <option value="true">Block</option>
                            </select>
                            <div className="flex gap-2 mt-4">
                                <button onClick={() => {setCreateOpen(false)}} className="px-4 py-1 rounded font-medium text-sm text-black border border-gray-600" >Close</button>
                                <button onClick={handleSubmition} className="px-4 py-1 rounded font-medium text-sm text-white bg-black" >Submit</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="w-full px-10 flex items-end justify-end">
                <div>
                    <button onClick={handleCreateOpen} className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Create</button>
                </div>
            </div>

            <div className="overflow-x-scroll lg:overflow-hidden bg-white rounded-lg">
                <table className="w-full min-w-max table-auto">
                    <thead className="font-normal">
                        <tr className="border-b border-gray-200">
                            <th className="font-semibold p-4 text-left border-r">Category Id</th >
                            <th className="font-semibold p-4 text-left border-r">Title</th>
                            <th className="font-semibold p-4 text-left border-r">Status</th>
                        </tr >
                    </thead >
                    <tbody>
                        {categories?.map((item: {
                            _id: string;
                            title: string;
                            isBlocked: boolean;
                        }) => (
                            <>
                                {updating === item._id ? (
                                    <tr key={item._id} className="border-b border-gray-200">
                                        <td className="font-normal p-4 text-left border-r">{item?._id}</td>
                                        <td className="font-normal p-4 text-left border-r">
                                            <input value={updatedTitle} onChange={(evt) => { setUpdatedTitle(evt.target.value) }} placeholder={`Category Title`} className="custom-form-input" type={`text`} />
                                            {!updatedTitle && <p className="custom-form-error text-start"> Title is required!</p>}
                                        </td>
                                        <td className="font-normal p-4 text-left border-r">
                                            <select value={updatedIsBlocked} onChange={(evt) => { setUpdatedIsBlocked(evt.target.value) }} name="" id="" className="custom-form-input">
                                                <option value="false">Active</option>
                                                <option value="true">Block</option>
                                            </select>
                                        </td>
                                        <td className="font-normal p-4 text-left border-r">
                                            <span onClick={handleUpdation} className="cursor-pointer px-2 py-1 secondary-bg rounded">Submit</span>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={item._id} className="border-b border-gray-200">
                                        <td className="font-normal p-4 text-left border-r">{item?._id}</td>
                                        <td className="font-normal p-4 text-left border-r">{item?.title}</td>
                                        <td className="font-normal p-4 text-left border-r">{item?.isBlocked ? "blocked" : "active"}</td>
                                        <td className="font-normal p-4 text-left border-r">
                                            <span onClick={() => {
                                                setUpdating(item._id);
                                                setUpdatedTitle(item.title);
                                                setUpdatedIsBlocked(String(item.isBlocked));
                                            }} className="cursor-pointer px-2 py-1 secondary-bg rounded">update</span>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table >
            </div >
        </div>
    )
}