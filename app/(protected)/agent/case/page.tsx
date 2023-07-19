"use client"
import React from "react";
import { useApiUrl, useList, useMany, useResource, useSelect } from "@refinedev/core";
import { List, useDataGrid, DateField } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IMasterCase } from "src/interfaces";

const formatDateTime = (value: Date | null) => {
    if (value === null || value === undefined) return null;
    return new Date(value).toLocaleString()
}
const Page = () => {
    const { dataGridProps } = useDataGrid<IMasterCase>({
        resource: "MasterCase",
    });
    console.log(dataGridProps.rows.map((item) => item.id))
    const { data: categoryData, isLoading: categoryIsLoading } = useMany({
        liveMode:"auto",
        resource: "MasterCase",
        ids: dataGridProps.rows.map((item) => item.id),

    });
    const columns = React.useMemo<GridColDef<IMasterCase>[]>(
        () => [
            {
                field: "title",
                headerName: "Title",
                flex: 1,
            },
            {
                field: "owner",
                headerName: "Owner",
                flex: 1,
            },
            {
                field: "pic",
                headerName: "pic",
                flex: 1,
            },
            {
                field: "status",
                headerName: "Status",
                flex: 1,
            },
            {
                field: "type",
                headerName: "Type",
                flex: 1,
            },
            {
                field: "start_time",
                headerName: "Start Time",
                flex: 1,
                renderCell(params) { return formatDateTime(params.value); },
            },
            {
                field: "end_time",
                headerName: "End Time",
                flex: 1,
                renderCell(params) { return formatDateTime(params.value); },
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [categoryData?.data],
    );

    return (
        <List>
            <DataGrid
                {...dataGridProps} columns={columns} autoHeight
            />
        </List>
    );
};
export default Page