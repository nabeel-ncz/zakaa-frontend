"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    MeetingProvider,
    MeetingConsumer,
    useMeeting,
    useParticipant,
    Constants
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import Hls from "hls.js";

function JoinScreen({ getMeetingAndToken, setMode }: any) {

    const [meetingId, setMeetingId] = useState<string | null>(null);

    const onClick = async (mode: string) => {
        setMode(mode);
        await getMeetingAndToken(meetingId);
    };

    return (
        <div className="container">
            <button onClick={() => onClick("CONFERENCE")}>Create Meeting</button>
            <br />
            <br />
            {" or "}
            <br />
            <br />
            <input
                type="text"
                placeholder="Enter Meeting Id"
                onChange={(e) => {
                    setMeetingId(e.target.value);
                }}
            />
            <br />
            <br />
            <button onClick={() => onClick("CONFERENCE")}>Join as Host</button>
            {" | "}
            <button onClick={() => onClick("VIEWER")}>Join as Viewer</button>
        </div>
    );
}

function ParticipantView(props: any) {

    const micRef: any = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(props.participantId);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

    //Playing the audio in the <audio>
    useEffect(() => {
        if (micRef.current) {
            if (micOn && micStream) {
                const mediaStream = new MediaStream();
                mediaStream.addTrack(micStream.track);

                micRef.current.srcObject = mediaStream;
                micRef.current.play()
                    .catch((error: Error | any) =>
                        console.error("videoElem.current.play() failed", error)
                    );
            } else {
                micRef.current.srcObject = null;
            }
        }
    }, [micStream, micOn]);

    return (
        <div>
            <p>
                Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
                {micOn ? "ON" : "OFF"}
            </p>
            <audio ref={micRef} autoPlay playsInline muted={isLocal} />
            {webcamOn && (
                <ReactPlayer
                    playsinline
                    pip={false}
                    light={false}
                    controls={false}
                    muted={true}
                    playing={true}
                    url={videoStream}
                    height={"300px"}
                    width={"300px"}
                    onError={(err: any) => {
                        console.log(err, "participant video error");
                    }}
                />
            )}
        </div>
    );
}

export function Controls() {
    const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();
    return (
        <div>
            <button onClick={() => leave()}>Leave</button>
            &emsp;|&emsp;
            <button onClick={() => toggleMic()}>toggleMic</button>
            <button onClick={() => toggleWebcam()}>toggleWebcam</button>
            &emsp;|&emsp;
            <button
                onClick={() => {
                    startHls({
                        layout: {
                            type: "SPOTLIGHT",
                            priority: "PIN",
                            gridSize: 20,
                        },
                        theme: "LIGHT",
                        mode: "video-and-audio",
                        quality: "high",
                        orientation: "landscape",
                    });
                }}
            >
                Start HLS
            </button>
            <button onClick={() => stopHls()}>Stop HLS</button>
        </div>
    );
}

export function SpeakerView() {
    const { participants, hlsState } = useMeeting();

    const speakers = useMemo(() => {
        const values: any = participants.values();
        const speakerParticipants = [...values].filter(
            (participant) => {
                return participant.mode == Constants.modes.CONFERENCE;
            }
        );
        return speakerParticipants;
    }, [participants]);
    return (
        <div>
            <p>Current HLS State: {hlsState}</p>
            <Controls />

            {speakers.map((participant) => (
                <ParticipantView participantId={participant.id} key={participant.id} />
            ))}
        </div>
    );
}

export function ViewerView() {

    const playerRef: any = useRef(null);
    const { hlsUrls, hlsState } = useMeeting();
    
    useEffect(() => {
        if (hlsUrls.downstreamUrl && hlsState == "HLS_PLAYABLE") {
            if (Hls.isSupported()) {
                const hls = new Hls({
                    maxLoadingDelay: 1,
                    defaultAudioCodec: "mp4a.40.2",
                    maxBufferLength: 0,
                    maxMaxBufferLength: 1,
                    startLevel: 0,
                    startPosition: -1,
                    maxBufferHole: 0.001,
                    highBufferWatchdogPeriod: 0,
                    nudgeOffset: 0.05,
                    nudgeMaxRetry: 1,
                    maxFragLookUpTolerance: .1,
                    liveSyncDurationCount: 1,
                    abrEwmaFastLive: 1,
                    abrEwmaSlowLive: 3,
                    abrEwmaFastVoD: 1,
                    abrEwmaSlowVoD: 3,
                    maxStarvationDelay: 1
                });

                let player: any = document.querySelector("#hlsPlayer");

                hls.loadSource(hlsUrls.downstreamUrl);
                hls.attachMedia(player);
            } else {
                if (typeof playerRef.current?.play === "function") {
                    playerRef.current.src = hlsUrls.downstreamUrl;
                    playerRef.current.play();
                }
            }
        }
    }, [hlsUrls, hlsState, playerRef.current]);

    return (
        <div>
            {hlsState != "HLS_PLAYABLE" ? (
                <div>
                    <p>HLS has not started yet or is stopped</p>
                </div>
            ) : (
                hlsState == "HLS_PLAYABLE" && (
                    <div>
                        <video
                            ref={playerRef}
                            id="hlsPlayer"
                            autoPlay={true}
                            controls
                            style={{ width: "100%", height: "100%" }}
                            playsInline
                            muted={true}
                            onError={(err) => {
                                console.log(err, "hls video error");
                            }}
                        ></video>
                    </div>
                )
            )}
        </div>
    );
}

function Container({ onMeetingLeave, meetingId }: any) {

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
                    <SpeakerView />
                ) : mMeeting.localParticipant.mode == Constants.modes.VIEWER ? (
                    <ViewerView />
                ) : null
            ) : joined && joined == "JOINING" ? (
                <p>Joining the meeting...</p>
            ) : (
                <button onClick={joinMeeting}>Join</button>
            )}
        </div>
    );
}

export default function LiveStreamInterface() {

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

    const getMeetingAndToken = async (id: string) => {
        const meetingId = id == null ? await createMeeting() : id;
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
                    <Container meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
                )}
            </MeetingConsumer>
        </MeetingProvider>
    ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} />
    );
};
