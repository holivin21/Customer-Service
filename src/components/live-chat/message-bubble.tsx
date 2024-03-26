"use client"
import { Box, HStack, Text } from "@chakra-ui/react";
import { useGetIdentity } from "@refinedev/core";
import { IDialog, IUser } from "@utility/interface";

const MessageBubble = (props: { data: IDialog }) => {
    
    const { data: user } = useGetIdentity<IUser>();
    const isMe = props.data.user_id === user?.id;
    return (
        <Box display="flex" alignItems={!isMe ? "flex-start" : "flex-end"} flexDirection="column" px={2} py={1} >
            <HStack direction="row" spacing={1}>
                <Text >{props.data.updated_at.toString()}</Text>
                <Text >{props.data.Users.full_name ?? props.data.Users.email}</Text>
            </HStack>
            <Box sx={{ display: "flex", justifyContent: !isMe ? "flex-start" : "flex-end", }} >
                <Box                 >
                    <Text variant="body1">{props.data.message}</Text>
                </Box>
            </Box>
        </Box>
    );
};
export default MessageBubble;