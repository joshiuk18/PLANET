import React from 'react';
import ChatInput from './ChatInput.jsx';
import ChatOutput from './ChatOutput.jsx';

const Chat = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">


            <div className="flex-1 overflow-y-auto">
                <ChatOutput />
            </div>


            <div className="shrink-0 bg-gray-100">
                <ChatInput />
            </div>

        </div>
    );
};

export default Chat;