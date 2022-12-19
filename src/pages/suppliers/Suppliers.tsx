import {Grid, Stack} from "@mui/material";
import {SuppliersList} from "./components/SuppliersList";

export const Suppliers = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <SuppliersList/>
                </Stack>
            </Grid>
        </Grid>
    );
}