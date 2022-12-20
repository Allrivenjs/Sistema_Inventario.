import {Grid, Stack} from "@mui/material";
import {ClientList} from "./components/ClientList";

export const Clients = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <ClientList/>
                </Stack>
            </Grid>
        </Grid>
    );
}