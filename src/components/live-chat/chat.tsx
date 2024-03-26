
"use client"
import React, { useEffect, useRef, useState } from "react";
import { HttpError, useCreate, useGetIdentity, useGo, useList, useUpdate } from "@refinedev/core";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { IDialog } from "@utility/interface";
import { Box } from "@chakra-ui/react";
import MessageBubble from "./message-bubble";
import { json } from "stream/consumers";


export default function Chat({ id, virtuosoRef }: { id: string, virtuosoRef: React.RefObject<VirtuosoHandle> }) {
    const virtuosoRef1 = useRef<VirtuosoHandle>(null)
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

    useEffect(() => {
        return () => {
            clearInterval(appendInterval.current)
            clearTimeout(showButtonTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        clearTimeout(showButtonTimeoutRef.current)
        setShowButton(false)
    }, [atBottom, setShowButton])
    return (
        <Box >
            <Virtuoso
                style={{ height: '400px' }}
                followOutput="smooth"
                ref={virtuosoRef1}
                data={data?.data}
                totalCount={data?.data.length}
                cellSpacing={2}
                itemContent={(index, data) => {
                    return <MessageBubble key={data.id} data={data} />
                }}
            />
        </Box>
    )
}