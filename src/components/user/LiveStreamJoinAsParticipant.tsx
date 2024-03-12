"use client";
import { Constants, useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { useEffect, useMemo, useRef } from 'react';
import ReactPlayer from 'react-player';
import LiveStreamerController from './LiveStreamerController';
import { useDispatch, useSelector } from 'react-redux';
import { TypeDispatch, TypeState } from '@/store';
import { fetchUserAction } from '@/store/actions';

function ParticipantView({
    participantId
}: {
    participantId: string
}) {

    const dispatch: TypeDispatch = useDispatch();
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
        <>
            <div className='w-full flex items-center justify-center gap-2 p-4'>
                <audio ref={micRef} autoPlay playsInline muted={isLocal} />
                <div className='h-[28rem] w-8/12 bg-white rounded px-2 py-4 shadow' style={{ aspectRatio: '16:9', transform:`scaleX(${webcamOn ? "-1" : "1"})` }}>
                    {webcamOn ? (
                        <ReactPlayer
                            playsinline
                            pip={false}
                            light={false}
                            controls={false}
                            muted={true}
                            playing={true}
                            url={videoStream}
                            height={"100%"}
                            width={"100%"}
                            onError={(err: any) => {
                                console.log(err, "participant video error");
                            }}
                        />
                    ) : (
                        <div className='w-full h-full relative'>
                            <div className="absolute left-[42%] top-[27%] w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
                                <div className="bg-purple-100 w-full h-full absolute top-0 left-0 z-0 animate-pulse"></div>
                                <img src="/icons/profile-copy-2.png" alt="" className="z-10 w-20 h-20 rounded-full" />
                            </div>
                            <div className='absolute w-full flex flex-col items-center justify-center top-[60%]'>
                                <h2 className="font-bold text-xl">{displayName || ""}</h2>
                                <h2 className="font-bold text-xl opacity-60">{"Camera has been stopped!"}</h2>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-4/12">
                    <div className="w-full h-[28rem] bg-white shadow rounded-md p-4">
                        <h2 className='font-bold text-sm mb-2'>Live chat</h2>
                        <div className='w-full h-[20rem] rounded border'>

                        </div>
                        <div className='w-full flex items-center justify-center mt-4'>
                            <input placeholder='Type here...' type="text" className='w-full px-4 py-3 rounded outline-none border text-sm' />
                            <button className='h-11 px-2 text-sm font-medium flex items-center justify-center border secondary-bg'>send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
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
        <>
            {speakers?.map((participant) => (
                <>
                    <ParticipantView participantId={participant.id} key={participant.id} />
                    <div className='w-full px-4'>
                        <LiveStreamerController participantId={participant.id} />
                    </div>
                </>
            ))}
            {/* <p>Current HLS State: {hlsState}</p> */}
        </>
    );

}
