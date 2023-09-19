import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { useChatState } from "../../context/ChatProvider";
import EachMessage from "./EachMessage";
import { socket } from "../../socket";

function SingleChat() {
  const { selectedChat, user } = useChatState();
  const [messages, setMessages] = useState();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState();
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const handleMessageSend = () => {
    if (!content) return;
    socket.emit("chat", { message: content });
    axios
      .post(
        "http://localhost:4000/messages",
        {
          content: content,
          chatId: selectedChat._id,
        },
        config
      )
      .then((res) => {})
      .catch((err) => {
        console.log("Error", err);
      });
    setContent("");
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;
    setLoading(true);
    axios
      .get(
        `http://localhost:4000/messages/${selectedChat._id}`,
        config
      )
      .then((res) => {
        setMessages(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  return (
    <Box
      display={"flex"}
      w='100%'
      h='90%'
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      {loading && (
        <Spinner alignSelf={"center"} margin={"auto"} size={"xl"} />
      )}
      <Box overflow={"scroll"} padding={"10px 10px"}>
        {messages &&
          messages.map((each) => (
            <EachMessage key={each._id} message={each} />
          ))}
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        p='10px'
      >
        <Input
          width={"92%"}
          border={"1px solid black"}
          borderBottomEndRadius={"0px"}
          borderTopEndRadius={"0px"}
          placeholder='Dont Curse!'
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <Button
          width={"8%"}
          backgroundColor={"white"}
          border={"1px solid black"}
          borderTopStartRadius={"0px"}
          borderBottomStartRadius={"0px"}
          onClick={handleMessageSend}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
}

export default SingleChat;
