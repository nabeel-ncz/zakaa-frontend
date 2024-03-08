"use client";
import Peer from "peerjs";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../providers/SocketProvider";

export default function LiveStreamInterface() {

    const { socket } = useContext(SocketContext);
    const [peerId, setPeerId] = useState<string>("");
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const videoRef: any = useRef(null);
    const peerClient = new Peer();

    useEffect(() => {

    }, []);

    const startVideoStreaming = () => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream: MediaStream) => {
            //attaching video stream
            attachVideoStream(stream);
            setMediaStream(stream);

            const ws = new WebSocket("ws://localhost:3000");
            //sending streaming data to server
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event: BlobEvent) => {
                if (event.data && event.data.size > 0) {
                    // send data to server
                    ws.send(event.data);
                }
            };
            mediaRecorder.start();

            socket.on("viewer-connected", ({ viewer }) => {
                connectAsViewer(viewer, stream);
            });
        })
    };

    const stopVideoCamera = () => {
        console.log('-------stop camera');
        const tracks = mediaStream?.getTracks();
        tracks?.forEach((track: any) => { track.stop() });
    }

    const handlePeerEvents = () => {

        peerClient.on("open", (peerId: string) => {
            setPeerId(peerId);
            socket.emit("connect-as-streamer", {
                streamer: peerId
            });
        });

        peerClient.on("close", () => {
            socket.emit("disconnect-as-streamer", {
                streamer: peerId
            })
        });

    }

    const attachVideoStream = (stream: MediaStream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play();
        });
    };

    const connectAsViewer = (peerId: string, stream: MediaStream) => {
        peerClient.call(peerId, stream);
    };

    return (
        <div className="w-full min-h-screen">
            <div className="">
                <button onClick={startVideoStreaming} className="w-fit px-4 py-2 rounded bg-purple-800 text-white font-bold">Start streaming</button>
                <button onClick={stopVideoCamera} className="w-fit px-4 py-2 rounded bg-purple-800 text-white font-bold">Stop Camera</button>
                <video ref={videoRef} ></video>
            </div>
        </div>
    )
}
