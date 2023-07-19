/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Grid, Typography } from "@mui/material";
import { HttpError, useGetIdentity, useGo, useInvalidate, useNavigation, useOne, useUpdate } from "@refinedev/core";
import { Show } from "@refinedev/mui";
import Image from "next/image";
import { useEffect } from "react";
import { useCountDownRefresh } from "src/hooks/live_chat.hook";
import { IMasterCase, IUser, MasterCaseStatus, MasterRouteName } from "src/interfaces";
import ChatQueueImage from "public/images/chat_queue.svg";
import { blue } from "@mui/material/colors";
import { RefreshButton } from "@refinedev/mui";

export default function Page({ params }: { params: { id: string } }) {
    const { show } = useNavigation();
    const invalidate = useInvalidate();
    const go = useGo();
    const [count, decrement, reset] = useCountDownRefresh(
        (state) => [state.count, state.decrement, state.resetCount]
    )
    const { data, isLoading, isError } = useOne<IMasterCase, HttpError>({
        resource: "bucket_live_chat",
        id: params.id
    });
    useEffect(() => {
        let interval: any = null;
        if (count !== 0) {
            interval = setInterval(() => {
                decrement();
            }, 1000);
        } else if (count === 0) {
            invalidate({
                resource: "MasterCase",
                invalidates: ["all"],
            });
            clearInterval(interval);
            reset();
        }
        return () => clearInterval(interval);
    }, [count]);
    useEffect(() => {
        console.log(data?.data)
        if (!data?.data) go({ to: "/customer/live_chat/chat/show/" + params.id })
    }, [data]);
    return (
        <>
            <Show
                resource="bucket_live_chat"
                title={<Typography variant="h5">Chat Queue</Typography>}
                goBack={<></>}
                headerButtons={
                    <RefreshButton
                        onClick={() => {
                            invalidate({
                                resource: "MasterCase",
                                invalidates: ["all"],
                            });
                            reset();
                        }}
                    />
                }

            >
                <Grid container>
                    <Grid item xs={8}>
                        <Image
                            src={ChatQueueImage}
                            alt="ChatQueueImage"
                            priority={false}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Grid>
                    <Grid display="flex" flexDirection="column" gap={1} item xs={4} justifyContent="center" alignItems="center" bgcolor={blue[50]} borderRadius={10}>
                        <Typography variant="h6" fontWeight="bold"> Queue Number</Typography>
                        <Typography variant="h1" fontWeight="bold"> {data?.data?.waiting_number}</Typography>
                        {data?.data?.title}
                        <Typography> Refresh Queue in {count}</Typography>
                    </Grid>
                </Grid>
            </Show>
        </>
    )
}