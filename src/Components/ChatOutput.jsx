import React, { useEffect, useState, useContext } from 'react'
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypehighlight from "rehype-highlight";

const ChatOutput = () => {

    const { newChat, prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if (!prevChats?.length) return;

        const content = reply.split(" ");

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx + 1).join(" "));

            idx++;
            if (idx >= content.length) clearInterval(interval);
        }, 50);

        return () => clearInterval(interval);
    }, [prevChats, reply]);

    return (
        <div className='bg-gray-100'>
            {newChat && <h1> Start a new Chat</h1>}
            <div>
                {
                    prevChats?.map((chat, idx) =>
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            {chat.role === "user" ? (
                                <p className='border-2 bg-sky-100'>{chat.content}</p>
                            ) : (
                                <div className='border-2 bg-yellow-100'>
                                    <ReactMarkdown rehypePlugins={rehypehighlight}>{chat.content}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                    )
                }

                {
                    prevChats.length > 0 && latestReply !== null &&
                    <div className='gptDiv' key={"typing"}>
                        <ReactMarkdown rehypePlugins={rehypehighlight}>{latestReply}</ReactMarkdown>
                    </div>
                }

            </div>
        </div>
    )
}

export default ChatOutput;