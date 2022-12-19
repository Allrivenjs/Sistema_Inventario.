import {useGetSuppliers} from "../hooks/useGetSuppliers";
import { GridSelectionModel } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {
    Divider,
    Typography,
    Container,
    Box,
    Button,
} from '@mui/material';
import {SuppliersTable} from "./SuppliersTable";
import {CreateSuppliersFormModal} from "./CreateSuppliersFormModal";
export const SuppliersList = () => {
    const  {
        register,
        onSubmit,
        setClients,
        loading,
        suppliers,
    } = useGetSuppliers();
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
            height='100%'
        >
            <Container>
                <Typography mb={2} mt={6} variant="h3">
                    Listado de proveedores
                </Typography>


                <Divider />

                <SuppliersTable
                    clients={ suppliers! }
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
                        Crear nuevo suppliers
                    </Button>
                </Box>

                <CreateSuppliersFormModal
                    isOpen={ isModalOpen }
                    handleClose={ handleOnCloseModal }
                    selectionModel={ selectionModel }
                    setTree={ setTree }
                />

            </Container>
        </Box>
    );
}