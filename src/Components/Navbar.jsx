import React, { useState, useRef, useEffect } from 'react'

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);

    const dropdownRef = useRef(null);

    function handleClick() {
        setOpen(!open);
    }

    function openModal() {
        setSignupOpen(true);
    }

    function closeModal() {
        setSignupOpen(false);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (signupOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [signupOpen]);

    return (
        <div>
            <div className='flex justify-between w-full bg-gray-100 px-6 py-4'>
                <div ref={dropdownRef}>
                    <button
                        onClick={handleClick}
                        className='cursor-pointer text-lg pl-3 py-1 rounded-xl hover:bg-gray-200 hover:scale-110 transition duration-200'
                    >
                        Planet
                        <i className="fa-solid fa-angle-down mr-2 text-gray-400"></i>
                    </button>

                    {open && (
                        <div className="absolute mt-2 w-72 bg-white shadow-lg">
                            <img
                                className="rounded-t-xl h-36 w-full"
                                src='color.webp'
                            />

                            <div className='p-4'>
                                <h2 className="font-semibold text-lg">
                                    Try advanced features for free
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    Get smarter responses, upload files, create images and more by logging in.
                                </p>
                                <div className="flex gap-2 mt-4 w-full">
                                    <button className="bg-blue-700 text-white py-1 rounded-full w-28 cursor-pointer">
                                        Log in
                                    </button>
                                    <button className="border py-1 rounded-full w-42 cursor-pointer">
                                        Sign up for free
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                <div className="flex items-center gap-4">
                    <button
                        onClick={openModal}
                        className="px-6 py-1 bg-blue-700 text-white rounded-full cursor-pointer hover:scale-110 transition duration-200">
                        Log in
                    </button>
                    <button
                        onClick={openModal}
                        className="px-4 py-1 border rounded-full cursor-pointer hover:scale-110 transition duration-200">
                        Sign up for free
                    </button>
                    <i className="fa-regular fa-circle-question text-lg cursor-pointer hover:text-gray-600"></i>

                    {signupOpen && (
                        <div>
                            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs"
                                onClick={closeModal}>
                                <div className="relative w-96 bg-white rounded-2xl shadow-xl p-8"
                                    onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={closeModal}
                                        className="absolute right-4 top-4 text-gray-500 hover:text-black cursor-pointer">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    <h2 className="text-2xl font-semibold text-center">
                                        Log in or sign up
                                    </h2>
                                    <p className="text-center text-gray-500 text-sm mt-2 mb-6">
                                        You'll get smarter responses and can upload files, images, and more.
                                    </p>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-center gap-3 border rounded-full py-3 hover:bg-gray-200">
                                            <i className="fa-brands fa-google"></i>
                                            Continue with Google
                                        </button>
                                        <button className="w-full flex items-center justify-center gap-3 border rounded-full py-3 hover:bg-gray-200">
                                            <i className="fa-brands fa-apple"></i>
                                            Continue with Apple
                                        </button>
                                        <button className="w-full flex items-center justify-center gap-3 border rounded-full py-3 hover:bg-gray-200">
                                            <i className="fa-solid fa-phone"></i>
                                            Continue with phone
                                        </button>
                                    </div>
                                    <div className="flex items-center my-6">
                                        <div className="flex-1 border-t"></div>
                                        <span className="px-3 text-sm text-gray-500">OR</span>
                                        <div className="flex-1 border-t"></div>
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        className="w-full border rounded-full px-4 py-3 outline-none focus:ring-1 focus:ring-black"
                                    />
                                    <button className="w-full mt-4 bg-black text-white py-3 rounded-full font-medium hover:bg-gray-900">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div >

            </div>
        </div>
    )
}

export default Navbar;