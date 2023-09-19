import { Box, Button, Divider, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import MyChats from "./MyChats.jsx";
import ChatBox from "./ChatBox.jsx";
import SideBar from "./SideBar.jsx";
import { socket } from "../../socket.js";

function Chat() {
  // const [chats, setChats] = useState(["bdhsfs", "sjbdg", "dsgsd"]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  console.log("socket", isConnected);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    socket.emit("chat", { message: "smxx" });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);
  const { user } = useChatState();
  // const getUserChats = async () => {
  //     const headers = {
  //         Authorization: `Bearer ${user.token}`
  //     }
  //     axios.get("http://localhost:4000/chat/get", {
  //         userId: user._id,
  //         headers: headers
  //     }).then((res) => {
  //         console.log(res);
  //         setChats(res.data)
  //     })
  //         .catch((err) => {
  //             console.log(err);
  //         })
  // }
  // useEffect(() => {
  //     getUserChats();
  // }, [])

  return (
    <>
      <h1>{isConnected ? "🟢" : "🔴"}</h1>
      {user && <SideBar />}
      <Box
        display='flex'
        justifyContent={"space-between"}
        p='7px'
        w='100%'
        h='92.5vh'
        m='auto'
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </>
  );
}

export default Chat;
