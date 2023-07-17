"use client"

import { Avatar, Stack, Typography } from "@mui/material"
import { IUser } from "src/interfaces"

export function ProfileAvatar(props: { user: IUser }) {
    return (
        <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
        >
            {(props.user?.email || props.user?.full_name) && (
                <Typography
                    sx={{
                        display: {
                            xs: "none",
                            sm: "inline-block",
                        },
                    }}
                    variant="subtitle2"
                >
                    {props.user?.email || props.user?.full_name}
                </Typography>
            )}
            <Avatar src={props.user?.avatar ?? ""} alt={props.user?.full_name ?? ""} />
        </Stack>
    )
}