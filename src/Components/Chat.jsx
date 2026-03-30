import React from 'react'
import ChatInput from './ChatInput.jsx';
import ChatOutput from './ChatOutput.jsx';

const Chat = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                <ChatOutput />
            </div>
            <div className="flex-none">
                <ChatInput />
            </div>
        </div>
    )
}

export default Chat
