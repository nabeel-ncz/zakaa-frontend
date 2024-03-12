"use client";
import { useEffect, useRef, useState } from "react";
import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import LiveStreamJoinAsParticipant from "./LiveStreamJoinAsParticipant";
import LiveStreamJoinAsViewer from "./LiveStreamJoinAsViewer";
import { TypeDispatch, TypeState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAction } from "@/store/actions";
import { useRouter } from "next/navigation";

export default function WrapperBwStreamerAndViewer({ onMeetingLeave, meetingId }: any) {

    const router = useRouter();
    const dispatch: TypeDispatch = useDispatch();
    const user: any = useSelector((state: TypeState) => state.user.data);
    const [joined, setJoined] = useState<string | null>(null);
    const { join } = useMeeting();

    useEffect(() => {
        dispatch(fetchUserAction());
    }, []);

    const mMeeting = useMeeting({
        onMeetingJoined: () => {
            if (mMeetingRef.current.localParticipant.mode == "CONFERENCE") {
                mMeetingRef.current.localParticipant.pin("CAM");
            }
            setJoined("JOINED");
        },

        onMeetingLeft: () => {
            onMeetingLeave();
        },

        onError: (error) => {
            alert(error.message);
        },
    });

    const mMeetingRef = useRef(mMeeting);

    useEffect(() => {
        mMeetingRef.current = mMeeting;
    }, [mMeeting]);

    const joinMeeting = () => {
        setJoined("JOINING");
        join();
    };

    return (
        <>
            {joined && joined == "JOINED" ? (
                mMeeting.localParticipant.mode == Constants.modes.CONFERENCE ? (
                    <LiveStreamJoinAsParticipant />
                ) : mMeeting.localParticipant.mode == Constants.modes.VIEWER ? (
                    <LiveStreamJoinAsViewer />
                ) : null
            ) : (
                <>
                    <div className="w-full min-h-[80vh] flex items-center p-8 gap-4">
                        <div className="w-8/12">
                            <div className="w-full h-[28rem] bg-white shadow relative rounded-md">
                                <div className="absolute left-[42%] top-[27%] w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
                                    <div className="bg-purple-100 w-full h-full absolute top-0 left-0 z-0 animate-pulse"></div>
                                    <img src="/icons/profile-copy-2.png" alt="" className="z-10 w-20 h-20 rounded-full" />
                                </div>
                                <h2 className="font-bold text-xl absolute left-[46%] top-[60%] ">{user?.username || ""}</h2>
                                <h3 className="absolute top-4 left-4 font-medium text-xl text-gray-600">Meeting Id: <span className="font-bold text-black">{meetingId}</span></h3>
                                <div className="w-full flex items-center justify-center gap-2 absolute top-[70%]">
                                    <button
                                        className="font-medium rounded-full px-6 py-2 bg-white border border-purple-800 text-sm text-purple-800 hover:bg-purple-100"
                                        onClick={() => { router.replace("/instructor/live") }}
                                    >Cancel</button>
                                    {joined && joined == "JOINING" ? (
                                        <button
                                            className="font-medium rounded-full px-8 py-2 primary-bg hover:bg-purple-800 shadow text-sm text-white"
                                        >Joining <span className="animate-pulse">...</span></button>
                                    ) : (
                                        <button
                                            className="font-medium rounded-full px-8 py-2 primary-bg hover:bg-purple-800 shadow text-sm text-white"
                                            onClick={joinMeeting}
                                        >Join</button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <div className="w-full h-[28rem] bg-white shadow relative rounded-md">

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}