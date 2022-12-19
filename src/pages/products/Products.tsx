import {Grid, Stack} from "@mui/material";
import {ProductList} from "./components/ProductList";

export const Products = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack spacing={2}>
                    <ProductList/>
                </Stack>
            </Grid>
        </Grid>
    );
}