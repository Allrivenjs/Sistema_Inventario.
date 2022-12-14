import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Stack,
} from '@mui/material';
import {FC, useEffect} from "react";
import {props} from "./CreateClientFormModal";
import {useEditClient} from "../hooks/useEditClient";
import {IClients} from "../interfaces/InterfacesClients";
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
    client: IClients;
    setTree: any
}
export const EditClientFormModal: FC<editProps> = ({
    isOpen,
    handleClose,
    selectionModel,
    client,
    setTree
}) => {
    const { register, onSubmitUpdate, loading, setValue } = useEditClient(
        selectionModel,
        client,
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
                    Edit cliente
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
                        onClick={onSubmitUpdate}
                        variant="contained"
                    >
                        Editar cliente
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}