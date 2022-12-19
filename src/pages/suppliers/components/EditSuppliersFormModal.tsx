import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Stack,
} from '@mui/material';
import {FC, useEffect} from "react";
import {props} from "./CreateSuppliersFormModal";
import {useEditSuppliers} from "../hooks/useEditSuppliers";
import {ISuppliers} from "../interfaces/InterfacesSuppliers";
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
    suppliers: ISuppliers;
    setTree: any;
}
export const EditSuppliersFormModal: FC<editProps> = ({
    isOpen,
    handleClose,
    selectionModel,
    suppliers,
    setTree
}) => {
    const { register, onSubmitUpdate, loading, setValue } = useEditSuppliers(
        selectionModel,
        suppliers,
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
                    Edit suppliers
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        multiline
                        label="Nombre"
                        {...register('name')}
                        InputLabelProps={{ shrink: true, required: true }}
                    />
                    <TextField label="Cedula" {...register('cc')} InputLabelProps={{ shrink: true, required: true }}/>
                    <TextField label="direccion" {...register('address')} InputLabelProps={{ shrink: true, required: true }}/>
                    <TextField label="celular" {...register('phone')} InputLabelProps={{ shrink: true, required: true }}/>
                    <Button
                        onClick={onSubmitUpdate}
                        variant="contained"
                    >
                        Editar suppliers
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}