"use client"

import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { useGetIdentity, useGo } from "@refinedev/core";
import { IUser } from "@utility/interface";
import Image from "next/image";


export default function Page() {
    const { data: user } = useGetIdentity<IUser>()
    const go = useGo();
    return (
        <>
        hello
            {/* <Grid height="100%" >
                <GridItem   height="100%" dir="column" >
                    <GridItem >
                        <Box display="flex" flexDirection="column" alignItems="start" justifyContent="center" borderRadius={8} p={2} height="100%" gap={4}>
                            <Text >Empowering Your Success, One Support Ticket at a Time</Text>
                            <Text >
                                Welcome to our Customer Support Service. Our dedicated team is here to assist you with any questions, concerns, or issues you may have. We pride ourselves on delivering prompt and reliable support to ensure your satisfaction.
                            </Text>
                            {!user ? <Button onClick={() => go({ to: "/register" })}>Register</Button> : <></>}
                        </Box>
                    </GridItem>
                </GridItem>
                <GridItem>
                    <Box display="flex" alignItems="center" p={4} borderRadius={50} bgColor={"lightblue"} height="100%" >
                        <Image
                            src={"public/images/chat-support.svg"}
                            alt="ChatSupportImage"
                            priority={false}
                            width={500}
                            height={500}
                            style={{ objectFit: "fill", width: "100%", height: "100%" }}
                        />
                    </Box>
                </GridItem>
            </Grid> */}
        </>
    )
}