import './App.css'
import { useState } from "react";
import Sidebar from './Components/Sidebar.jsx';
import ChatWindow from './Components/ChatWindow.jsx';
import { MyContext } from './Components/MyContext.jsx';
import { v1 as uuidv1 } from "uuid";

function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [currThreadId, setCurrThreadId] = useState(uuidv1);
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat
  };

  return (
    <>
      <MyContext.Provider value={providerValues}>
        <div className='w-full h-screen flex'>
          <div className='w-1/6 h-full'>
            <Sidebar />
          </div>
          <div className='w-5/6 h-full'>
            <ChatWindow />
          </div>
        </div>
      </MyContext.Provider>
    </>
  )
}

export default App;