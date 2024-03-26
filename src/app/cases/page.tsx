
"use client"
import { ChatIcon, TimeIcon, ViewIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useDisclosure } from "@chakra-ui/react";
import Chat from "@components/live-chat/chat";
import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { IMasterCase, IUser, MasterCaseStatus, MasterRouteName } from "@utility/interface";
import React, { useRef } from "react";
import { VirtuosoHandle } from "react-virtuoso";
export default function Page() {
    const { show, create } = useNavigation();
    // const { data: user } = useGetIdentity<IUser>();
    // const { open, close } = useNotification();
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const [modal, setModal] = React.useState(false);
    const [modalID, setModalID] = React.useState("");
    // const { dataGridProps } = useDataGrid<IMasterCase>({
    //     resource: "MasterCase",
    //     liveMode: "auto",
    //     filters: {
    //         permanent: [
    //             {
    //                 field: "is_deleted",
    //                 operator: "eq",
    //                 value: false
    //             },
    //             {
    //                 field: "customer_id",
    //                 operator: "eq",
    //                 value: user?.id
    //             }
    //         ]
    //     },
    //     sorters: {
    //         initial: [
    //             {
    //                 field: "status",
    //                 order: "desc"
    //             }
    //         ]
    //     }
    // }
    // );

    // const { data: masterCaseData, isLoading: masterCaseIsLoading } = useMany<IMasterCase>({
    //     resource: "MasterCase",
    //     ids: dataGridProps?.rows?.map((item: IMasterCase) => item?.id) ?? [],
    //     liveMode: "auto",
    //     queryOptions: {
    //         enabled: !!dataGridProps?.rows,
    //     },
    // });

    const columns = React.useMemo<ColumnDef<IMasterCase>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Id",
            },
            {
                accessorKey: "title",
                header: "Title",
            },
            {
                accessorKey: "description",
                header: "Description"
            },
            {
                accessorKey: "status",
                header: "Status",
            },
            {
                header: "Action",
                cell: (item) => {
                    if (item.row.original.status === MasterCaseStatus.Close) {
                        return [
                            <IconButton
                                key={item.row.id}
                                icon={<TimeIcon />}
                                aria-label="history"
                                onClick={() => {
                                    console.log("history")
                                    setModalID(item.row.original.id);
                                    onOpen();
                                }}
                                color="inherit"
                            />,
                        ]
                    } else if (item.row.original.status === MasterCaseStatus.Reject) {
                        return [
                            <Tooltip  label={item.row.original.agent_message}  placement="left" key={item.row.id}>
                                <IconButton aria-label="reject" ><WarningTwoIcon /></IconButton>
                            </Tooltip>
                        ]
                    } else if (item.row.original.status === MasterCaseStatus.Progress) {
                        return [
                            <IconButton key={item.row.id} aria-label="chat" onClick={() => { show(MasterRouteName.CustomerChat, item.row.id) }}>
                                <ChatIcon />
                            </IconButton>
                        ]
                    }
                    else {
                        return [
                            <IconButton
                                key={item.row.id}
                                icon={<ViewIcon />}
                                aria-label="chat"
                                className="textPrimary"
                                onClick={() => { show(MasterRouteName.CustomerLiveChat, item.row.id) }}
                                color="inherit"
                            />
                        ];
                    }
                },
            },
        ],[]
        // [masterCaseData?.data],
    );

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        refineCoreProps: {
            resource: "MasterCase",
        },
        columns,
    });
    return (
        <div style={{ padding:"8px" }}>
        <Text fontSize='3xl'>Products</Text>
        <TableContainer whiteSpace="pre-line">
            <Table variant="simple">
                <Thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id}>
                                    {!header.isPlaceholder && (
                                        <HStack spacing="2">
                                            <Text>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                            </Text>
                                            <HStack spacing="2">
                                            </HStack>
                                        </HStack>
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
        <ModalHistory isOpen={isOpen} onClose={() => onClose()} id={modalID} />
    </div>
    );
}
const ModalHistory = ({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void, id: string }) => {
    // const { data: user } = useGetIdentity<IUser>();
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
            isOpen={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
              <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Chat id={id} virtuosoRef={virtuosoRef} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
           
        </Modal >
    )
}