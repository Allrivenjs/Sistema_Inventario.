import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel, List, ListItem, ListItemButton, ListItemText,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import React, {FC, useEffect, useState} from "react";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useCreateCheckOut} from "../hooks/useCreateCheckOut";
import {IProducts} from "../../products/interfaces/InterfacesProducts";
import axiosClient from "../../../api/axiosClient";
import {IProductsC} from "../../CheckIn/interfaces/InterfacesCheckIn";
import {getStyles, style} from "../../CheckIn/components/CreateCheckInFormModal";
import {IClients} from "../../clients/interfaces/InterfacesClients";


export interface props {
    isOpen: boolean;
    handleClose: () => void;
    selectionModel: GridSelectionModel;
    setTree: any;

}

const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export const CreateCheckOutFormModal: FC<props> = ({
    isOpen,
    handleClose,
    selectionModel,
    setTree,
                                                 }) => {
    const { register, onSubmit, loading, setValue } = useCreateCheckOut(
        selectionModel,
        setTree,
        handleClose,
    );

    const theme = useTheme();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [selectProducts, setSelectProducts] = useState<IProducts[]>([]);
    const [sendProducts, setSendProducts] = useState<IProductsC[]>([]);
    const [clients, setClients] = useState<IClients[]>([]);
    const [selectClients, setSelectClientes] = useState<IClients>();
    const getProduct = async () => {
        type GetProductsResponse = IProducts[];
        const { data } = await axiosClient.get<GetProductsResponse>('products');
        return data;
    };
    const getClients = async () => {
        type GetClientsResponse = IClients[];
        const { data } = await axiosClient.get<GetClientsResponse>('clients');
        return data;
    };
    useEffect(() => {
        getProduct().then((res) => {
            setProducts(res);
        });
        getClients().then((res) => {
            setClients(res);
        });
    }, [])

    const handleChange = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        const valueT = value.length > 1 ? value[value.length - 1]: value[0];

        const isExist = selectProducts.find((item) => item.id === Number(valueT));
        if (isExist !== undefined) {
            handleDelete(isExist.id);
            return;
        }

        const selected = products.filter((item) => item.id === Number(valueT)) as IProducts[];
        setSelectProducts((prevState) => {
            return [...[...new Set([...prevState, ...selected])] as IProducts[]]
        });
    };

    useEffect(() => {
        setUpProducts();
    }, [selectProducts]);

    useEffect(() => {
        setValue('products', sendProducts);
        if (selectClients) {
            setValue('client_id', selectClients.id);
        }
    }, [sendProducts, selectClients]);
    const setUpProducts = () => {
        const products: IProductsC[] = selectProducts.map((item) => {
            const lastProduct = sendProducts.find((i) => i.product_id === Number(item.id));
            if (lastProduct !== undefined) {
                return lastProduct;
            }
            return {
                product_id: item.id,
                count: 1,
                price_per_unit: 1,
            }
        } )
        setSendProducts(products);
    }
    const handleDelete = (id: number) => {
        setSelectProducts((prevState) => {
            return prevState.filter((item) => item.id !== id);
        });
    };

    const handleChangesItem = (e: any, id: number, type: string) => {
        const value = e.target.value;
        const product = products.find((item) => item.id === id);
        if (product === undefined) {
            return;
        }
        const set = type==='count' ?
            {count: value} :
            {price_per_unit: value};
        setSendProducts((prevState) => {
            return prevState.map((item) => {
                if (item.product_id === id) {
                    return {
                        ...item,
                        ...set
                    }
                }
                return item;
            });
        });
    }

    const handleChangeClients = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setSelectClientes(clients.find((item) => item.id === Number(value)) as IClients);
    }
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" mb={4}>
                    Crear un venta
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Fecha de entrada"
                        InputLabelProps={{ shrink: true, required: true }}
                        type="date"
                        {...register('sale_at')}
                    />

                    <FormControl sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-multiple-chip-label2">Clientes</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label2"
                            id="demo-multiple-chip"
                            // @ts-ignore
                            value={selectClients}
                            onChange={handleChangeClients}
                            input={<OutlinedInput id="select-multiple-chip" label="Proveedoras" />}
                            renderValue={(selected) => {{
                                return (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        <Chip key={selectClients?.id} label={selectClients?.name}/>
                                    </Box>
                                )
                            }}}
                            MenuProps={MenuProps}
                        >
                            {clients && (clients.map((s) => (
                                <MenuItem
                                    key={s.id}
                                    value={s.id}
                                    style={getStyles(s, products, theme)}
                                >
                                    {s.name}
                                </MenuItem>
                            )))}
                        </Select>
                    </FormControl>


                    <Typography id="modal-modal-title" variant="h6">
                        Productos a agregar
                    </Typography>
                    <FormControl sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-multiple-chip-label">Productos</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            // @ts-ignore
                            value={selectProducts}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Productos" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selectProducts.map((product: IProducts) => (
                                        <Chip key={product.id} label={product.name}/>
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {products && (products.map((product) => (
                                <MenuItem
                                    key={product.id}
                                    value={product.id}
                                    style={getStyles(product, products, theme)}
                                >
                                    {product.name}
                                </MenuItem>
                            )))}
                        </Select>
                    </FormControl>
                    <Box sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
                        <ListItem
                            secondaryAction={
                                <Box display={'flex'} flexDirection={'row'} sx={{ gap: 1.5 }}>
                                    <InputLabel id="demo-multiple-chip-label">Precio por unidad</InputLabel>
                                    <InputLabel id="demo-multiple-chip-label">Cantidad</InputLabel>
                                </Box>
                            }
                        >
                            <InputLabel id={'checkbox-list-label'} >Nombre del producto </InputLabel>
                        </ListItem>
                    </Box>
                    <List dense sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
                        {(selectProducts.map((value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem
                                    key={value.id}
                                    secondaryAction={
                                            <Box display={'flex'} flexDirection={'row'} sx={{ gap: 1.5 }}>
                                                <OutlinedInput
                                                    placeholder={'Valor por unidad'}
                                                    id="outlined-adornment-price"
                                                    aria-describedby="outlined-weight-helper-text"
                                                    sx={{ width: 130, height: 30, alignItems: 'center', justifyItems: 'center' }}
                                                    value={sendProducts.find((item) => item.product_id === value.id)?.price_per_unit}
                                                    onChange={(e)=>{
                                                        handleChangesItem(e, value.id, 'price');
                                                    }}
                                                    inputProps={{
                                                        'aria-label': 'price',
                                                    }}
                                                />
                                                <OutlinedInput
                                                    placeholder={'cantidad'}
                                                    id="outlined-adornment-count"
                                                    aria-describedby="outlined-weight-helper-text"
                                                    sx={{ width: 60, height: 30, alignItems: 'center', justifyItems: 'center' }}
                                                    value={sendProducts.find((item) => item.product_id === value.id)?.count}
                                                    onChange={(e)=>{
                                                        handleChangesItem(e, value.id, 'count');
                                                    }}
                                                    inputProps={{
                                                        'aria-label': 'count',
                                                    }}
                                                />
                                            </Box>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton>
                                        <ListItemText id={labelId} primary={`${value.name}`} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        }))}
                    </List>
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