import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Stack, ImageListItemBar, ImageListItem,
} from '@mui/material';
import React, {FC, useEffect} from "react";
import {props} from "./CreateProductFormModal";
import {useEditProduct} from "../hooks/useEditProduct";
import {IProducts} from "../interfaces/InterfacesProducts";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface editProps extends props {
    products: IProducts;
    setTree: any;
}
export const EditProductFormModal: FC<editProps> = ({
    isOpen,
    handleClose,
    selectionModel,
    products,
    setTree
}) => {
    const { register, onSubmitUpdate, loading, setValue, getValues } = useEditProduct(
        selectionModel,
        products,
        setTree
    );
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" mb={4}>
                    Edit producto
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        multiline
                        label="Nombre del catalogo"
                        {...register('name')}
                        InputLabelProps={{ shrink: true, required: true }}
                    />
                    <TextField label="Descripcion"
                               multiline
                               {...register('description')}  InputLabelProps={{ shrink: true, required: true }}/>
                    <TextField label="Code" disabled {...register('code')} />
                    <TextField label="Marca" {...register('brand')} InputLabelProps={{ shrink: true, required: true }} />
                    <TextField label="Código de venta" disabled {...register('sale_code')} />
                    <Box>
                        <Typography variant="body1" component="h2" mb={1}>Codigo de barra</Typography>
                        <ImageListItem key={getValues('id')}>
                            <img
                                {...register('barcode')}
                                src={getValues('barcode')}
                                srcSet={getValues('barcode')}
                                alt={getValues('name')}
                                loading="lazy"
                            />
                        </ImageListItem>
                    </Box>
                    <TextField label="Grupo" {...register('group')} InputLabelProps={{ shrink: true, required: true }}/>
                    <Button
                        onClick={onSubmitUpdate}
                        variant="contained"
                    >
                        Editar producto
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}