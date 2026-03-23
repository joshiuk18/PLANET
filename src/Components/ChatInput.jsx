import { MyContext } from './MyContext.jsx';
import { useContext, useEffect, useState } from 'react';
import { RingLoader } from "react-spinners";

const ChatInput = () => {

    const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats } = useContext(MyContext);
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        setPrompt(event.target.value)
    }

    function handleKeyDown(event) {
        event.key === "Enter" ? getReply() : ''
    }

    const getReply = async () => {
        if (!prompt.trim()) return;
        const userPrompt = prompt;
        setPrompt("");
        setLoading(true);
        setPrevChats(prev => ([
            ...prev,
            { role: "user", content: userPrompt }
        ]));
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
                        contents: [
                            {
                                parts: [{ text: userPrompt }]
                            }
                        ]
                    })
                }
            );
            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
            setReply(text);
            setPrevChats(prev => ([
                ...prev,
                { role: "assistant", content: text }
            ]))
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ));
        }
        setPrompt("");
    }, [reply]);

    return (

        <div className='bg-gray-100 flex flex-col h-full py-10'>
            <div className='text-center w-full'>

                <div className='flex justify-center p-4'>
                    <RingLoader loading={loading} />
                </div>

                <div className='w-full flex items-center justify-center pb-6'>
                    <div>
                        <img src='Rotating_earth.gif' className='w-10 h-10 mr-2' />
                    </div>
                    <div>
                        <p className='text-black text-4xl'>Meet Planet, your personal AI assistant</p>
                    </div>
                </div>

                <div className='w-full max-w-3xl mx-auto'>

                    <textarea
                        type='text'
                        placeholder='Ask anything...'
                        value={prompt}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className='shadow rounded-3xl w-full max-w-2xl h-24 p-4 max-h-150 bg-white focus:outline-none resize-none overflow-y-auto'
                    />

                    <div className='flex items-center justify-between'>
                        <div className=''>
                            <button className=' text-gray-500 hover:bg-gray-200 p-2 text-md h-10 w-10 hover:rounded-full cursor-pointer'>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                            <button className=' text-gray-500 hover:bg-gray-200 cursor-pointer p-2 text-md hover:rounded-3xl'>
                                <i className="fa-solid fa-sliders"></i>
                                <span className="text-sm font-medium p-0.5">Tools</span>
                            </button>
                        </div>

                        <div className=''>
                            <button className="text-gray-500 hover:text-gray-700 text-xl pr-2">
                                <i className="fa-solid fa-microphone"></i>
                            </button>
                            <button className="text-gray-500 hover:text-gray-700 text-xl pl-2"
                                onClick={getReply}
                            >
                                <i className="fa-solid fa-paper-plane"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatInput;