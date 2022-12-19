import {useForm} from "react-hook-form";
import {useState} from "react";
import {IProducts} from "../interfaces/InterfacesProducts";
import axiosClient from "../../../api/axiosClient";

export const useDeleteProduct = () => {
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
            `product/${getValues('id')}`
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