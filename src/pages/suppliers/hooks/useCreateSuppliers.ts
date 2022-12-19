import {ISuppliers} from "../interfaces/InterfacesSuppliers";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useForm} from "react-hook-form";

import {useState} from "react";
import axiosClient from "../../../api/axiosClient";

export const useCreateSuppliers = (
    selectionModel: GridSelectionModel,
    setTree: any,
    handleClose: any,
) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm<ISuppliers>({
        defaultValues: {
            name: '',
            address: '',
            phone: '',
            cc: '',
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const body = {
            ...getValues(),
        };
        console.log(body);
        const {data} = await axiosClient.post(
            `suppliers`, body,
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