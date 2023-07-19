/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Chat from "@components/liveChat/chat"
import LayoutChat from "@components/liveChat/layoutChat"
import { Box, Button, Modal, Typography } from "@mui/material";
import { HttpError, useGo, useOne } from "@refinedev/core";
import { useEffect, useState } from "react";
import { IMasterCase, MasterCaseStatus } from "src/interfaces";
import Image from "next/image";
import ModalThankYou from "@components/modalThankYou";


export default function Page({ params }: { params: { id: string } }) {
    const [modal, setModal] = useState(false);
    const { data, isLoading, isError } = useOne<IMasterCase, HttpError>({
        resource: "MasterCase",
        liveMode: "auto",
        id: params.id,
        onLiveEvent(event) {
            console.log(event)
            const data: IMasterCase = event.payload as IMasterCase
            if (data.status === MasterCaseStatus.Close) setModal(true)
        },
    });
    useEffect(() => {
        if (!isLoading && data?.data.status === MasterCaseStatus.Close) setModal(true)
    }, [data, isLoading]);
    return (
        <>
            <LayoutChat id={params.id} />
            <ModalThankYou isOpen={modal} onClose={() => setModal(false)} />

        </>
    )
}
