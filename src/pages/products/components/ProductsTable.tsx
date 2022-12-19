import {DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel} from "@mui/x-data-grid";
import {IProducts} from "../interfaces/InterfacesProducts";
import React, {FC, useRef, useState} from "react";
import {Box, Button, CircularProgress, ImageListItem} from "@mui/material";
import {useDeleteProduct} from "../hooks/useDeleteProduct";
import {EditProductFormModal} from "./EditProductFormModal";

let setTree2: any;
const opciones = (props: GridRenderCellParams) => {
    const buttonElement = useRef<HTMLButtonElement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const handleOnCloseModal = () => setIsModalOpen(false);
    const handleOnOpenModal = () => setIsModalOpen(true);
    const {
        register,
        onSubmitDelete,
        loading,
        setValue,
    } = useDeleteProduct();
    return (
        <strong>
            <Button
                component="button"
                ref={buttonElement}
                variant="contained"
                size="small"
                style={{ marginLeft: 16, color: 'white', backgroundColor: '' }}
                // Remove button from tab sequence when cell does not have focus
                onClick={handleOnOpenModal}
            >
                Editar
            </Button>
            <EditProductFormModal products={props.row as IProducts}
                                  isOpen={isModalOpen}
                                  handleClose={handleOnCloseModal}
                                  selectionModel={selectionModel}
                                  setTree={setTree2}
            />
            <Button
                component="button"
                ref={buttonElement}
                variant="contained"
                size="small"
                style={{ marginLeft: 16, color: 'white', backgroundColor: 'red' }}
                // Remove button from tab sequence when cell does not have focus
                onClick={() => {
                    setValue('id', props.row.id);
                    onSubmitDelete();
                }}
            >
                Delete
            </Button>
        </strong>
    );
}


export const imagesBarcode = (props: GridRenderCellParams) => {
    const { id, barcode, name } = props.row as IProducts;
    return (
        <ImageListItem key={id}>
            <img
                src={barcode}
                srcSet={barcode}
                alt={name}
                loading="lazy"
            />
        </ImageListItem>
    );
}


const columns: GridColDef[] = [
    { field: 'id', headerName: 'index', width: 80 },
    { field: 'name', headerName: 'Nombre', width: 120 },
    { field: 'description', headerName: 'Descripcion', width: 120 },
    { field: 'code', headerName: 'Code', width: 120 },
    { field: 'brand', headerName: 'Marca', width: 120 },
    { field: 'sale_code', headerName: 'Codigo de venta', width: 120 },
    { field: 'barcode', headerName: 'Codigo de barra', renderCell: imagesBarcode , width: 120 },
    { field: 'group', headerName: 'Grupo', width: 120 },
    {
        field: 'options',
        headerName: 'Opciones',
        renderCell: opciones,
        width: 200,
    }
]

interface ProductsTableProps {
    products: Array<IProducts>;
    selectionModel: GridSelectionModel;
    setSelectionModel: (selectionModel: GridSelectionModel) => void;
    loading: boolean;
    setTree: any;
}

export const ProductsTable: FC<ProductsTableProps> = ({
    products,
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
                    {(products?.length > 0) && (
                        <DataGrid
                            rows={products}
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
