import {IClients} from "../interfaces/InterfacesClients";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useForm} from "react-hook-form";

import {useState} from "react";
import axiosClient from "../../../api/axiosClient";

export const useCreateClient = (
    selectionModel: GridSelectionModel
) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm<IClients>({
        defaultValues: {
            name: '',
            lastname: '',
            cc: 0,
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const body = {
            ...getValues(),
        };
        const {data} = await axiosClient.post(
            `clients`, body,
        );
        console.log(data);
        setLoading(false);
    });

    return {
        register,
        onSubmit,
        loading,
    };

}