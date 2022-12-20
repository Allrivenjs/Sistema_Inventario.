import {ICheckIn} from "../interfaces/InterfacesCheckIn";
import {GridSelectionModel} from "@mui/x-data-grid";
import {useForm} from "react-hook-form";

import {useState} from "react";
import axiosClient from "../../../api/axiosClient";

export const useCreateCheckIn = (
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
    } = useForm<ICheckIn>({
        defaultValues: {
            id: 0,
            purchase_document_number: "",
            date_of_purchase_at: "",
            supplier_id: 0,
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
            `check-in`, body,
        );
        console.log(data);
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