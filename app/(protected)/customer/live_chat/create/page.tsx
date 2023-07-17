"use client"
import React, { useEffect, useState } from "react";
import { Create, useAutocomplete } from "@refinedev/mui";
import { Autocomplete, Box, Button, CircularProgress, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { BaseRecord, HttpError, useCreate, useDelete, useGetIdentity, useGo, useList, useNavigation, useOne, useUpdate } from "@refinedev/core";
import { IMasterCase, IUser, MasterCaseStatus, MasterCaseType } from "src/interfaces";
import { v1 as uuid } from 'uuid';
import { redirect, useRouter } from 'next/navigation'
import { FieldValues } from "react-hook-form";
import {  redirect as nextRedirect } from "next/navigation";

export default function Page() {
    const { list } = useNavigation()
    const { data: auth } = useGetIdentity<IUser>();
    const { show } = useNavigation();
    const data = useList({
        resource: "MasterCase",
        filters: [
            {
                field: "is_deleted",
                operator: "eq",
                value: false
            }, {
                field: "customer_id",
                operator: "eq",
                value: auth?.id
            }, {
                field: "status",
                operator: "eq",
                value: MasterCaseStatus.Open
            }
        ]
    })
    const {
        refineCore: { formLoading, onFinish, redirect },
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IMasterCase>({
        refineCoreProps: {
            resource: "MasterCase",
        },
    });
    const onFinishHandler = async (data: FieldValues) => {
        const id = uuid()
        const result = await onFinish({
            id: id,
            customer_id: auth?.id,
            title: data.title,
            description: data.description,
            start_time: new Date(),
            type: MasterCaseType.LiveChat,
            status: MasterCaseStatus.Open,
            updated_by: auth?.id
        });
        show("customer-live-chat", id)
    };


    // if (data.isLoading) return <CircularProgress />
    // else if (data.data?.total != 0) return nextRedirect("/customer/live_chat")
    return (
        <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
            <Create resource="MasterCase" isLoading={formLoading} saveButtonProps={{ onClick: handleSubmit(onFinishHandler) }}
                wrapperProps={{
                    sx: {
                        width: "100%",
                    },
                }}>
                <Box
                    component="form"
                    sx={{ display: "flex", flexDirection: "column" }}
                    autoComplete="off"
                >
                    <TextField
                        {...register("title", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.title}
                        helperText={(errors as any)?.title?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        type="text"
                        label="Title"
                        name="title"
                    />
                    <TextField
                        {...register("description", {
                            required: "This field is required",
                        })}
                        error={!!(errors as any)?.description}
                        helperText={(errors as any)?.description?.message}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        multiline
                        label="Description"
                        name="description"
                    />
                </Box>
            </Create>
        </Box>
    );
};