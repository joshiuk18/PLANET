import { useState } from "react"

const Sidebar = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function handleClick() {
        setSidebarOpen(!sidebarOpen);
    };

    const sidebarItems = [
        { icon: "fa-regular fa-pen-to-square", label: "New Chat" },
        { icon: "fa-brands fa-sistrix", label: "Search Chats" },
        { icon: "fa-regular fa-images", label: "Images" },
        { icon: "fa-brands fa-google-play", label: "Apps" },
        { icon: "fa-solid fa-code", label: "Codex" },
        { icon: "fa-regular fa-folder-open", label: "Projects" },
        { icon: "fa-solid fa-microscope", label: "Deep Research" },
        { icon: "fa-regular fa-heart", label: "Health" },
    ];


    return (

        <div className="flex h-screen">
            <div className={`bg-gray-200 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}>
                <div>

                    {/* Top Menu */}
                    <div className="p-2 flex items-center justify-between">
                        {sidebarOpen && (
                            <img src="Rotating_earth.gif" className="h-8 w-8 rounded-full cursor-pointer" />
                        )}
                        <div className="relative group p-2 rounded-xl cursor-pointer hover:bg-gray-300 transition" onClick={handleClick}>
                            <i className="fa-solid fa-bars"></i>
                            <div className="absolute left-full ml-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-black 
                            text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
                                {sidebarOpen ? "Collapse Menu" : "Expand Menu"}
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div>
                        <div className="flex flex-col gap-2 p-2">
                            {sidebarItems.map((item, index) => (
                                <div key={index} className="relative group flex items-center gap-2 rounded-xl hover:bg-gray-300 px-2 py-1 cursor-pointer" >
                                    <i className={item.icon}></i>
                                    {sidebarOpen ? (<span>{item.label}</span>) : (
                                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-black 
                                        text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
                                            {item.label}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {sidebarOpen && (
                        <div className="mt-auto px-2 border-gray-300">
                            <p className="font-semibold mb-2 px-2">Your Chats</p>
                            <ul className="mb-4 space-y-1 text-sm px-2">
                                <li>Thread 1</li>
                                <li>Thread 2</li>
                                <li>Thread 3</li>
                            </ul>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img
                                        src="Rotating_earth.gif"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">Made by PLANET &hearts;</p>
                                        <p className="text-xs text-gray-500">Free</p>
                                    </div>
                                </div>
                                <button className="text-xs px-3 py-1 border rounded-full bg-white hover:bg-gray-100">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Sidebar
