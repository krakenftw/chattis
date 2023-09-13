import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { useChatState } from "../../context/ChatProvider";

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

    axios
      .post(
        "http://localhost:4000/messages",
        {
          content: content,
          chatId: selectedChat._id,
        },
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://localhost:4000/messages/chatId="64ec1b48fe946ce1f70c240b"`
      )
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
      <Box></Box>
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
