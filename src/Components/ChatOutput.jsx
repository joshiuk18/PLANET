import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const ChatOutput = () => {
    const { prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState("");

    useEffect(() => {
        if (!reply) return;

        const words = reply.split(" ");
        let idx = 0;
        setLatestReply(""); // reset previous animation

        const interval = setInterval(() => {
            idx++;
            setLatestReply(words.slice(0, idx).join(" "));
            if (idx >= words.length) clearInterval(interval);
        }, 50);

        return () => clearInterval(interval);
    }, [reply]);

    return (
        <div className='bg-gray-100 h-full p-4 flex flex-col gap-4'>
            {prevChats?.map((chat, idx) => (
                <div
                    key={idx}
                    className={`max-w-3xl px-4 py-2 rounded-lg ${chat.role === "user"
                        ? "self-end bg-sky-100 text-gray-900"
                        : "self-start bg-yellow-100 text-gray-900"
                        }`}
                >
                    {chat.role === "user" ? (
                        <p>{chat.content}</p>
                    ) : (
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {chat.content}
                        </ReactMarkdown>
                    )}
                </div>
            ))}
            {latestReply && (
                <div className="self-start max-w-3xl px-4 py-2 rounded-lg bg-yellow-100 text-gray-900">
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {latestReply}
                    </ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default ChatOutput;