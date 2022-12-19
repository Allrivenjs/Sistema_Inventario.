import {DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel} from "@mui/x-data-grid";
import React, {FC} from "react";
import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import {ICheckOut} from "../interfaces/InterfacesCheckOut";

let setTree2: any;

const products = (props: GridRenderCellParams) => {
    const { products } = props.row as ICheckOut;
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

const client = (props: GridRenderCellParams) => {
    const { client } = props.row;
    return (
        <Stack>
            <Box  sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    {client.name}
                </Typography>
            </Box>
        </Stack>
    );
}


const columns: GridColDef[] = [
    { field: 'id', headerName: '#', width: 60 },
    { field: 'sale_document_number', headerName: '# Venta', width: 210 },
    { field: 'sale_at', headerName: 'Fecha de venta', width: 190 },
    { field: 'client', headerName: 'Cliente', renderCell: client, width: 130 },
    { field: 'products', headerName: 'Productos', renderCell: products, width: 490 },
]

interface ClientsTableProps {
    CheckOut: Array<ICheckOut>;
    selectionModel: GridSelectionModel;
    setSelectionModel: (selectionModel: GridSelectionModel) => void;
    loading: boolean;
    setTree: any;
}

export const ClientsTable: FC<ClientsTableProps> = ({
    CheckOut,
    selectionModel,
    setSelectionModel,
    loading,
    setTree,
}) => {
    setTree2 = setTree;
    return (
        <Box
            sx={{ height: 400, width: '100%' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {!loading ? (
                <>
                    {CheckOut && (
                        <DataGrid
                            checkboxSelection
                            rows={CheckOut}
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
