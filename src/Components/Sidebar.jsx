import { useContext } from "react";
import { MyContext } from "./MyContext";

function Sidebar({ sidebarOpen, toggleSidebar }) {
    const { prevChats, setCurrThreadId, setNewChat } = useContext(MyContext);

    return (

        <div className={`h-screen bg-gray-200/80 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}>

            <div className="p-2 flex items-center justify-between">
                {!sidebarOpen ? (
                    <div onClick={toggleSidebar} className="relative group cursor-pointer">
                        <img src="Rotating_earth.gif" alt="Planet" className="h-8 w-8 mt-1 ml-2 rounded-full" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition 
                        bg-gray-300 rounded-full">
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    </div>
                ) : (
                    <>
                        <img src="Rotating_earth.gif" alt="Planet" className="h-8 w-8 mt-1 ml-2 rounded-full" />
                        <div onClick={toggleSidebar} className="p-2 rounded-xl cursor-pointer hover:bg-gray-300">
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-1 p-1">
                <div className="relative group flex items-center gap-2 mx-2 rounded-xl hover:bg-gray-300 px-2 py-2 cursor-pointer">
                    <i className="fa-regular fa-pen-to-square"></i>
                    {sidebarOpen ? (
                        <span>New Chat</span>
                    ) : (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-black 
                    text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                            New Chat
                        </div>
                    )}
                </div>
                <div className="relative group flex items-center gap-2 mx-2 rounded-xl hover:bg-gray-300 px-2 py-2 cursor-pointer">
                    <i className="fa-brands fa-sistrix"></i>
                    {sidebarOpen ? (
                        <span>Search Chats</span>
                    ) : (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-black 
                    text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                            Search Chats
                        </div>
                    )}
                </div>
                <div className="relative group flex items-center gap-2 mx-2 rounded-xl hover:bg-gray-300 px-2 py-2 cursor-pointer">
                    <i className="fa-solid fa-code"></i>
                    {sidebarOpen ? (
                        <span>Codex</span>
                    ) : (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-black 
                    text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                            Codex
                        </div>
                    )}
                </div>
                <div className="relative group flex items-center gap-2 mx-2 rounded-xl hover:bg-gray-300 px-2 py-2 cursor-pointer">
                    <i className="fa-regular fa-folder-open"></i>
                    {sidebarOpen ? (
                        <span>Projects</span>
                    ) : (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-black 
                    text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                            Projects
                        </div>
                    )}
                </div>
                <div className="relative group flex items-center gap-2 mx-2 rounded-xl hover:bg-gray-300 px-2 py-2 cursor-pointer">
                    <i className="fa-solid fa-microscope"></i>
                    {sidebarOpen ? (
                        <span>Deep Research</span>
                    ) : (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-black 
                    text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                            Deep Research
                        </div>
                    )}
                </div>
                <div className="relative group flex items-center gap-2 mx-2 rounded-xl hover:bg-gray-300 px-2 py-2 cursor-pointer">
                    <i className="fa-regular fa-heart"></i>
                    {sidebarOpen ? (
                        <span>Health</span>
                    ) : (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-black 
                    text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                            Health
                        </div>
                    )}
                </div>
            </div>
            {sidebarOpen && (
                <div className="flex-1 p-4 gap-2 border">
                    <p className="font-semibold">Your Chats</p>
                    <ul className="text-sm">
                        <li>Thread 1</li>
                        <li>Thread 2</li>
                        <li>Thread 3</li>
                    </ul>
                </div>
            )}


            {sidebarOpen && (
                <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                        <p className="text-white bg-blue-600 h-8 w-8 flex items-center justify-center text-sm rounded-full">
                            PJ
                        </p>
                        <div>
                            <p className="text-sm font-semibold">Made by PLANET &hearts;</p>
                            <p className="text-xs text-gray-500">Free</p>
                        </div>
                    </div>
                    <button className="text-xs px-3 py-1 rounded-full bg-white hover:bg-gray-200 transition">
                        Upgrade
                    </button>
                </div>
            )}
        </div>
    );
}

export default Sidebar;