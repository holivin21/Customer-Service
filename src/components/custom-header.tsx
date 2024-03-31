import React from "react";
import {
    useGetIdentity,
    useActiveAuthProvider,
    pickNotDeprecated,
} from "@refinedev/core";
import {
    Box,
    Avatar,
    Text,
    HStack,
    useColorModeValue,
    BoxProps,
    useColorMode,
    IconButton,
    Icon,
} from "@chakra-ui/react";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/chakra-ui";
import { IconMoonStars, IconSun } from "@tabler/icons";
import AppIcon from "./App-Icon";

export const CustomHeader: React.FC<RefineThemedLayoutV2HeaderProps> = ({ isSticky, sticky, }) => {
    const authProvider = useActiveAuthProvider();
    const { colorMode, toggleColorMode } = useColorMode();

    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const bgColor = useColorModeValue(
        "refine.header.bg.light",
        "refine.header.bg.dark",
    );

    let stickyProps: BoxProps = {};
    if (pickNotDeprecated(sticky, isSticky)) {
        stickyProps = {
            position: "sticky",
            top: 0,
            zIndex: 1,
        };
    }

    return (
        <Box
            py="2"
            px="4"
            display="flex"
            alignItems="center"
            w="full"
            height="64px"
            bg={bgColor}
            borderBottom="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            {...stickyProps}
        >
            <Box
                w="full"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <AppIcon/>
                <HamburgerMenu />
                <HStack spacing={4}>
                    <IconButton
                        variant="outline"
                        aria-label="Toggle theme"
                        onClick={toggleColorMode}
                    >
                        <Icon
                            as={colorMode === "light" ? IconMoonStars : IconSun}
                            w="18px"
                            h="18px"
                        />
                    </IconButton>
                    {user?.name && (
                        <Text size="sm" fontWeight="bold" data-testid="header-user-name">
                            {user.name}
                        </Text>
                    )}
                    {user?.avatar && (
                        <Avatar
                            size="sm"
                            name={user?.name || "Profile Photo"}
                            src={user.avatar}
                        />
                    )}
                </HStack>
            </Box>
        </Box>
    );
};
