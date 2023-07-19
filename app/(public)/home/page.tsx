"use client"

import CustomThemeLayout from "@components/customThemeLayout";
import Header from "@components/header";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { blue, green, grey, indigo, lightBlue, purple, red, yellow } from "@mui/material/colors";
import { useGetIdentity, useGo } from "@refinedev/core";
import { ThemedLayoutV2 } from "@refinedev/mui";
import Image from "next/image";
import ChatSupportImage from "public/images/chat_support.svg";
import { IUser } from "src/interfaces";


export default function Page() {
    const { data: user } = useGetIdentity<IUser>()
    const go = useGo();
    return (
        <>
            <Grid container height="100%" spacing={2}>
                <Grid item xs={6} container height="100%" direction="column" spacing={2}>
                    <Grid item xs={12} >
                        <Box display="flex" flexDirection="column" alignItems="start" justifyContent="center" borderRadius={8} p={2} height="100%" gap={4}>
                            <Typography variant="h3">Empowering Your Success, One Support Ticket at a Time</Typography>
                            <Typography variant="h6">
                                Welcome to our Customer Support Service. Our dedicated team is here to assist you with any questions, concerns, or issues you may have. We pride ourselves on delivering prompt and reliable support to ensure your satisfaction.
                            </Typography>
                            {!user ? <Button onClick={() => go({ to: "/register" })}>Register</Button> : <></>}
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" alignItems="center" p={4} borderRadius={50} bgcolor={lightBlue[50]} height="100%" >
                        <Image
                            src={ChatSupportImage}
                            alt="ChatSupportImage"
                            priority={false}
                            style={{ objectFit: "fill", width: "100%", height: "100%" }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}