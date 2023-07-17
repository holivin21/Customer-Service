"use client"
import { Avatar, Box, Button, Grid, Modal, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { IDialog, IMasterCase, IUser, MasterCaseStatus, UserRole } from "src/interfaces";
import { HttpError, useCreate, useGetIdentity, useGo, useList, useUpdate } from "@refinedev/core";
import AutoSizer from "react-virtualized-auto-sizer";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import MessageBubble from "@components/liveChat/messageBubble";
import { useForm, useModalForm } from "@refinedev/react-hook-form";
import { Create } from "@refinedev/mui";
import CloseIcon from '@mui/icons-material/Close';
import { FieldValues } from "react-hook-form";


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
        <Box sx={{ flexGrow: 1 }} py={1} height="100%">
            <Virtuoso
                style={{ height: '100%' }}
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