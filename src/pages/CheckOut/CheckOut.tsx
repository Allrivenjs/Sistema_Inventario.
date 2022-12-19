import {Grid, Stack} from "@mui/material";
import {CheckOutList} from "./components/CheckOutList";

export const CheckOut = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <CheckOutList/>
                </Stack>
            </Grid>
        </Grid>
    );
}