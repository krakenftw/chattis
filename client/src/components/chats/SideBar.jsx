import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../misc/ProfileModal";
import axios from "axios";
import Loading from "../misc/Loading";
import UserListSystem from "./UserListSystem";
import { chatModel } from "../../../../api/schema/chats";
import { ArrowDown, Bell, Search } from "lucide-react";

function SideBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [search, SetSearch] = useState();
  const [searchResult, SetSearchResult] = useState();
  const [loading, SetLoading] = useState(false);
  const [loadingChats, SetLoadingChats] = useState();
  const { user, setSelectedChat, selectedChat, setChats, chats } =
    useChatState();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/homepage");
  };
  const toast = useToast();
  const handleUserSearch = () => {
    if (!search) {
      return toast({
        description: "Search query is empty",
        status: "error",
      });
    }
    SetLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      axios
        .get(`/api/user/search?search=${search}`, config)
        .then((res) => {
          SetSearchResult(res.data);
          SetLoading(false);
        })
        .catch((err) => {
          console.log(err);
          SetLoading(false);
        });
    } catch (err) {
      console.log(err);
      SetLoading(false);
      return toast({
        description: "An error occurred",
        status: "error",
      });
    }
  };
  const handleUserChat = (newUser) => {
    SetLoadingChats(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios
      .post("/api/chat/create", { userId: newUser._id }, config)
      .then((res) => {
        setSelectedChat(res.data);
        console.log(chats.find((each) => each._id == res.data._id));
        setChats((chats) => [...chats, res.data]);
        SetLoadingChats(false);
      })
      .catch((err) => {
        console.log(err);
        SetLoadingChats(false);
        toast({ description: "An error occurred", status: "error" });
      });
  };
  return (
    <div>
      <Box
        display='flex'
        justifyContent='space-between'
        bg={"white"}
        alignItems='center'
        w='100%'
        p='5px 10px'
      >
        <Tooltip
          label='Search user to chats'
          hasArrow
          placement='bottom-end'
        >
          <Button variant='ghost' ref={btnRef} onClick={onOpen}>
            <Search />
            <Text d={{ base: "none", md: "flex" }} px='4'>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize='2xl'>CHATTIS</Text>
        <Box display='flex'>
          <Menu>
            <MenuButton w='30px' alignItems='center'>
              <Text>
                <Bell />
              </Text>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ArrowDown />}>
              <Avatar
                w='40px'
                h='40px'
                name={user.name}
                src={user.profilePic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>

              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box display='flex'>
              <Input
                onChange={(e) => {
                  SetSearch(e.target.value);
                }}
                placeholder='Type here...'
              />
              <Button onClick={handleUserSearch}>Search</Button>
            </Box>
            {loading ? (
              <Loading />
            ) : searchResult ? (
              searchResult.map((each) => (
                <UserListSystem
                  each={each}
                  handleUserChat={() => {
                    handleUserChat(each);
                  }}
                  key={each._id}
                />
              ))
            ) : (
              ""
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default SideBar;
