"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import ImageUpload from "@/components/ui/ImageUpload";
import { TypeDispatch } from "@/store";
import { getAvailableCategoriesAction } from "@/store/actions/category";
import { getCourseAction, updateCourseAction, uploadCourseContent } from "@/store/actions/course";
import { BASE_URL } from "@/utils/axios";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function UpdateCourse({ params }: any) {

  const { courseId } = params;

  const router = useRouter();
  const dispatch: TypeDispatch = useDispatch();
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [courseThumbnail, setCourseThumbnail] = useState<any>(null);
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategories] = useState<any>(null);
  const [trialTitle, setTrialTitle] = useState<any>(null);
  const [trialDescription, setTrialDescription] = useState<any>(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");


  useEffect(() => {
    setLoading(true);
    dispatch(getCourseAction({
      courseId
    })).then((res) => {
      if (res.payload?.success) {
        setCourse(res.payload?.data);
        setCourseCategory(res.payload?.data?.categoryRef?._id)
        setCourseTitle(res.payload?.data?.title);
        setCourseDescription(res.payload?.data?.description);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true)
    dispatch(getAvailableCategoriesAction())
      .then((res) => {
        if (res.payload?.success) {
          setCategories(res.payload?.data);
        }
      }).finally(() => {
        setLoading(false);
      })
  }, []);

  const onSubmit = async () => {
    if (!courseCategory || !courseTitle || !courseDescription) {
      return;
    }
    if (course?.trial?.video) {
      if (!trialTitle || !trialDescription) {
        return;
      }
    }
    if (isImageChanged && !courseThumbnail) {
      return;
    }

    try {

      setLoading(true);

      let result1: any;
      if (isImageChanged) {

        result1 = await dispatch(uploadCourseContent({
          courseThumbnail: courseThumbnail,
          trialVideo: null
        }));

        if (result1?.error && result1?.error?.message) {
          throw new Error(result1?.error?.message);
        }

        if (!result1.payload || !result1.payload.success) {
          throw new Error("Something went wrong!");
        }

      }

      let changes: any = {
        _id: course?._id,
        title: courseTitle,
        description: courseDescription,
        categoryRef: courseCategory,
        trial: {
          title: trialTitle,
          description: trialDescription
        }
      }
      if (isImageChanged) {
        changes['thumbnail'] = result1?.payload?.data?.thumbnail;
      }

      let result2: any = await dispatch(updateCourseAction(changes));

      if (result2?.error && result2?.error?.message) {
        throw new Error(result2?.error?.message);
      }

      if (!result2.payload || !result2.payload.success) {
        throw new Error("Something went wrong!");
      }

      setError(null);
      setLoading(false);

      router.replace("/instructor/courses");

    } catch (error: any) {
      setError(error?.message);
      setLoading(false);
    }

  }

  return (
    <>
      {error && (
        <div className="fixed z-50 top-0 left-0 flex items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
          <div className="px-12 py-12 bg-white flex flex-col items-center justify-center rounded-md gap-2">
            <h2 className="font-medium text-red-900 text-lg">{error}</h2>
            <button className="px-6 py-2 rounded font-medium text-white bg-black" onClick={() => { setError(null) }} >Try again!</button>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed z-50 top-0 left-0 flex flex-col items-center justify-center w-full min-h-screen bg-[#00000050] backdrop-blur-md">
          <BanterLoader />
          <h2 className="absolute top-[60%] font-medium">Resources are processing, Please wait!</h2>
        </div>
      )}
      <div className="w-full px-10 flex items-end justify-end">
        <div>
          <button onClick={onSubmit} className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Submit</button>
        </div>
      </div>

      <div className="w-full px-10 py-4 flex gap-12">
        <div className="w-7/12">
          <h2 className="font-medium text-xs mb-1 ">Course thumbnail <span className="text-red-700">*</span></h2>

          {!isImageChanged ? (
            <div
              className="w-full relative h-56 flex items-center justify-center secondary-bg border border-gray-400 border-dashed rounded-md"
            >
              <img
                crossOrigin="anonymous"
                src={`${PUBLIC_RESOURCE_URL}/api/course/images/${course?.thumbnail}`}
                alt={"Loading"}
                className="h-full"
              />
              <button onClick={() => { setIsImageChanged(true) }} className="absolute px-3 py-1 bg-red-500 text-white">clear</button>
            </div>
          ) : (
            <>
              <ImageUpload onChange={(file: any) => { setCourseThumbnail(file) }} />
              {(!courseThumbnail) && <span className="custom-form-error">Thumbnail is required!</span>}
            </>
          )}
          <>
            <h2 className="mt-4 font-medium text-xs mb-1 ">Course title <span className="text-red-700">*</span></h2>
            <input
              type={"text"}
              value={courseTitle}
              onChange={(evt) => { setCourseTitle(evt.target.value) }}
              placeholder={"Course title"}
              className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
            />
            {(!courseTitle) && <span className="custom-form-error">Title is required</span>}
          </>

          <h2 className="mt-4 font-medium text-xs mb-1 ">Course category <span className="text-red-700">*</span></h2>

          <select
            value={courseCategory}
            onChange={(evt) => { setCourseCategory(evt.target.value) }}
            className="w-full h-12 rounded-lg font-medium border px-4 text-gray-800 text-sm focus:outline-none border-gray-400 bg-white"
          >
            <option value={""}>Choose category</option>
            {categories?.map((item: any) => (
              <option value={item._id} >{item.title}</option>
            ))}
          </select>

          {(!courseCategory) && <span className="custom-form-error">Course category is required!</span>}

          <h2 className="mt-4 font-medium text-xs mb-1 ">Course description <span className="text-red-700">*</span></h2>
          <>
            <textarea
              value={courseDescription}
              onChange={(evt) => { setCourseDescription(evt.target.value) }}
              placeholder={"Course Description"}
              className="w-full h-28 px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
            >
            </textarea>
            {(!courseDescription) && <span className="custom-form-error">Description is required</span>}
          </>

          <>
            <h2 className="mt-4 font-medium text-xs mb-1 ">No of lessons <span className="text-red-700">*</span></h2>
            <input
              type={"text"}
              value={course?.lessons?.length}
              placeholder={""}
              className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
            />
          </>

        </div>
        <div className="w-5/12">

          <>
            <h2 className="mt-4 font-medium text-xs mb-1">Pricing  <span className="text-red-700">*</span></h2>
            <div className="flex gap-2">
              <div
                className={`cursor-pointer w-1/2 h-12 bg-white rounded flex items-center justify-center border ${course?.pricing?.type === "free" && "border-gray-400"}`}
              >
                <span className="font-bold">{"free"}</span>
              </div>

              <div
                className={`cursor-pointer w-1/2 h-12 bg-white rounded flex items-center justify-center border ${course?.pricing?.type === "paid" && "border-gray-400"}`}
              >
                <span className="font-bold">{"paid"}</span>
              </div>

            </div>
          </>

          {course?.trial?.video && (<>

            <h2 className="mt-4 font-medium text-xs mb-1 ">Trial video <span className="text-red-700"></span></h2>
            <div className="w-full relative h-56 flex items-center justify-center secondary-bg border border-gray-400 border-dashed rounded-md">
              <video crossOrigin="anonymous" controls className="h-full">
                <source src={`${BASE_URL}/api/course/video/${course?.trial?.video?.high}`} type="video/mp4" title="High Quality" />
              </video>
            </div>

            <>
              <h2 className="mt-4 font-medium text-xs mb-1">Video title</h2>
              <input
                value={trialTitle}
                onChange={(e) => { setTrialTitle(e.target.value) }}
                type="text"
                className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
              />
              {(!trialTitle) && <span className="custom-form-error">Title is required!</span>}


              <h2 className="mt-4 font-medium text-xs mb-1">Video description</h2>
              <input
                value={trialDescription}
                onChange={(e) => { setTrialDescription(e.target.value) }}
                type="text"
                className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
              />
              {(!trialDescription) && <span className="custom-form-error">Description is required!</span>}
            </>

          </>)}

        </div>
      </div>
    </>
  )
}