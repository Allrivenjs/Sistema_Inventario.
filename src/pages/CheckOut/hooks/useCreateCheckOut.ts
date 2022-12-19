import {ICheckOut} from "../interfaces/InterfacesCheckOut";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useForm} from "react-hook-form";

import {useState} from "react";
import axiosClient from "../../../api/axiosClient";

export const useCreateCheckOut = (
    selectionModel: GridSelectionModel,
    setTree: any,
    handleClose: any,
) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue
    } = useForm<ICheckOut>({
        defaultValues: {
            id: 0,
            sale_document_number: "",
            sale_at: "",
            client_id: 0,
            products: [],
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const body = {
            ...getValues(),
        };
        const {data} = await axiosClient.post(
            `check-out`, body,
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
        setValue
    };

}