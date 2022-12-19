import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Modal,
    TextField,
    Typography,
    Stack,
} from '@mui/material';
import { Memory } from '@mui/icons-material';
import {FC} from "react";
import {IProducts} from "../interfaces/InterfacesProducts";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useCreateProduct} from "../hooks/useCreateProduct";

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
export interface props {
    isOpen: boolean;
    handleClose: () => void;
    selectionModel: GridSelectionModel;
    setTree: any;

}

export const CreateProductFormModal: FC<props> = ({
    isOpen,
    handleClose,
    selectionModel,
    setTree,
                                                 }) => {
    const { register, onSubmit, loading } = useCreateProduct(
        selectionModel,
        setTree,
        handleClose,
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
                    Crear un nuevo producto
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        multiline
                        label="Nombre"
                        {...register('name')}
                        InputLabelProps={{ shrink: true, required: true }}
                    />
                    <TextField label="Descripcion" multiline {...register('description')} InputLabelProps={{ shrink: true, required: true }} />
                    {/*<TextField label="Code" {...register('code')} />*/}
                    <TextField label="Marca" {...register('brand')} InputLabelProps={{ shrink: true, required: true }} />
                    {/*<TextField label="Código de venta" {...register('sale_code')} />*/}
                    {/*<TextField label="Barcode" {...register('barcode')} />*/}
                    <TextField label="Grupo" {...register('group')} InputLabelProps={{ shrink: true, required: true }} />
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        Crear nuevo producto
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}