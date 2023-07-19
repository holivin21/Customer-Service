"use client"

import { Button, List } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModes, GridRowModesModel, GridRowsProp } from "@mui/x-data-grid";
import { useDataGrid } from "@refinedev/mui";
import React, { useEffect, useState } from "react";
import { useGetUser } from "src/hooks/rbac.hooks";
import { IUser } from "src/interfaces";
import { supabaseClientAuth } from "src/utility";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

export default function Page() {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const listUser = useGetUser((state) => state.listUser)
    const loading = useGetUser((state) => state.loading)
    const fetchUser = useGetUser((state) => state.fetchListUser)
    const fetchDeleteUser = useGetUser((state) => state.deleteUser)
    useEffect(() => {
        fetchUser()
    }, []);
    useEffect(() => {
        console.log(rowModesModel);
    }, [rowModesModel]);
    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        fetchDeleteUser(id.toString())
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
        const editedRow = listUser?.users.find((row: any) => row.id === id);
        // if (editedRow!.isNew) {
        //     setRows(rows.filter((row: any) => row.id !== id));
        // }
    };
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns = React.useMemo<GridColDef<IUser>[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                flex: 1,
            },
            {
                field: "full_name",
                headerName: "Name",
                flex: 1,
            },
            {
                field: "email",
                headerName: "Email",
                flex: 1,
            },
            {
                field: "phone",
                headerName: "Phone",
                flex: 1,
            },
            {
                field: "updated_at",
                headerName: "updated_at",
                flex: 1,
            },
            {
                field: "role",
                headerName: "role",
                flex: 1,
            },
            {
                field: "RBAC_role",
                headerName: "RBAC Role",
                flex: 1,
                editable: true,
            },
            // {
            //     field: 'actions',
            //     type: 'actions',
            //     headerName: "Action",
            //     width: 80,
            //     getActions: ({ id }) => {
            //         console.log(rowModesModel[id]?.mode)
            //         console.log(rowModesModel[id]?.mode === GridRowModes.Edit)
            //         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            //         if (isInEditMode) {
            //             return [
            //                 <GridActionsCellItem
            //                     icon={<SaveIcon />}
            //                     label="Save"
            //                     sx={{
            //                         color: 'primary.main',
            //                     }}
            //                     onClick={handleSaveClick(id)}
            //                 />,
            //                 <GridActionsCellItem
            //                     icon={<CancelIcon />}
            //                     label="Cancel"
            //                     className="textPrimary"
            //                     onClick={handleCancelClick(id)}
            //                     color="inherit"
            //                 />,
            //             ];
            //         }

            //         return [
            //             <GridActionsCellItem
            //                 icon={<EditIcon />}
            //                 label="Edit"
            //                 className="textPrimary"
            //                 onClick={handleEditClick(id)}
            //                 color="inherit"
            //             />,
            //             <GridActionsCellItem
            //                 icon={<DeleteIcon />}
            //                 label="Delete"
            //                 onClick={handleDeleteClick(id)}
            //                 color="inherit"
            //             />,
            //         ];
            //     },
            // },
        ],
        [],
    );

    return (
        <>
            <Button onClick={() => fetchUser()}>refresh</Button>
            <List>
                {/* <DataGrid
                    onRowModesModelChange={handleRowModesModelChange}
                    rowModesModel={rowModesModel}
                    editMode="row"
                    rows={listUser?.users.map((v: IUser) => { return Object.assign(v, { ...v.user_metadata }) }) ?? []}
                    columns={columns}
                    autoHeight
                /> */}
            </List>
        </>
    );
}