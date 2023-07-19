"use client";
import { ColorModeContext } from "@contexts";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { useGetIdentity } from "@refinedev/core";
import { HamburgerMenu } from "@refinedev/mui";
import { useContext } from "react";
import { IUser } from "src/interfaces";
import { ProfileAvatar } from "./profileAvatar";
import { AuthActionHeader } from "./authActionHeader";
import Link from "next/link";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Typography } from "@mui/material";
import AppLogo from "./appLogo";


const Header = ({ sticky = true, sideMenu = true }) => {
  // const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<IUser>();
  const RightAction = () => {
    if (user) return <ProfileAvatar user={user} />
    else return <AuthActionHeader />
  }
  return (
    <AppBar position={sticky ? "sticky" : "relative"} color="transparent">
      <Toolbar>
        <Stack direction="row" width="100%" alignItems="center">
          {sideMenu ? <HamburgerMenu /> : <></>}
          {!user ? <AppLogo collapsed={false} /> : <></>}
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
            gap="16px"
          >
            {/* <IconButton color="inherit" onClick={() => { setMode(); }}>
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton> */}
            {user ? <Typography>{user?.role}</Typography> : <></>}
            <RightAction />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default Header;