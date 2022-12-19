import {GridSelectionModel} from "@mui/x-data-grid";
import {useForm} from "react-hook-form";
import {ISuppliers} from "../interfaces/InterfacesSuppliers";
import {useState} from "react";
import axiosClient from "../../../api/axiosClient";

export const useEditSuppliers = (
    selectionModel: GridSelectionModel,
    suppliers: ISuppliers,
    setTree: any
) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
    } = useForm<ISuppliers>({
        defaultValues: {
            id: suppliers.id,
            name: suppliers.name,
            address: suppliers.address,
            phone: suppliers.phone,
            cc: suppliers.cc,
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmitUpdate = handleSubmit(async () => {

        setLoading(true);
        const body = {
            ...getValues(),
        };
        const {data} = await axiosClient.put(
            `suppliers/${getValues('id')}`, body,
        );
        // @ts-ignore
        setTree(prev => !prev);
        setLoading(false);
    });

    return {
        register,
        onSubmitUpdate,
        loading,
        setValue
    };
}
