"use client";
import { useState } from "react";
import { MeetingConsumer, MeetingProvider } from "@videosdk.live/react-sdk";
import WrapperBwStreamerAndViewer from "./WrapperBwStreamerAndViewer";
import LiveStreamOpenScreen from "./LiveStreamOpenScreen";
import LiveStreamJoinScreen from "./LiveStreamJoinScreen";

export default function LiveStreamContainer(
    {
        path
    }: {
        path: string
    }) {

    const [meetingId, setMeetingId] = useState(null);
    const [mode, setMode] = useState<"CONFERENCE" | "VIEWER" | undefined>("CONFERENCE");

    const createMeeting = async () => {
        const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
            method: "POST",
            headers: {
                authorization: `${process.env.NEXT_PUBLIC_VIDEO_SDK_LIVE}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });
        const { roomId } = await res.json();
        return roomId;
    };

    const getMeetingAndToken = async (id?: string) => {
        const meetingId = !id ? await createMeeting() : id;
        setMeetingId(meetingId);
    };

    const onMeetingLeave = () => {
        setMeetingId(null);
    };

    return meetingId ? (
        <MeetingProvider
            config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: "C.V. Raman",
                mode: mode
            }}
            token={String(process.env.NEXT_PUBLIC_VIDEO_SDK_LIVE)}
        >
            <MeetingConsumer>
                {() => (
                    <WrapperBwStreamerAndViewer meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
                )}
            </MeetingConsumer>
        </MeetingProvider>
    ) : (
        <>
            {path === "instructor" ? (
                <LiveStreamOpenScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
            ) : (
                <LiveStreamJoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
            )}
        </>
    );
};
