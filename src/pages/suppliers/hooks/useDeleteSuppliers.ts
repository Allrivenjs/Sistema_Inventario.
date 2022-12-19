import {useForm} from "react-hook-form";
import {useState} from "react";
import {ISuppliers} from "../interfaces/InterfacesSuppliers";
import axiosClient from "../../../api/axiosClient";

export const useDeleteSuppliers = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
    } = useForm<{ id: number }>({
        defaultValues: {
            id: 0,
        },
    });

    const [loading, setLoading] = useState(false);
    const onSubmitDelete = handleSubmit(async () => {
        setLoading(true);
        await axiosClient.delete(
            `suppliers/${getValues('id')}`
        );
        setLoading(false);
    });

    return {
        register,
        onSubmitDelete,
        loading,
        setValue,
    };
}