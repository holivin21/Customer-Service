import { Avatar, Badge, Box, Button, Grid, InputAdornment, ListItemAvatar, ListItemButton, ListItemText, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { HttpError, useCreate, useDelete, useGetIdentity, useGo, useInvalidate, useList, useUpdate } from "@refinedev/core";
import { useRouter } from "next/navigation";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { Virtuoso } from "react-virtuoso";
import { useSwitchOnlie } from "src/hooks/live_chat.hook";
import { IMasterCase, IUser, MasterCaseStatus, MasterCaseType } from "src/interfaces";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            height="100%"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box height="100%">
                    {children}
                </Box>
            )}
        </Box>
    );
}
enum TabsEnum { waiting, chat }
export default function TabChat() {
    const isOnline = useSwitchOnlie((state) => state.isOnline);
    const [value, setValue] = React.useState<TabsEnum>(TabsEnum.waiting);
    const handleChange = (event: React.SyntheticEvent, newValue: TabsEnum) => {
        setValue(newValue);
    };
    if (!isOnline) return <Typography>Agent is Offline</Typography>
    return (
        <>

            <Grid item sx={{ borderBottom: 1, borderColor: 'divider' }} xs="auto">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Waiting" value={TabsEnum.waiting} />
                    <Tab label="Chat" value={TabsEnum.chat} />
                    {/* <Tab label={value == TabsEnum.waiting ? "Waiting " + dataOpen?.length : "Progress " + dataProgress?.length} disabled /> */}
                </Tabs>
            </Grid>
            <TextField id="input-with-icon-textfield" placeholder="Search..." fullWidth variant="outlined"
                onChange={() => { }}
                InputProps={{ startAdornment: (<InputAdornment position="start"><GridSearchIcon /></InputAdornment>), }}
            />
            <Grid item width="100%" xs>
                <TabPanel value={value} index={0}><BubbleUserWaiting /></TabPanel>
                <TabPanel value={value} index={1}><BubbleUserChat /></TabPanel>
            </Grid>
        </>
    )
}

const ListBubbleChat = (props: { listData: IMasterCase[] | undefined, onRender: (index: number) => JSX.Element }) => {
    return (
        <AutoSizer>
            {({ width, height }: any) => (
                <Virtuoso
                    style={{ height: height, width: width }}
                    totalCount={props.listData?.length}
                    cellSpacing={2}
                    itemContent={index => {
                        return props.onRender(index);
                    }}
                />
            )}
        </AutoSizer>
    )
}
const BubbleUserWaiting = () => {
    const { mutate } = useUpdate();
    const { mutate: updateData } = useUpdate();
    const { data: user } = useGetIdentity<IUser>();
    const go = useGo();
    const router = useRouter()
    let MasterChat = useList<IMasterCase, HttpError>({
        resource: "MasterCase",
        liveMode: "auto",
        pagination: { mode: "off" },
        filters: [
            {
                field: "status",
                operator: "eq",
                value: MasterCaseStatus.Open
            },
            {
                field: "type",
                operator: "eq",
                value: MasterCaseType.LiveChat
            },
            {
                field: "is_deleted",
                operator: "eq",
                value: false
            },
        ]
    });
    const handleAction = (action: boolean, index: number) => {
        mutate({
            resource: "MasterCase",
            values: {
                status: action ? MasterCaseStatus.Progress : MasterCaseStatus.Reject,
                agent_id: user?.id,
                updated_by: user?.id,
                start_time: new Date()
            },
            id: MasterChat.data?.data[index].id ?? ""
        }, {
            onSuccess: (data, variables, context) => {

                if (action) {
                    go({
                        to: "/agent/live_chat/chat/" + variables.id,
                    })
                }
            },
        });

    }
    return (
        <ListBubbleChat
            listData={MasterChat.data?.data}
            onRender={(index: number) =>
                <Box display="flex" m={1} p={2} borderRadius={1} boxShadow={1} alignItems="center" gap={2}>
                    <Avatar />
                    <Box>
                        <Typography>{MasterChat.data?.data[index].status}</Typography>
                        <Stack direction="row" gap={1}>
                            <Button size="small" variant="contained" color="success" onClick={() => handleAction(true, index)}>Accept</Button>
                            <Button size="small" variant="contained" color="error" onClick={() => handleAction(false, index)}>Decline</Button>
                        </Stack>
                    </Box>
                </Box>
            }
        />
    )
}

const BubbleUserChat = () => {
    const go = useGo();
    const { data: user } = useGetIdentity<IUser>();
    const router = useRouter()
    let masterCase = useList<IMasterCase, HttpError>({
        resource: "MasterCase",
        liveMode: "auto",
        pagination: {
            mode: "off"
        },
        meta: {
            select: "*,Customer:Users!MasterCase_customer_id_fkey(*)"
        },
        onLiveEvent: (event) => {
            console.log(event);
        },
        filters: [
            {
                field: "status",
                operator: "in",
                value: [MasterCaseStatus.Progress]
            },
            {
                field: "type",
                operator: "eq",
                value: MasterCaseType.LiveChat
            },
            {
                field: "agent_id",
                operator: "eq",
                value: user?.id
            },
            {
                field: "is_deleted",
                operator: "eq",
                value: false
            },
        ]
    });

    return (
        <ListBubbleChat
            listData={masterCase.data?.data}
            onRender={(index: number) =>
                <Box m={1} borderRadius={1} boxShadow={1}>
                    <ListItemButton onClick={(event) => {
                        go({ to: "/agent/live_chat/chat/" + masterCase.data?.data[index].id, })
                    }}    >
                        <Grid container spacing={2} alignItems="center" columns={10}>
                            <Grid item xs={2}> <Avatar alt="Remy Sharp" /></Grid>
                            <Grid item xs={6}>
                                <ListItemText primary={masterCase.data?.data[index].Customer?.full_name ?? masterCase.data?.data[index].Customer?.email ?? ""}
                                    secondary={<Typography>{masterCase.data?.data[index].title}</Typography>}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box display="flex" justifyContent="center" >
                                    <Badge badgeContent={4} color="success" />
                                </Box>
                            </Grid>
                        </Grid>
                    </ListItemButton>
                </Box>
            }
        />
    )
}