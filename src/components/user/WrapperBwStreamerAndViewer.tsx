"use client";
import { useEffect, useRef, useState } from "react";
import { Constants, useMeeting } from "@videosdk.live/react-sdk";
import LiveStreamJoinAsParticipant from "./LiveStreamJoinAsParticipant";
import LiveStreamJoinAsViewer from "./LiveStreamJoinAsViewer";

export default function WrapperBwStreamerAndViewer({ onMeetingLeave, meetingId }: any) {

    const [joined, setJoined] = useState<string | null>(null);
    const { join } = useMeeting();

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
        <div className="container">
            <h3>Meeting Id: {meetingId}</h3>
            {joined && joined == "JOINED" ? (
                mMeeting.localParticipant.mode == Constants.modes.CONFERENCE ? (
                    <LiveStreamJoinAsParticipant />
                ) : mMeeting.localParticipant.mode == Constants.modes.VIEWER ? (
                    <LiveStreamJoinAsViewer />
                ) : null
            ) : joined && joined == "JOINING" ? (
                <p>Joining the meeting...</p>
            ) : (
                <button onClick={joinMeeting}>Join</button>
            )}
        </div>
    );
}