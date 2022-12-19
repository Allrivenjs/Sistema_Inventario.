import {useGetProduct} from "../hooks/useGetProduct";
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
import {ProductsTable} from "./ProductsTable";
import {CreateProductFormModal} from "./CreateProductFormModal";
export const ProductList = () => {
    const  {
        register,
        onSubmit,
        setClients,
        loading,
        products,
    } = useGetProduct();
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
                    Listado de productos
                </Typography>


                <Divider />

                <ProductsTable
                    products={ products! }
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
                        Crear nuevo producto
                    </Button>
                </Box>

                <CreateProductFormModal
                    isOpen={ isModalOpen }
                    handleClose={ handleOnCloseModal }
                    selectionModel={ selectionModel }
                    setTree={ setTree }
                />

            </Container>
        </Box>
    );
}