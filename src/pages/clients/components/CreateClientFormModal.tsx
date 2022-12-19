import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Stack,
} from '@mui/material';
import {FC} from "react";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useCreateClient} from "../hooks/useCreateClient";

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

export const CreateClientFormModal: FC<props> = ({
    isOpen,
    handleClose,
    selectionModel,
    setTree,
                                                 }) => {
    const { register, onSubmit, loading } = useCreateClient(
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
                    Crear un nuevo cliente
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        multiline
                        label="Nombre"
                        {...register('name')}
                        InputLabelProps={{ shrink: true, required: true }}
                    />
                    <TextField label="Apellido" {...register('lastname')} InputLabelProps={{ shrink: true, required: true }} />
                    <TextField label="Cedula" {...register('cc')} InputLabelProps={{ shrink: true, required: true }} />
                    <Button
                        onClick={onSubmit}
                        variant="contained"
                    >
                        Crear nuevo cliente
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}