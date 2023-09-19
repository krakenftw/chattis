import { Text, Box, Avatar } from "@chakra-ui/react";
import React from "react";
import { useChatState } from "../../context/ChatProvider";

function EachMessage({ message }) {
  const { user } = useChatState();

  return (
    <Box>
      <Box display={"flex"} alignItems={"center"}>
        {message.sender._id != user._id && (
          <Avatar
            size={"md"}
            margin={"0px 10px"}
            src={message.sender.profilePic}
          />
        )}
        <Text
          backgroundColor={"blue.200"}
          borderRadius={"lg"}
          padding={"2"}
          w={"auto"}
          margin={
            message.sender._id === user._id
              ? "2px 2px 2px auto"
              : "2px 2px 2px 2px"
          }
        >
          {message.content}
        </Text>
      </Box>
    </Box>
  );
}

export default EachMessage;
