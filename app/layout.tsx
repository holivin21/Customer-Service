"use client";

import React from "react";

import { CanAccess, Refine, useGetIdentity } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router/app";

import { authProvider } from "src/utility/authProvider";
import { supabaseClientPublic } from "src/utility";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { RefineSnackbarProvider, RefineThemes, notificationProvider } from "@refinedev/mui";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/nextjs-router";
import { ColorModeContextProvider } from "@contexts/index";
import { IUser, IUserToken, MasterRouteName } from "src/interfaces";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import accessControl from "src/utility/accessControl";
import DashboardIcon from '@mui/icons-material/Dashboard';
export default function RootLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <ColorModeContextProvider >
            <ThemeProvider theme={RefineThemes.Blue}>
                <CssBaseline />
                <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
                <RefineKbarProvider>
                    <html lang="en">
                        <body>
                            <RefineSnackbarProvider>
                                <Refine

                                    routerProvider={routerProvider}
                                    liveProvider={liveProvider(supabaseClientPublic)}
                                    dataProvider={{
                                        default: dataProvider(supabaseClientPublic),
                                    }}
                                    authProvider={authProvider()}
                                    notificationProvider={notificationProvider}
                                    accessControlProvider={accessControl()}
                                    resources={[
                                        {
                                            name: MasterRouteName.Home,
                                            list: "/home",
                                            meta: { hide: true }
                                        },
                                        {
                                            name: MasterRouteName.AgentDashboard,
                                            list: "/agent/dashboard",
                                            meta: {
                                                label: "Dashboard",
                                                icon: <DashboardIcon />
                                            }
                                        },
                                        {
                                            name: MasterRouteName.AgentLiveChat,
                                            list: "/agent/live_chat",
                                            meta: {
                                                label: "Live Chat",
                                                icon: <ChatBubbleIcon />
                                            }
                                        },
                                        {
                                            name: MasterRouteName.AgentChat,
                                            show: "/agent/live_chat/chat/:id",
                                            meta: {
                                                parent: MasterRouteName.AgentLiveChat
                                            }
                                        },
                                        {
                                            name: MasterRouteName.CustomerLiveChat,
                                            show: "/customer/live_chat/show/:id",
                                            create: "/customer/live_chat/create",
                                            list: "/customer/live_chat",
                                            meta: {
                                                label: "Live Chat",
                                                icon: <ChatBubbleIcon />
                                            }
                                        },
                                        {
                                            name: MasterRouteName.CustomerChat,
                                            show: "/customer/live_chat/chat/show/:id",
                                            meta: {
                                                label: "Chat",
                                                icon: <ChatBubbleIcon />
                                            }
                                        }
                                    ]}
                                    options={{
                                        syncWithLocation: true,
                                        mutationMode: "pessimistic",
                                        liveMode: "auto",
                                    }}
                                >
                                    {children}
                                    {/* <UnsavedChangesNotifier /> */}
                                    <DocumentTitleHandler />
                                </Refine>
                            </RefineSnackbarProvider>
                        </body>
                    </html>
                </RefineKbarProvider>
            </ThemeProvider >
        </ColorModeContextProvider>
    );
}
