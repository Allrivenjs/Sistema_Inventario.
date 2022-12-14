import {useGetClients} from "../hooks/useGetClients";
import { GridSelectionModel } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {
    Divider,
    Typography,
    Container,
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    capitalize,
    SelectChangeEvent,
} from '@mui/material';
import {ClientsTable} from "./ClientsTable";
import {CreateClientFormModal} from "./CreateClientFormModal";
export const ClientList = () => {
    const  {
        register,
        onSubmit,
        setClients,
        loading,
        clients,
    } = useGetClients();
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [tree, setTree] = useState<boolean>(false);

    const handleOnCloseModal = () => setIsModalOpen(false);
    const handleOnOpenModal = () => setIsModalOpen(true);
    useEffect(() => {
        onSubmit();
    }, [tree]);

    return (
        <Box
            width='100%'
            height='100vh'
        >
            <Container>
                <Typography mb={2} mt={6} variant="h3">
                    Listado de clientes
                </Typography>


                <Divider />

                <ClientsTable
                    clients={ clients! }
                    setSelectionModel={ setSelectionModel }
                    selectionModel={ selectionModel }
                    loading={ loading }
                    setTree={ setTree }
                />

                <Box
                    my={ 2 }
                    display='flex'
                    gap={ 2 }
                >
                    <Button
                        variant='contained'
                        onClick={ handleOnOpenModal }
                    >
                        Crear nuevo cliente
                    </Button>
                </Box>

                <CreateClientFormModal
                    isOpen={ isModalOpen }
                    handleClose={ handleOnCloseModal }
                    selectionModel={ selectionModel }
                />

            </Container>
        </Box>
    );
}