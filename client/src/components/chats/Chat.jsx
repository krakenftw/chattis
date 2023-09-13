import { Box, Button, Divider, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useChatState } from "../../context/ChatProvider";
import MyChats from "./MyChats.jsx";
import ChatBox from "./ChatBox.jsx";
import SideBar from "./SideBar.jsx";

function Chat() {
  // const [chats, setChats] = useState(["bdhsfs", "sjbdg", "dsgsd"]);
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
      {user && <SideBar />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        p="7px"
        w="100%"
        h="92.5vh"
        m="auto"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </>
  );
}

export default Chat;
