"use client";
import { Constants, useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Controls } from './LiveStreamInterface';

function ParticipantView({
    participantId
}: {
    participantId: string
}) {

    const micRef: any = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
        useParticipant(participantId);

    const videoStream = useMemo(() => {
        if (webcamOn && webcamStream) {
            const mediaStream = new MediaStream();
            mediaStream.addTrack(webcamStream.track);
            return mediaStream;
        }
    }, [webcamStream, webcamOn]);

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

export default function LiveStreamJoinAsParticipant() {

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
