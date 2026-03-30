import './App.css'
import { useState, useMemo } from "react";
import Sidebar from './Components/Sidebar.jsx';
import ChatWindow from './Components/ChatWindow.jsx';
import { MyContext } from './Components/MyContext.jsx';
import { v4 as uuidv4 } from "uuid";

function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [currThreadId, setCurrThreadId] = useState(uuidv4());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(prev => !prev);
  }

  const providerValues = useMemo(() => ({
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat
  }), [prompt, reply, currThreadId, prevChats, newChat]);

  return (
    <MyContext.Provider value={providerValues}>
      <div className='w-full h-screen flex'>
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className='flex-1 h-full'>
          <ChatWindow />
        </div>
      </div>
    </MyContext.Provider >
  )
}

export default App;