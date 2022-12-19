import {IProducts} from "../interfaces/InterfacesProducts";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useForm} from "react-hook-form";

import {useState} from "react";
import axiosClient from "../../../api/axiosClient";

export const useCreateProduct = (
    selectionModel: GridSelectionModel,
    setTree: any,
    handleClose: any,
) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm<IProducts>({
        defaultValues: {
            name: '',
            price: 0,
            description: '',
            code: '',
            brand: '',
            sale_code: '',
            barcode: '',
            group: '',
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const body = {
            ...getValues(),
        };
        const {data} = await axiosClient.post(
            `products`, body,
        );
        // @ts-ignore
        setTree(prev => !prev);
        handleClose();
        setLoading(false);
    });

    return {
        register,
        onSubmit,
        loading,
    };

}