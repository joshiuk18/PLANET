import React, { useContext } from 'react';
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

const ChatOutput = () => {
    const { prevChats } = useContext(MyContext);

    return (
        <div className="w-full flex flex-col gap-3 max-w-3xl mx-auto py-4 px-2">

            {prevChats?.map((chat, idx) => (
                <div
                    key={idx}
                    className={`px-4 py-2 rounded-lg w-fit max-w-[85%]
                    ${chat.role === "user"
                            ? "ml-auto bg-gray-200 text-black"
                            : "mr-auto bg-yellow-100 text-gray-900"
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

        </div>
    );
};

export default ChatOutput;