import {GridSelectionModel} from "@mui/x-data-grid";
import {useForm} from "react-hook-form";
import {IClients} from "../interfaces/InterfacesClients";
import {useState} from "react";
import axiosClient from "../../../api/axiosClient";
import {useGetClients} from "./useGetClients";

export const useEditClient = (
    selectionModel: GridSelectionModel,
    client: IClients,
    setTree: any
) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
    } = useForm<IClients>({
        defaultValues: {
            id: client.id,
            name: client.name,
            lastname: client.lastname,
            cc: client.cc,
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmitUpdate = handleSubmit(async () => {

        setLoading(true);
        const body = {
            ...getValues(),
        };
        const {data} = await axiosClient.put(
            `clients/${getValues('id')}`, body,
        );
        console.log(data);
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
