import { Button, Stack } from "@mui/material";
import { useGo } from "@refinedev/core";

export function AuthActionHeader() {
    const go=useGo();
    return (
        <Stack direction="row" spacing={2}>
            <Button onClick={()=>go({to:"/login"})}>Login</Button>
            <Button onClick={()=>go({to:"/register"})}>Register</Button>
        </Stack>
    )
}