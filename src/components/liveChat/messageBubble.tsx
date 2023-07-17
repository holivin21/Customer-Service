import { Box, Paper, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useGetIdentity } from "@refinedev/core";
import { IDialog, IUser } from "src/interfaces";
import { getDateTime } from "src/utility/datetimeFormat";

const MessageBubble = (props: { data: IDialog }) => {
    const { data: user } = useGetIdentity<IUser>();
    const isMe = props.data.user_id === user?.id;
    return (
        <Box display="flex" alignItems={!isMe ? "flex-start" : "flex-end"} flexDirection="column" px={2} py={1} >
            <Stack direction="row" spacing={1}>
                <Typography px={0} color={grey[400]} variant="caption">{getDateTime(props.data.updated_at)}</Typography>
                <Typography px={0} variant="caption">{props.data.Users.full_name ?? props.data.Users.email}</Typography>
            </Stack>
            <Box sx={{ display: "flex", justifyContent: !isMe ? "flex-start" : "flex-end", }} >
                <Paper variant="outlined"
                    sx={{
                        px: 2,
                        py: 1,
                        ml: isMe ? 4 : 0,
                        mr: !isMe ? 4 : 0,
                        backgroundColor: isMe ? "primary" : "secondary",
                        borderRadius: !isMe ? "15px 15px 15px 1px" : "15px 15px 1px 15px",
                    }}
                >
                    <Typography variant="body1">{props.data.message}</Typography>
                </Paper>
            </Box>
        </Box>
    );
};
export default MessageBubble;