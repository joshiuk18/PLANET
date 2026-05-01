import { MyContext } from './MyContext.jsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { ScaleLoader } from "react-spinners";

const ChatInput = () => {
    const { prompt, setPrompt, setPrevChats } = useContext(MyContext);
    const [loading, setLoading] = useState(false);

    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [prompt]);

    const handleChange = (e) => setPrompt(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            getReply();
        }
    };

    const getReply = async () => {
        if (!prompt.trim()) return;

        setLoading(true);

        setPrevChats(prev => [
            ...prev,
            { role: "user", content: prompt }
        ]);

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
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                }
            );

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

            setPrevChats(prev => [
                ...prev,
                { role: "assistant", content: text }
            ]);

            setPrompt("");

        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div className="w-full bg-gray-100 p-3">


            <div className="flex justify-center mb-2">
                <ScaleLoader loading={loading} />
            </div>
            <div className='w-full flex items-center justify-center pb-6'>
                <img src='/Rotating_earth.gif' className='h-10 w-10 mr-4' />
                <p className='text-black text-4xl'>Meet Planet, your personal AI assistant</p>
            </div>

            <div className="flex items-center bg-white rounded-full px-4 py-2 max-w-3xl mx-auto shadow-sm">

                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={prompt}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="What's on your mind?"
                    className="flex-1 resize-none outline-none border-none"
                />

                <button
                    onClick={getReply}
                    disabled={!prompt.trim()}
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200"
                >
                    {prompt.trim() ? (
                        <i className="fa-solid fa-arrow-up"></i>
                    ) : (
                        <i className="fa-solid fa-microphone"></i>
                    )}
                </button>

            </div>
        </div>
    );
};

export default ChatInput;