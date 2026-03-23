import React from 'react'
import Navbar from './Navbar.jsx';
import Chat from './Chat.jsx';
import Footer from './Footer.jsx';

const ChatWindow = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-none">
                <Navbar />
            </div>

            <div className="flex-1">
                <Chat />
            </div>

            <div className="flex-none">
                <Footer />
            </div>
        </div>
    )
}

export default ChatWindow