"use client"
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useGetIdentity, useMany, useNavigation, useNotification } from "@refinedev/core";
import { Breadcrumb, CreateButton, List, useDataGrid } from "@refinedev/mui";
import React from "react";
import { IMasterCase, IUser, MasterCaseStatus, MasterRouteName } from "src/interfaces";
import VisibilityIcon from '@mui/icons-material/Visibility';
import HistoryIcon from '@mui/icons-material/History';
import { Button, IconButton, Tooltip } from "@mui/material";
import DangerousIcon from '@mui/icons-material/Dangerous';
import ChatIcon from '@mui/icons-material/Chat';
export default function Page() {
    const { dataGridProps } = useDataGrid<IMasterCase>(
        {
            resource: "MasterCase",
            liveMode:"auto",
            filters: {
                permanent: [
                    {
                        field: "is_deleted",
                        operator: "eq",
                        value: false
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
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [masterCaseData?.data],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
}