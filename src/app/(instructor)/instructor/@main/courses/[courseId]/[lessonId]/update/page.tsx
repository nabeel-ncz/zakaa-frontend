"use client";
import BanterLoader from "@/components/ui/BanterLoader";
import ImageUpload from "@/components/ui/ImageUpload";
import { TypeDispatch } from "@/store";
import { getCourseAction } from "@/store/actions/course";
import { updateLessonAction } from "@/store/actions/course/updateLessonAction";
import { BASE_URL } from "@/utils/axios";
import { PUBLIC_RESOURCE_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function page({ params }: any) {

  const { courseId, lessonId } = params;

  const router = useRouter();
  const dispatch: TypeDispatch = useDispatch();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lesson, setLesson] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [lessonTitle, setLessonTitle] = useState<string>("");
  const [lessonDescription, setLessonDescription] = useState<string>("");
  const [lessonThumbnail, setLessonThumbnail] = useState<any>(null);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState<any>(null);

  useEffect(() => {
    dispatch(getCourseAction({
      courseId
    })).then((res) => {
      if (res.payload?.success) {
        setCourse(res.payload?.data);
        const lesson = res.payload?.data?.lessons?.find((item: any) => item._id === lessonId);
        setLesson(lesson);
        setLessonTitle(lesson?.title);
        setLessonDescription(lesson?.description);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleSubmit = async () => {

    if (!lessonTitle || !lessonDescription) {
      return;
    }
    if (isThumbnailChanged && !lessonThumbnail) {
      return;
    }

    let changes: any = {
      courseId: course?._id,
      lessonId: lesson?._id,
      title: lessonTitle,
      description: lessonDescription,
    }
    if (isThumbnailChanged) {
      changes['thumbnail'] = lessonThumbnail;
    }

    try {

      setLoading(true);

      let result: any = await dispatch(updateLessonAction(changes));

      if (result?.error && result?.error?.message) {
        throw new Error(result?.error?.message);
      }

      if (!result.payload || !result.payload.success) {
        throw new Error("Something went wrong!");
      }

      setError(null);
      setLoading(false);

      router.push("/instructor/courses");

    } catch (error: any) {
      setLoading(false);
      setError(error?.message);
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
      <div className="w-full px-10 flex items-end justify-between">
        <div>
          <h2 className="font-bold">{lesson?.title}</h2>
        </div>
        <div>
          <button onClick={handleSubmit} className="secondary-bg px-6 py-2 rounded border border-[#8027C2] me-4">Submit</button>
        </div>
      </div>
      <div className="w-full px-10 py-4 flex gap-12">
        <div className="w-6/12">


          <h2 className="font-medium text-xs mb-1 ">Lesson Resource <span className="text-red-700">*</span></h2>
          <div className="w-full relative h-56 flex items-center justify-center secondary-bg border border-gray-400 border-dashed rounded-md">
            {!loading && (
              <video crossOrigin="anonymous" controls className="h-full">
                <source src={`${BASE_URL}/api/course/video/${lesson?.video?.high}`} type="video/mp4" title="High Quality" />
              </video>
            )}
          </div>

          <h2 className="mt-4 font-medium text-xs mb-1">Lesson title</h2>
          <input
            value={lessonTitle}
            onChange={(e) => { setLessonTitle(e.target.value) }}
            type="text"
            className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
          />
          {(!lessonTitle) && <span className="custom-form-error">Title is required!</span>}

          <h2 className="mt-4 font-medium text-xs mb-1">Lesson Description</h2>
          <input
            value={lessonDescription}
            onChange={(e) => { setLessonDescription(e.target.value) }}
            type="text"
            className="w-full px-8 py-3 rounded-lg font-medium border placeholder-gray-500 text-xs focus:outline-none border-gray-400 bg-white"
          />
          {(!lessonDescription) && <span className="custom-form-error">Description is required!</span>}


        </div>
        <div className="w-6/12">

          <h2 className="font-medium text-xs mb-1 ">Lesson thumbnail <span className="text-red-700">*</span></h2>
          {!isThumbnailChanged ? (
            <div
              className="w-full relative h-56 flex items-center justify-center secondary-bg border border-gray-400 border-dashed rounded-md"
            >
              <img
                crossOrigin="anonymous"
                src={`${PUBLIC_RESOURCE_URL}/api/course/images/${lesson?.thumbnail}`}
                alt={"Loading"}
                className="h-full"
              />
              <button onClick={() => { setIsThumbnailChanged(true) }} className="absolute px-3 py-1 bg-red-500 text-white">clear</button>
            </div>
          ) : (
            <>
              <ImageUpload onChange={(file: any) => { setLessonThumbnail(file) }} />
              {(!lessonThumbnail) && <span className="custom-form-error">Thumbnail is required!</span>}
            </>
          )}
        </div>
      </div>
    </>
  )
}
