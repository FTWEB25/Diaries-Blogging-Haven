import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import CustomAvatar from "./CustomAvatar";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromStorage) {
      setUser(userFromStorage);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="blue.500"
      color="white"
    >
      {/* Logo */}
      <Box>
        <Image src="/logo.png" alt="Logo" boxSize="40px" />
      </Box>

      <Box display={"flex"} gap={5}>
        <Input type="search" bg={"whitesmoke"} placeholder="Search a Blog" />
        <Button color="black" bg={"whitesmoke"}>
          Search
        </Button>
      </Box>

      <Flex align="center" gap={"10px"}>
        <Link to="/" mr={4}>
          Home
        </Link>
        <Link to="#" mr={4}>
          About
        </Link>
        <Menu>
          <MenuButton
            as={Button}
            variant="link"
            color="white"
            rightIcon={<ChevronDownIcon />}
          >
            Services
          </MenuButton>
          <MenuList>
            <MenuItem color={"black"}>
              <Link to="/blog?type=create" mr={4}>
                Create A blog
              </Link>
            </MenuItem>
            <MenuItem color={"black"}>Update A Blog</MenuItem>
            <MenuItem color={"black"}>Delete A Blog</MenuItem>
            <MenuItem color={"black"}>See Your Blogs</MenuItem>
          </MenuList>
        </Menu>
        <Link to="#" mr={4}>
          Contact
        </Link>
      </Flex>

      <Flex align="center">
        {isLoggedIn ? (
          <CustomAvatar user={user} handleLogout={handleLogout} />
        ) : (
          <Link to="/login">
            <Button colorScheme="teal">Login</Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
