import {useForm} from "react-hook-form";
import {useState} from "react";
import {IClients} from "../interfaces/InterfacesClients";
import axiosClient from "../../../api/axiosClient";

export const useDeleteClient = () => {
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
        console.log(getValues('id'))
        await axiosClient.delete(
            `clients/${getValues('id')}`
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