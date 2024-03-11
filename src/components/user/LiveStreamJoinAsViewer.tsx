"use client";
import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";

export default function LiveStreamJoinAsViewer() {

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
