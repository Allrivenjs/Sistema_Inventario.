import {DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel} from "@mui/x-data-grid";
import {ISuppliers} from "../interfaces/InterfacesSuppliers";
import React, {FC, useRef, useState} from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import {useDeleteSuppliers} from "../hooks/useDeleteSuppliers";
import {EditSuppliersFormModal} from "./EditSuppliersFormModal";

let setTree2: any;
const opciones = (props: GridRenderCellParams) => {
    // const { hasFocus, value,  } = props;
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
    } = useDeleteSuppliers();
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
            <EditSuppliersFormModal suppliers={props.row as ISuppliers}
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


const columns: GridColDef[] = [
    { field: 'id', headerName: 'index', width: 130 },
    { field: 'cc', headerName: 'Cedula', width: 180 },
    { field: 'name', headerName: 'Nombre', width: 180 },
    { field: 'address', headerName: 'Direccion', width: 180 },
    { field: 'phone', headerName: 'Celular', width: 180 },
    {
        field: 'options',
        headerName: 'Opciones',
        renderCell: opciones,
        width: 230,
    }
]

interface ClientsTableProps {
    clients: Array<ISuppliers>;
    selectionModel: GridSelectionModel;
    setSelectionModel: (selectionModel: GridSelectionModel) => void;
    loading: boolean;
    setTree: any;
}

export const SuppliersTable: FC<ClientsTableProps> = ({
    clients,
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
                    {clients && (
                        <DataGrid
                            rows={clients}
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
