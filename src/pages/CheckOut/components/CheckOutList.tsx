import {useGetCheckOut} from "../hooks/useGetCheckOut";
import { GridSelectionModel } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {
    Divider,
    Typography,
    Container,
    Box,
    Button,
} from '@mui/material';
import {ClientsTable} from "./CheckOutTable";
import {CreateCheckOutFormModal} from "./CreateCheckOutFormModal";
export const CheckOutList = () => {
    const  {
        onSubmit,
        loading,
        CheckOut
    } = useGetCheckOut();
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
                    Listado de salida de productos
                </Typography>


                <Divider />

                <ClientsTable
                    CheckOut={ CheckOut! }
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
                        Crear venta
                    </Button>
                </Box>

                <CreateCheckOutFormModal
                    isOpen={ isModalOpen }
                    handleClose={ handleOnCloseModal }
                    selectionModel={ selectionModel }
                    setTree={ setTree }
                />

            </Container>
        </Box>
    );
}