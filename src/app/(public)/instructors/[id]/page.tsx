"use client";
import { TypeDispatch } from "@/store";
import { getUsersByUsernameAction } from "@/store/actions/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function page({ params }: { params: { id: string } }) {

    const dispatch: TypeDispatch = useDispatch();
    interface UserInterface {
        _id: string
        profile: { avatar: string }
        username: string
        email: string
        contact?: {
            socialMedia?: {
                instagram?: string;
                linkedIn?: string;
                github?: string;
            }
        };
    };
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(getUsersByUsernameAction({
            username: params.id
        }))
            .then((res) => { setUser(res.payload?.data[0]) })
            .finally(() => { setLoading(false) });
    }, []);

    return (
        <main className="profile-page">
            <section className="relative block min-h-[40vh]">
                <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/abstract-background-made-wavy-lines-purple-colors_444390-18195.jpg')" }} >
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
                    <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                        <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                    </svg>
                </div>
            </section>
            <section className="relative py-16 bg-gray-200">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        {!loading && !user && (
                            <div className="px-6 py-4 min-h-[40vh]">
                                <h3 className="text-2xl mt-2 text-center font-semibold leading-normal text-blueGray-700 mb-2">
                                    Unfortunately, User doesn't found
                                </h3>
                                <div className="w-full flex items-center justify-center mt-4">
                                    <img src="/icons/not-found.png" alt="" className="h-96" />
                                </div>
                            </div>
                        )}
                        {!loading && user && (
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <img src={user?.profile?.avatar || "/ui/empty-profile.webp"} className="absolute -top-12 shadow-xl w-24 h-24 rounded-full" />
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-32 sm:mt-0">
                                            <button className="bg-purple-800 hover:bg-pruple-900 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">0</span><span className="text-sm text-blueGray-400">Courses</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">0</span><span className="text-sm text-blueGray-400">Posts</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                        {user?.username}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        {user?.email}
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-base leading-relaxed text-blueGray-700">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                                            </p>
                                            <p className="mb-4 text-base leading-relaxed text-blueGray-700">
                                                Instagram: {user?.contact?.socialMedia?.instagram || "Not given"}
                                            </p>
                                            <p className="mb-4 text-base leading-relaxed text-blueGray-700">
                                                Github: {user?.contact?.socialMedia?.github || "Not given"}
                                            </p>
                                            <p className="mb-4 text-base leading-relaxed text-blueGray-700">
                                                LinkedIn: {user?.contact?.socialMedia?.linkedIn || "Not given"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}
