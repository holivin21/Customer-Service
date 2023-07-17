"use client"
import { Show, ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/mui";
import Header from "./header";
import { useGetIdentity } from "@refinedev/core";
import { IUser } from "src/interfaces";
import { Box } from "@mui/material";
import { Link } from "@mui/icons-material";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AppLogo from "./appLogo";


export default function CustomThemeLayout(props: { children: React.ReactNode, showSideBar: boolean }) {
    let showSideBar = props.showSideBar;
    const { data: user } = useGetIdentity<IUser>();
    if (!user) showSideBar = false;
    return (
        <ThemedLayoutV2
            Sider={() => showSideBar ? <ThemedSiderV2 Title={AppLogo} /> : <></>}
            Header={() => <Header sideMenu={showSideBar} />}
        >
            {props.children}

        </ThemedLayoutV2>
    )
}