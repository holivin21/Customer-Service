"use client";
import { Grid } from "@mui/material";
import AgentChatProfile from "@components/liveChat/agentChatProfile";
import TabChat from "@components/liveChat/tabChat";
const Page = ({ children}: { children: React.ReactNode; }) => {
  return (
    <Grid container width="100%" columns={10} height="100%" spacing={1} sx={{ borderRadius: 1, boxShadow: 3, p: 1 }}>
      <Grid item xs={3} height="100%" >
        <Grid container direction="column" alignItems="stretch" height="100%">
          <AgentChatProfile onSearch={(e) => { console.log(e.target.value) }} />
          <TabChat />
        </Grid>
      </Grid>
      <Grid item xs={7}>
        {children}
      </Grid>
    </Grid >
  );
};



export default Page;