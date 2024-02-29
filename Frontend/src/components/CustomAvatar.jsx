import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Button,
} from "@chakra-ui/react";
function CustomAvatar({ handleLogout, user }) {
  const logout = () => {
    handleLogout();
  };
  return (
    <Menu>
      <MenuButton
        as={Avatar}
        name={user.name}
        src={`https://react-app-a0ys.onrender.com/users/images/${user.image}`}
      />
      <MenuList>
        <MenuGroup color={"blueviolet"} title="Profile">
          <MenuItem color={"black"}>My Account</MenuItem>
          <MenuItem color={"black"} onClick={logout}>
            Logout{" "}
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default CustomAvatar;
