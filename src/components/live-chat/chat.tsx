
"use client"
import React, { useEffect, useRef, useState } from "react";
import { HttpError, useCreate, useGetIdentity, useGo, useList, useUpdate } from "@refinedev/core";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { IDialog } from "@utility/interface";
import { Box, Text } from "@chakra-ui/react";
import MessageBubble from "./message-bubble";
import { json } from "stream/consumers";
import moment from "moment";


export default function Chat({ id,  }: { id: string}) {
    const virtuosoRef = useRef<VirtuosoHandle>(null)
    const { data, isLoading, isError } = useList<IDialog, HttpError>({
        resource: "Dialog",
        liveMode: "auto",
        pagination: { mode: "off", },
        meta: { select: "*,Users!Dialog_updated_by_fkey(*)", },

        filters: [{
            field: "case_id",
            operator: "eq",
            value: id,
        },],
        sorters: [
            {
                field: "updated_at",
                order: "asc",
            },
        ],
    });
    const appendInterval = useRef()
    const [atBottom, setAtBottom] = useState(false)
    const showButtonTimeoutRef = useRef(0)
    const [showButton, setShowButton] = useState(false)

    // useEffect(() => {
    //     return () => {
    //         clearInterval(appendInterval.current)
    //         clearTimeout(showButtonTimeoutRef.current)
    //     }
    // }, [])

    // useEffect(() => {
    //     clearTimeout(showButtonTimeoutRef.current)
    //     setShowButton(false)
    // }, [atBottom, setShowButton])
    var tempDate: string | null = null;
    var showDate: boolean = false;
    var count=0;
    return (
        <Box >
            <Virtuoso
                style={{ height: '400px' }}
                followOutput="smooth"
                ref={virtuosoRef}
                data={data?.data}
                totalCount={data?.data.length}
                cellSpacing={2}
                itemContent={(index, data) => {
                    console.log(showDate.toString() + " " + moment(data.updated_at).format('LL') + " " + tempDate)
                    if (moment(data.updated_at).format('LL') != tempDate || tempDate == null) {
                        tempDate = moment(data.updated_at).format('LL');
                        showDate = true;
                    } else {
                        showDate = false;
                    }
                    count++;
                    console.log(count)  
                    return (
                        <>
                            {count+" "+showDate.toString()+" "+moment(data.updated_at).format('LL') + " " + tempDate}
                            <Box display={"flex"} justifyContent={"center"}>
                                {showDate == true ? <Text bgColor={""} fontSize={"xs"} borderRadius={8} px={4}>{tempDate}</Text> : <></>}
                            </Box>
                                <MessageBubble key={data.id} data={data} />
                        </>
                    )
                }}
            />
        </Box>
    )
}