import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";

export default function LiveStreamerController({ participantId }: {
    participantId: string;
}) {

    const { leave, toggleMic, toggleWebcam, startHls, stopHls, hlsState } = useMeeting();
    const { micOn, webcamOn } = useParticipant(participantId);

    return (
        <div className="w-full bg-white py-4 rounded shadow flex">
            <div className="w-8/12 flex items-center justify-center gap-2">

                <button
                    onClick={() => leave()}
                    className="rounded-full w-24 h-12 flex items-center justify-center bg-white border text-sm hover:bg-gray-100 shadow-md">
                    <img src="/icons/phone-call-end.png" alt="" className="w-6" />
                </button>
                <button
                    onClick={() => toggleMic()}
                    className="rounded-full w-24 h-12 flex items-center justify-center bg-white border text-sm hover:bg-gray-100 shadow-md">
                    {micOn ? (
                        <img src="/icons/microphone.png" alt="" className="w-5" />
                    ) : (
                        <img src="/icons/mute.png" alt="" className="w-5" />
                    )}
                </button>
                <button
                    onClick={() => toggleWebcam()}
                    className="rounded-full w-24 h-12 flex items-center justify-center bg-white border text-sm hover:bg-gray-100 shadow-md">
                    {webcamOn ? (
                        <img src="/icons/pause.png" alt="" className="w-6" />
                    ) : (
                        <img src="/icons/play-button.png" alt="" className="w-6" />
                    )}
                </button>

                {hlsState === 'HLS_STOPPED' && (
                    <button
                        className="rounded-full w-24 h-12 flex items-center justify-center bg-white border text-sm hover:bg-gray-100 shadow-md"
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
                        <img src="/icons/no-signal.png" alt="" className="w-5" />
                    </button>
                )}
                {(hlsState === 'HLS_STARTED' || hlsState === 'HLS_STARTING' || hlsState === 'HLS_PLAYABLE') && (
                    <button
                        className="rounded-full w-24 h-12 flex items-center justify-center bg-white border text-sm hover:bg-gray-100 shadow-md"
                        onClick={() => stopHls()}>
                        <img src="/icons/wifi.png" alt="" className="w-5" />
                    </button>
                )}
            </div>
            <div className="w-4/12 flex items-center justify-end gap-2 px-4">
                <div className="w-fit">
                    <span className="py-2 px-2 bg-white text-sm font-medium">Streaming status : </span>
                    {hlsState === 'HLS_STARTED' && <span className="py-2 px-2 bg-green-800 text-white text-sm font-medium">Started</span>}
                    {hlsState === 'HLS_STARTING' && <span className="py-2 px-2 bg-green-800 text-white text-sm font-medium">Starting...</span>}
                    {hlsState === 'HLS_PLAYABLE' && <span className="py-2 px-2 bg-green-800 text-white text-sm font-medium">Playable</span>}
                    {hlsState === 'HLS_STOPPED' && <span className="py-2 px-2 bg-red-800 text-white text-sm font-medium">Stopped</span>}
                </div>
            </div>
        </div>
    );
}