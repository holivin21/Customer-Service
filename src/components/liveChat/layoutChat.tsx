"use client"
import { Avatar, Box, Button, Grid, Modal, Stack, TextField, TextareaAutosize, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { IDialog, IMasterCase, IUser, MasterCaseStatus, UserRole } from "src/interfaces";
import { HttpError, useCreate, useGetIdentity, useGo, useList, useOne, useUpdate } from "@refinedev/core";
import AutoSizer from "react-virtualized-auto-sizer";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import MessageBubble from "@components/liveChat/messageBubble";
import { useForm, useModalForm } from "@refinedev/react-hook-form";
import { Create } from "@refinedev/mui";
import CloseIcon from '@mui/icons-material/Close';
import { FieldValues } from "react-hook-form";
import Chat from "./chat";


export default function LayoutChat({ id }: { id: string }) {
    const [modalEndChat, setModalEndChat] = React.useState(false);
    const [input, setInput] = React.useState("");
    const create = useCreate();
    const { data: user } = useGetIdentity<IUser>();

    const { data, isLoading, isError } = useOne<IMasterCase, HttpError>({
        resource: "MasterCase",
        liveMode: "auto",
        meta: {
            select: "*,Agent:Users!MasterCase_agent_id_fkey(*),Customer:Users!MasterCase_customer_id_fkey(*)"
        },
        id: id,
    });
    const virtuosoRef = useRef<VirtuosoHandle>(null)
    const handleSend = () => {
        if (input.trim() !== "") {
            console.log(input);
            create.mutate({ resource: "Dialog", values: { message: input, user_id: user?.id, updated_by: user?.id, case_id: id } });
            if (virtuosoRef.current != null) virtuosoRef.current.scrollToIndex({ index: "LAST", behavior: 'smooth' })
            setInput("");
        }
    };
    const handleInputChange = (event: any) => {
        setInput(event.target.value);
    };

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "grey.200" }}>
            <HeaderChatUser
                user={user?.role === UserRole.Agent ?
                    (data?.data.Customer) :
                    (data?.data.Agent)}
                endChat={() => { setModalEndChat(true); }}
            />
            <ModalEndChat isOpen={modalEndChat} onClose={() => setModalEndChat(false)} id={id} />
            <Chat id={id} virtuosoRef={virtuosoRef} />
            <Box sx={{ py: 2, backgroundColor: "background.default" }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Type a message"
                            variant="outlined"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button fullWidth size="large" color="primary" variant="contained" endIcon={<SendIcon />} onClick={handleSend}>Send</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
const HeaderChatUser = (params: { user: IUser | null | undefined, endChat: () => void }) => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2, bgcolor: "azure" }}>
            <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} />
                <Box>{params.user?.full_name ?? params.user?.email}</Box>
            </Stack>
            <Button onClick={params.endChat}>End Chat</Button>
        </Stack>
    )
}
const ModalEndChat = ({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void, id: string }) => {
    const { data: user } = useGetIdentity<IUser>();
    const go = useGo();
    const {
        refineCore: { formLoading, onFinish, redirect },
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IMasterCase>({
        refineCoreProps: {
            resource: "MasterCase",
            liveMode: "auto",
            action: "edit",
            id: id
        }
    });
    const onFinishHandler = async (data: FieldValues) => {
        const result = await onFinish({
            agent_message: data.agent_message,
            updated_at: new Date().toUTCString(),
            end_time: new Date().toUTCString(),
            updated_by: user?.id,
            status: MasterCaseStatus.Close,
        });
        if (user?.role === UserRole.Agent) go({ to: "/agent/live_chat" })
        else go({ to: "/customer/live_chat" })
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box display="flex" height="100%" alignItems="center" justifyContent="center">
                <Create
                    title={<></>}
                    resource="MasterCase"
                    goBack={<></>}
                    breadcrumb={<></>}
                    isLoading={formLoading}
                    saveButtonProps={{ onClick: handleSubmit(onFinishHandler) }}
                    wrapperProps={{ sx: { width: "60%", }, }}
                    footerButtons={({ defaultButtons }) => (
                        <>
                            <Button startIcon={<CloseIcon />} variant="contained" color="error"
                                onClick={onClose}
                            >Cancel
                            </Button>
                            {defaultButtons}
                        </>
                    )}
                >
                    <Box
                        component="form"
                        sx={{ display: "flex", flexDirection: "column" }}
                        autoComplete="off"
                    >
                        <TextField
                            {...register("agent_message", {
                                required: "This field is required",
                            })}
                            error={!!(errors as any)?.title}
                            helperText={(errors as any)?.title?.message}
                            margin="normal"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            type="text"
                            label="Description"
                            name="agent_message"
                        />
                    </Box>
                </Create>
            </Box>
        </Modal>
    )
}