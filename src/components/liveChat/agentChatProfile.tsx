import { Avatar, Grid, InputAdornment, Stack, Switch, TextField, Typography } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import { useGetIdentity, useModal, useNotification } from "@refinedev/core";
import { IdentityResponse } from "@refinedev/core/dist/interfaces";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSwitchOnlie } from "src/hooks/live_chat.hook";

const AlertDialog = (props: { onClose: () => void, onSure: () => void, openDialog: boolean | false }) => {
  return (
    <Dialog open={props.openDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Are your sure you want to offline?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          If you want to offline all the currently active chat will be end !
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
        <Button onClick={props.onSure} autoFocus>Sure</Button>
      </DialogActions>
    </Dialog>
  );
}
const AgentChatProfile = (props: { onSearch: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> }) => {
  const { data: user } = useGetIdentity<any>();
  const { show, close, visible } = useModal();
  const isOnline = useSwitchOnlie((state) => state.isOnline);
  const switchOnline = useSwitchOnlie((state) => state.switchOnline);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) switchOnline(event.target.checked);
    if (!event.target.checked) show();
  };
  return (
    <Grid >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2, bgcolor: "azure" }}>
        <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} />
        <Stack justifyContent="center">
          <Typography>{user?.user_metadata?.full_name ?? user?.name}</Typography>
          <Stack direction="row" alignItems="center">
            <Switch size="small" color="success" checked={isOnline} onChange={handleChange} />
            <Typography>{isOnline ? "Online" : "Offline"}</Typography>
          </Stack>
        </Stack>
      </Stack>

      {visible && (
        <AlertDialog
          onClose={close}
          onSure={() => {
            close();
            switchOnline(false)
          }}
          openDialog={visible} />)}
    </Grid>
  )
}
export default AgentChatProfile