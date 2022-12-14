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
import {IClients} from "../interfaces/InterfacesClients";
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
}

export const CreateClientFormModal: FC<props> = ({
    isOpen,
    handleClose,
    selectionModel,
                                                 }) => {
    const { register, onSubmit, loading } = useCreateClient(
        selectionModel
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
                        label="Nombre del catalogo"
                        {...register('name')}
                    />
                    <TextField label="lastname" {...register('lastname')} />
                    <TextField label="cc" {...register('cc')} />
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