"use client";
import Peer from "peerjs";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../providers/SocketProvider";

export default function LiveViewInterface() {

    const { socket } = useContext(SocketContext);
    const [peerId, setPeerId] = useState<string>("");
    const videoRef: any = useRef(null);
    const peerClient = new Peer();

    useEffect(() => {
        
    }, []);

    const handleEvents = () => {

        peerClient.on("open", (peerId: string) => {
            setPeerId(peerId);
            socket.emit("connect-as-viewer", { viewer: peerId });
        });

        peerClient.on("call", (call) => {
            call.answer();
            call.on("stream", (stream) => {
                attachVideoStream(stream);
            })
        });

        peerClient.on("connection", (conn) => {
            conn.on("close", () => {
                socket.emit("disconnect-as-viewer", { viewer: peerId });
                setTimeout(reloadPage, 1000);
            });
        })

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

    const reloadPage = () => {
        window.location.reload();
    }

    return (
        <div className="w-full min-h-screen">
            <div className="">
                <video ref={videoRef} ></video>
            </div>
        </div>
    )
}
