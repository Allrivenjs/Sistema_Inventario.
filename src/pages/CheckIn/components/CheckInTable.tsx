import {DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel} from "@mui/x-data-grid";
import React, {FC} from "react";
import {Box, Button, CircularProgress, Stack, Typography} from "@mui/material";
import {ICheckIn} from "../interfaces/InterfacesCheckIn";

let setTree2: any;



const products = (props: GridRenderCellParams) => {
    const { products } = props.row as ICheckIn;
    const text = products.map((product: any) => {
        return `${product.name} (${product.pivot.count}) por $${product.pivot.price_per_unit}u`;
    }).join(', ');
    return (
        <Stack>
            <Box  sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
                {text}
            </Typography>
            </Box>
        </Stack>
    );
}

const supplier = (props: GridRenderCellParams) => {
    const { supplier } = props.row;
    return (
        <Stack>
            <Box  sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    {supplier.name}
                </Typography>
            </Box>
        </Stack>
    );

}

const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'purchase_document_number', headerName: '# compra', width: 210 },
    { field: 'date_of_purchase_at', headerName: 'Fecha de compra', width: 190 },
    { field: 'supplier', headerName: 'Proveedor', renderCell: supplier, width: 130 },
    { field: 'products', headerName: 'Productos', renderCell: products, width: 490 },
]

interface ClientsTableProps {
    CheckIn: Array<ICheckIn>;
    selectionModel: GridSelectionModel;
    setSelectionModel: (selectionModel: GridSelectionModel) => void;
    loading: boolean;
    setTree: any;
}

export const ClientsTable: FC<ClientsTableProps> = ({
    CheckIn,
    selectionModel,
    setSelectionModel,
    loading,
    setTree,
}) => {
    setTree2 = setTree;
    console.log(CheckIn);
    return (
        <Box
            sx={{ height: 400, width: '100%' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {!loading ? (
                <>
                    {CheckIn && (
                        <DataGrid
                            checkboxSelection
                            rows={CheckIn}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                            onSelectionModelChange={(newSelection) => {
                                setSelectionModel(newSelection);
                            }}
                            selectionModel={selectionModel}
                        />
                    )}
                </>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
}
