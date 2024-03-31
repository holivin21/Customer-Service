"use client"
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useGetIdentity } from "@refinedev/core";
import { IDialog, IUser } from "@utility/interface";
import moment from "moment";

const MessageBubble = (props: { data: IDialog }) => {

    const { data: user } = useGetIdentity<IUser>();
    const isMe = props.data.user_id === user?.id;
    const bgChat = useColorModeValue('blue.100', 'blue.600')
    return (
        <Box display="flex" alignItems={!isMe ? "flex-start" : "flex-end"} flexDirection="column" px={2} py={1} >
            <Text fontSize='xs'>{props.data.Users?.full_name ?? props.data.Users?.email}</Text>
            <Flex flexDir={isMe?"row":"row-reverse"}>
                <Text fontSize='xs'>{moment(props.data.updated_at).format('HH:mm')}</Text>
                <Box bgColor={bgChat} py={1} px={2} borderRadius={12}>
                    <Text>{props.data.message}</Text>
                </Box>
            </Flex>
        </Box>
    );
};
export default MessageBubble;