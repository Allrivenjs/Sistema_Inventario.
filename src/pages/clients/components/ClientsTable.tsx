import {DataGrid, GridColDef, GridRenderCellParams, GridSelectionModel} from "@mui/x-data-grid";
import {IClients} from "../interfaces/InterfacesClients";
import React, {FC, useRef, useState} from "react";
import {Box, Button, CircularProgress} from "@mui/material";
import {useDeleteClient} from "../hooks/useDeleteClient";
import {EditClientFormModal} from "./EditClientFormModal";

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
    } = useDeleteClient();
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
            <EditClientFormModal client={props.row as IClients}
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
    { field: 'name', headerName: 'Name', width: 240 },
    { field: 'lastname', headerName: 'Lastname', width: 240 },
    { field: 'cc', headerName: 'CC', width: 240 },
    {
        field: 'options',
        headerName: 'Options',
        renderCell: opciones,
        width: 230,
    }
]

interface ClientsTableProps {
    clients: Array<IClients>;
    selectionModel: GridSelectionModel;
    setSelectionModel: (selectionModel: GridSelectionModel) => void;
    loading: boolean;
    setTree: any;
}

export const ClientsTable: FC<ClientsTableProps> = ({
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
                            checkboxSelection
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
