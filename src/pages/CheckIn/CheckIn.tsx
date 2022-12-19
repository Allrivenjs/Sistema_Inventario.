import {Grid, Stack} from "@mui/material";
import {CheckInList} from "./components/CheckInList";

export const CheckIn = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <CheckInList/>
                </Stack>
            </Grid>
        </Grid>
    );
}