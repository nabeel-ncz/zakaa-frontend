"use client";
import Header from "@/components/common/Header";
import { getPublicCoursesAction } from "@/store/actions/course";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { makeArrayUniqueByKey } from "@/utils/helpers";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TypeDispatch } from "@/store";
import { getAvailableCategoriesAction } from "@/store/actions/category";

export default function Courses() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch: TypeDispatch = useDispatch();
    const [courses, setCourses] = useState<any[] | null>(null);
    const [filteredCourse, setFilteredCourse] = useState<any[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageNo, setPageNo] = useState<number>(1);
    const [hasMore, setHasMore] = useState(true);
    const [categories, setCategories] = useState<any[] | null>(null);
    const [filter, setFilter] = useState({
        category: "",
        type: "",
        priceFrom: 0,
        priceTo: 1000
    });
    const searchQuery = searchParams.get("search");

    useEffect(() => {
        dispatch(getAvailableCategoriesAction())
            .then((res) => {
                if (res.payload?.success) {
                    setCategories(res.payload?.data);
                }
            });
    }, []);

    useEffect(() => {
        loadCourses(1);
    }, []);

    const handleScroll = (event: any) => {
        event.preventDefault();
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 50
        ) {
            loadCourses(pageNo + 1);
            setPageNo(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (!hasMore) {
            return;
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const filtered = courses?.filter((item) => {
            const search = !searchQuery || item.title.toLowerCase().includes(searchQuery?.toLowerCase());
            const categoryMatch = !filter.category || (item.categoryRef._id.toString() === filter.category);
            const typeMatch = !filter.type || (item.pricing?.type === filter.type);
            const priceMatch = !filter.type || (item.pricing.amount >= filter.priceFrom && item.pricing.amount <= filter.priceTo);
            return categoryMatch && typeMatch && priceMatch && search;
        })
        setFilteredCourse(filtered || []);
    }, [filter, courses, searchQuery]);

    const loadCourses = async (
        page: number
    ) => {
        setLoading(true);

        try {

            const query: any = {
                page: page
            };

            const res = await dispatch(getPublicCoursesAction(query));

            if (res.payload?.success && res.payload?.data) {
                setCourses((prev) => {
                    if (prev) {
                        let arr = makeArrayUniqueByKey([...prev, ...res.payload?.data], "_id");
                        return arr;
                    }
                    return [...res.payload?.data];
                });
            }

            if (res.payload?.data?.length === 0) {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (evt: ChangeEvent<any>) => {
        setHasMore(false);
        setFilter((state) => ({
            ...state,
            [evt.target.name]: evt.target.value
        }));
    };

    return (
        <>
            <Header />
            <div className="w-full px-52 pt-10 pb-16">
                <img src="/ui/course-head-sec-img.png" alt="" />
            </div>
            <div className="w-full px-52 flex gap-4 mb-8">
                <div className="w-9/12 flex flex-col items-start gap-2 bg-white">
                    {filteredCourse?.map((item: any) => (
                        <div className="flex items-center justify-center secondary-bg rounded-md overflow-hidden px-2 py-3">
                            <div className="w-5/12 bg-white shadow">
                                <img crossOrigin="anonymous" src={`${PUBLIC_RESOURCE_URL}/api/course/images/${item.thumbnail}`} alt="" className="rounded" />
                            </div>
                            <div className="w-7/12 ps-4 flex flex-col">
                                <h2 className="font-light text-sm">{item.categoryRef.title}</h2>
                                <h2 className="font-light text-sm">by <span className="font-medium">{item.instructorRef.username}</span></h2>
                                <h2 className="mt-4 font-medium text-xl line-clamp-1">{item.title}</h2>
                                <p className="font-light text-sm text-gray-800 line-clamp-1">{item.description}</p>
                                <h2 className="font-medium text-sm">{item.lessons.length} <span className="font-medium"> lessons</span></h2>
                                <div className="flex items-center justify-between mt-4">
                                    <h2 className="font-medium text-sm text-green-800">{item.pricing.type}</h2>
                                    <span onClick={() => {
                                        router.push(`courses/${item._id}`)
                                    }} className="cursor-pointer font-medium text-sm me-4 px-2 py-1 bg-white rounded">View more</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-3/12 secondary-bg h-80 rounded-md px-4">
                    <h2 className="font-medium my-2 ms-2">Filter</h2>
                    <label htmlFor="" className="text-xs font-medium my-2">Category : </label>
                    <select className="w-full h-10 outline-none" onChange={(handleFilterChange)} value={filter.category} name="category" id="">
                        <option value="">All</option>
                        {categories?.map((item: any) => (
                            <option value={item._id}>{item.title}</option>
                        ))}
                    </select>
                    <label htmlFor="" className="text-xs font-medium my-2">Pricing : </label>
                    <select className="w-full h-10 outline-none" onChange={handleFilterChange} value={filter.type} name="type" id="">
                        <option value="">All</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </select>
                    {filter.type === "paid" && (
                        <>
                            <label htmlFor="" className="text-xs font-medium my-2">Amount : </label>
                            <input value={filter.priceFrom} className="w-full h-10 outline-none mb-2" type="number" placeholder="from" name="priceFrom" onChange={handleFilterChange} />
                            <input value={filter.priceTo} className="w-full h-10 outline-none" type="number" placeholder="to" name="priceTo" onChange={handleFilterChange} />
                        </>
                    )}
                </div>
            </div>
            {loading && <div>Loading courses...</div>}
        </>
    );
}
