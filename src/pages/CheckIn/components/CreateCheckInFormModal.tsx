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
import {Theme, useTheme} from '@mui/material/styles';
import React, {FC, useEffect, useState} from "react";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useCreateCheckIn} from "../hooks/useCreateCheckIn";
import {IProducts} from "../../products/interfaces/InterfacesProducts";
import axiosClient from "../../../api/axiosClient";
import {IProductsC} from "../interfaces/InterfacesCheckIn";
import {ISuppliers} from "../../suppliers/interfaces/InterfacesSuppliers";


export const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
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

export function getStyles(index: any, products: any, theme: Theme) {
    return {
        fontWeight:
            products.indexOf(index) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const CreateCheckInFormModal: FC<props> = ({
    isOpen,
    handleClose,
    selectionModel,
    setTree,
                                                 }) => {
    const { register, onSubmit, loading, setValue } = useCreateCheckIn(
        selectionModel,
        setTree,
        handleClose,
    );

    const theme = useTheme();
    const [products, setProducts] = useState<IProducts[]>([]);
    const [selectProducts, setSelectProducts] = useState<IProducts[]>([]);
    const [suppliers, setSuppliers] = useState<ISuppliers[]>([]);
    const [selectSuppliers, setSelectSuppliers] = useState<ISuppliers>();
    const [sendProducts, setSendProducts] = useState<IProductsC[]>([]);
    const getProduct = async () => {
        type GetProductsResponse = IProducts[];
        const { data } = await axiosClient.get<GetProductsResponse>('products');
        return data;
    };

    const getSuppliers = async () => {
        type GetSuppliersResponse = ISuppliers[];
        const { data } = await axiosClient.get<GetSuppliersResponse>('suppliers');
        return data;
    };

    useEffect(() => {
        getProduct().then((res) => {
            setProducts(res);
        });
        getSuppliers().then((res) => {
            setSuppliers(res);
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

    const handleChangeSuppliers = (event: SelectChangeEvent) => {
        const {
            target: { value },
        } = event;
        setSelectSuppliers(suppliers.find((item) => item.id === Number(value)) as ISuppliers);
    }

    useEffect(() => {
        setUpProducts();
    }, [selectProducts]);

    useEffect(() => {
        setValue('products', sendProducts);
        if (selectSuppliers) {
            setValue('supplier_id', selectSuppliers.id);
        }
    }, [sendProducts, selectSuppliers]);
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
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2" mb={4}>
                    Crear un nueva entrada
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="Fecha de entrada"
                        InputLabelProps={{ shrink: true, required: true }}
                        type="date"
                        {...register('date_of_purchase_at')}
                    />
                    <FormControl sx={{ m: 1, width: '100%' }}>
                        <InputLabel id="demo-multiple-chip-label2">Proveedor</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label2"
                            id="demo-multiple-chip"
                            // @ts-ignore
                            value={selectSuppliers}
                            onChange={handleChangeSuppliers}
                            input={<OutlinedInput id="select-multiple-chip" label="Proveedoras" />}
                            renderValue={(selected) => {{
                                return (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        <Chip key={selectSuppliers?.id} label={selectSuppliers?.name}/>
                                    </Box>
                                )
                            }}}
                            MenuProps={MenuProps}
                        >
                            {suppliers && (suppliers.map((s) => (
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