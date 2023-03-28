import { useState, useEffect } from "react";

export default function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    
    const sendMessage = async () => {
        if(currentMessage !== ""){
            const messageData = {
              room: room,
              author: username,
              message: currentMessage,
              time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
             setMessageList((list) => [...list, data]);
        })
       
    }, [socket]);

    return (
    <div className="chat-window">
        <div className="chat-header">
            <p>Chat ao vivo</p>
        </div>
        <div className="chat-body">
            { messageList.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <div className="message-content">
                      <p> {messageContent.message} </p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                );
            }) }
        </div>
        <div className="chat-footer">
            <input placeholder="Type a message..." onChange={(event) => {setCurrentMessage(event.target.value)}}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
    );
};