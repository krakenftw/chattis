import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function ChatCard({ chat, handleChatClick }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      backgroundColor='white'
      _hover={{ backgroundColor: "gray.300", cursor: "pointer" }}
      w='100%'
      p='7px'
      border='0px solid black'
      borderRadius='lg'
      onClick={() => {
        handleChatClick(chat);
      }}
    >
      <Avatar
        size={"md"}
        m='0px 7px 0 0'
        src={!chat.isGroupChat && chat.users[1].profilePic}
        name={chat.isGroupChat ? chat.chatName : chat.users[1].name}
      />
      <Text>
        {chat.isGroupChat ? chat.chatName : chat.users[1].name}
      </Text>
    </Box>
  );
}

export default ChatCard;
