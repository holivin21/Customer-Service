"use client";

import { Google } from "@mui/icons-material";
import { AuthPage } from "@refinedev/mui";
import GoogleIcon from '@mui/icons-material/Google';
import { Box, Stack } from "@mui/material";


export default function Login() {
    return (
        <>
            <AuthPage
                type="login"
                renderContent={(
                    content: React.ReactNode,
                    title: React.ReactNode,
                ) => {
                    return (
                        <div>
                            <Stack direction="row" width="50vw" justifyContent="space-between">
                                <Box>
                                    Agent<br />
                                    email: agent@supabase.com<br />
                                    password: agent123<br />
                                </Box>
                                <div>
                                    Customer<br />
                                    email: customer@supabase.com<br />
                                    password: customer123<br />
                                </div>
                            </Stack>
                            {title}
                            {content}
                        </div>
                    );
                }}
                formProps={{
                    defaultValues: {
                        email: "customer@supabase.com",
                        password: "customer123"
                    }
                }}
                // providers={[
                //     {
                //         name: "google",
                //         label: "Sign in with Google",
                //         icon: <GoogleIcon />,
                //     },
                // ]}
            />
        </>
    );
}

Login.layout = "auth";
