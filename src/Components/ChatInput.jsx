import { MyContext } from './MyContext.jsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { ScaleLoader } from "react-spinners";

const ChatInput = () => {
    const { prompt, setPrompt, reply, setReply, prevChats, setPrevChats } = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [prompt]);

    const handleChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            getReply();
        }
    };

    const getReply = async () => {
        if (!prompt.trim()) return;

        const userPrompt = prompt;
        setPrompt("");
        setLoading(true);

        // Add user message to chat
        setPrevChats(prev => ([...prev, { role: "user", content: userPrompt }]));

        try {
            const response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY
                    },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: userPrompt }] }]
                    })
                }
            );

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

            // Add AI reply to chat
            setReply(text);
            setPrevChats(prev => ([...prev, { role: "assistant", content: text }]));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-gray-100 flex flex-col h-full py-14'>
            <div className='text-center w-full'>
                <div className='flex justify-center p-4'>
                    <ScaleLoader loading={loading} />
                </div>
                <div className='w-full flex items-center justify-center pb-6'>
                    <img src='/Rotating_earth.gif' className='h-10 w-10 mr-4' />
                    <p className='text-black text-4xl'>Meet Planet, your personal AI assistant</p>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl 
                    px-4 py-2 shadow-sm max-w-3xl mx-auto">
                    <button className='h-10 w-10 text-gray-600 hover:bg-gray-100 text-md hover:rounded-full cursor-pointer'>
                        <i className="fa-solid fa-paperclip"></i>
                    </button>

                    <textarea
                        rows={1}
                        ref={textareaRef}
                        value={prompt}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="What's on your mind?"
                        className="flex-1 resize-none border-none outline-none bg-transparent text-gray-900 scrollbar-hide" />

                    <button
                        type="button"
                        onClick={getReply}
                        disabled={!prompt.trim()}
                        className='text-gray-600 hover:bg-gray-200 text-md h-10 w-10 rounded-full cursor-pointer' >
                        {prompt.trim() === "" ? (
                            <i className="fa-solid fa-microphone"></i>
                        ) : (
                            <i className="fa-solid fa-arrow-up"></i>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;