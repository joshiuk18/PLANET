import Navbar from './Navbar.jsx';
import Chat from './Chat.jsx';
import Footer from './Footer.jsx';

const ChatWindow = () => {
    return (
        <div className="flex flex-col h-full">

            <Navbar />

            <Chat />

            <Footer />

        </div>
    )
}

export default ChatWindow;