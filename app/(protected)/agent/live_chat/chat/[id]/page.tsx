"use client";;
import LayoutChat from "@components/liveChat/layoutChat";
import ModalThankYou from "@components/modalThankYou";
import { HttpError, useOne } from "@refinedev/core";
import { useState } from "react";
import { IMasterCase, MasterCaseStatus } from "src/interfaces";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <LayoutChat id={params.id} />
        </>
    )
}