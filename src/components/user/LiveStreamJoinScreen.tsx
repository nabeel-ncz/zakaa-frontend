"use client";
import { useState } from "react";

export default function LiveStreamJoinScreen(
    {
        getMeetingAndToken,
        setMode
    }: {
        getMeetingAndToken: (id?: string) => Promise<void>;
        setMode?: any
    }) {

    const [meetingId, setMeetingId] = useState<string>("");
    const [joinModalOpen, setJoinModalOpen] = useState<boolean>(false);

    const toggleModal = () => { setJoinModalOpen(state => !state) };

    return (
        <>
            <div className="w-full min-h-screen bg-white relative p-4">
                {joinModalOpen && (

                    <div className="absolute w-96 h-60 bg-white rounded shadow-xl p-4">
                        <label htmlFor="" className="text-xs font-medium:">Meeting Id</label>
                        <input
                            value={meetingId}
                            onChange={(evt) => { setMeetingId(evt.target.value) }}
                            placeholder="Type here..."
                            type="text"
                            className="border outline-none rounded px-4 py-4 w-full text-xs"
                        />
                        <button
                            className="w-full p-2 flex items-center justify-center rounded mt-1 bg-transparent border border-purple-800 text-sm font-medium text-purple-800 hover:bg-purple-200"
                            onClick={() => { getMeetingAndToken(meetingId) }}>Join as Host</button>
                        <h2 className="text-center my-2 opacity-50">OR</h2>
                        <button
                            className="w-full p-2 flex items-center justify-center rounded mt-1 border primary-bg hover:bg-purple-800 text-sm font-medium text-white"
                            onClick={() => {
                                setMode("VIEWER");
                                getMeetingAndToken(meetingId);
                            }}>Join as Viewer</button>
                    </div>

                )}
                <div className="flex flex-col items-center justify-center border border-gray-200 rounded p-4">
                    <div className="flex items-center justify-center gap-2">
                        <button className="px-4 py-2 border border-purple-800 text-purple-800 rounded text-sm font-medium">Guide</button>
                        <button onClick={toggleModal} className="px-4 py-2 primary-bg hover:bg-purple-800 rounded text-white text-sm font-medium">Join to Live</button>
                    </div>
                    <p className="text-xs font-light w-2/3 mt-2 text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id voluptas omnis quisquam pariatur. Dolores incidunt ut sapiente quis voluptatum, facilis vel doloremque, molestiae eaque expedita, similique alias dignissimos exercitationem nostrum!</p>
                </div>
            </div>
        </>
    );
}