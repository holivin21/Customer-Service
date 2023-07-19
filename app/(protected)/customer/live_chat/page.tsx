/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useGetIdentity, useMany, useNavigation, useNotification } from "@refinedev/core";
import { Breadcrumb, CreateButton, List, useDataGrid } from "@refinedev/mui";
import React, { useRef } from "react";
import { IMasterCase, IUser, MasterCaseStatus, MasterRouteName } from "src/interfaces";
import VisibilityIcon from '@mui/icons-material/Visibility';
import HistoryIcon from '@mui/icons-material/History';
import { Box, Button, IconButton, Modal, Tooltip } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from "@components/liveChat/chat";
import { VirtuosoHandle } from "react-virtuoso";
export default function Page() {
    const { show, create } = useNavigation();
    const { data: user } = useGetIdentity<IUser>();
    const { open, close } = useNotification();
    const [modal, setModal] = React.useState(false);
    const [modalID, setModalID] = React.useState("");
    const { dataGridProps } = useDataGrid<IMasterCase>({
        resource: "MasterCase",
        liveMode: "auto",
        filters: {
            permanent: [
                {
                    field: "is_deleted",
                    operator: "eq",
                    value: false
                },
                {
                    field: "customer_id",
                    operator: "eq",
                    value: user?.id
                }
            ]
        },
        sorters: {
            initial: [
                {
                    field: "status",
                    order: "desc"
                }
            ]
        }
    }
    );

    const { data: masterCaseData, isLoading: masterCaseIsLoading } = useMany<IMasterCase>({
        resource: "MasterCase",
        ids: dataGridProps?.rows?.map((item: IMasterCase) => item?.id) ?? [],
        liveMode: "auto",
        queryOptions: {
            enabled: !!dataGridProps?.rows,
        },
    });

    const columns = React.useMemo<GridColDef<IMasterCase>[]>(
        () => [
            {
                field: "id",
                headerName: "Id",
                type: "string",
                flex: 1,
            },
            {
                field: "title",
                headerName: "Title",
                type: "string",
                flex: 3,
            },
            {
                field: "description",
                headerName: "Description",
                type: "string",
                flex: 3,
            },
            {
                field: "status",
                headerName: "Status",
                type: "string",
                flex: 1,
            },
            {
                field: 'actions',
                type: 'actions',
                headerName: "Action",
                width: 80,
                getActions: (item) => {
                    if (item.row.status === MasterCaseStatus.Close) {
                        return [
                            <GridActionsCellItem
                                key={item.row.id}
                                icon={<HistoryIcon />}
                                label="history"
                                onClick={() => {
                                    console.log("history")
                                    setModalID(item.row.id);
                                    setModal(true)
                                }}
                                color="inherit"
                            />,
                        ]
                    } else if (item.row.status === MasterCaseStatus.Reject) {
                        return [
                            <Tooltip title={item.row.agent_message} arrow placement="left" key={item.row.id}>
                                <IconButton aria-label="reject" ><DangerousIcon /></IconButton>
                            </Tooltip>
                        ]
                    } else if (item.row.status === MasterCaseStatus.Progress) {
                        return [
                            <IconButton key={item.row.id} aria-label="chat" onClick={() => { show(MasterRouteName.CustomerChat, item.row.id) }}>
                                <ChatIcon />
                            </IconButton>
                        ]
                    }
                    else {
                        return [
                            <GridActionsCellItem
                                key={item.row.id}
                                icon={<VisibilityIcon />}
                                label="chat"
                                className="textPrimary"
                                onClick={() => { show(MasterRouteName.CustomerLiveChat, item.row.id) }}
                                color="inherit"
                            />
                        ];
                    }
                },
            },
        ],
        [masterCaseData?.data],
    );

    return (
        <>
            <List
                headerButtons={({ defaultButtons }) => {
                    return (<>
                        <CreateButton
                            onClick={() => {
                                const cek = masterCaseData?.data.find(data => data.status === MasterCaseStatus.Open || data.status === MasterCaseStatus.Progress);
                                if (cek) {
                                    open?.({
                                        type: "error",
                                        description: "You already have a open/progress case",
                                        message: "Please finish your case before create a new one",
                                    });
                                } else {
                                    create("customer-live-chat")
                                }
                            }}
                        />
                    </>)
                }}

            >
                <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
            <ModalHistory isOpen={modal} onClose={() => setModal(false)} id={modalID} />
        </>
    );
}
const ModalHistory = ({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void, id: string }) => {
    const { data: user } = useGetIdentity<IUser>();
    const virtuosoRef = useRef<VirtuosoHandle>(null)
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80%",
        height: "80%",
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        px: 4,
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}  >
                {/* hello */}
                <Chat id={"931f6540-2461-11ee-8fa5-ff94c4e41238"} virtuosoRef={virtuosoRef} />
                {/* <Box m={2} bgcolor="white" borderRadius={2} height="80%" >
                </Box> */}
            </Box>
        </Modal >
    )
}