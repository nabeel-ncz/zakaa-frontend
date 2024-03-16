"use client";
import { TypeDispatch } from "@/store";
import { updateEnrollmentAction } from "@/store/actions/enrollment/updateEnrollmentAction";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";

export default function EnrollmentVideoPlayer({
    reFetch,
    url,
    enrollmentId,
    lessonId,
    totalTimeWatched
}: {
    reFetch: () => void;
    url: string;
    enrollmentId: string;
    lessonId: string;
    totalTimeWatched: number;
}) {

    const dispatch: TypeDispatch = useDispatch();
    const playerRef = useRef<ReactPlayer>(null);
    const [actualTotalTime, setActualTotalTime] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const playedSeconds = playerRef.current?.getCurrentTime() || 0;
            if (playedSeconds > totalTimeWatched) {
                handleUpdateProgress(playedSeconds);
            }
        }, 5000);
        return () => {
            clearInterval(timer);
            reFetch();
        };
    }, []);

    const handleUpdateProgress = (seconds: number) => {
        if(seconds >= actualTotalTime){
            dispatch(updateEnrollmentAction({
                enrollmentId,
                lessonId,
                totalTimeWatched: seconds,
                status: 'lesson-completed',
                completedLesson: lessonId
            }));
            return;
        }
        dispatch(updateEnrollmentAction({
            enrollmentId,
            lessonId,
            totalTimeWatched: seconds,
            status: 'none'
        }));
    }

    const handleOnReady = () => {
        playerRef?.current?.seekTo(totalTimeWatched, 'seconds');
    };

    const handleDuration = (duration: number) => {
        setActualTotalTime(duration);
    }

    return (
        <>
            <ReactPlayer
                // onProgress={handleProgress}
                // onSeek={handleSeek}
                ref={playerRef}
                url={url}
                controls
                height="100%"
                style={{ aspectRatio: '16:9' }}
                onReady={handleOnReady}
                onDuration={handleDuration}
            />
        </>
    )
}
