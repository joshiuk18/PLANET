import Navbar from './Navbar.jsx';
import Chat from './Chat.jsx';
import Footer from './Footer.jsx';

const ChatWindow = () => {
    return (
        <div className="flex flex-col h-full">
            <Navbar />
            <div className="flex-1 overflow-auto">
                <Chat />
            </div>
            <Footer />
        </div>
    )
}

export default ChatWindow;