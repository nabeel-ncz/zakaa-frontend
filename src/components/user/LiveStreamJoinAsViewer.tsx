"use client";
import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useDispatch, useSelector } from "react-redux";
import { TypeDispatch, TypeState } from "@/store";
import { fetchUserAction } from "@/store/actions";

export default function LiveStreamJoinAsViewer() {

    const playerRef: any = useRef(null);
    const { hlsUrls, hlsState } = useMeeting();
    const user: any = useSelector((state: TypeState) => state.user?.data);
    const dispatch: TypeDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAction());
    },[]);

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
        <>
            <>
                <div className='w-full flex items-center justify-center gap-2 p-4'>
                    <div className='h-[28rem] w-8/12 bg-white rounded px-2 py-4 shadow' style={{ aspectRatio: '16:9' }}>
                        {hlsState == "HLS_PLAYABLE" ? (
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
                        ) : (
                            <div className='w-full h-full relative'>
                                <div className="absolute left-[42%] top-[27%] w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
                                    <div className="bg-purple-100 w-full h-full absolute top-0 left-0 z-0 animate-pulse"></div>
                                    <img src={`${user?.profile?.avatar ? user?.profile?.avatar : "/ui/empty-profile.webp"}`} alt="" className="z-10 w-20 h-20 rounded-full" />
                                </div>
                                <div className='absolute w-full flex flex-col items-center justify-center top-[60%]'>
                                    <h2 className="font-bold text-xl opacity-60">{"HLS has not started yet or is stopped!"}</h2>
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
        </>
    );
}
