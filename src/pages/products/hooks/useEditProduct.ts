import {GridSelectionModel} from "@mui/x-data-grid";
import {useForm} from "react-hook-form";
import {IProducts} from "../interfaces/InterfacesProducts";
import {useState} from "react";
import axiosClient from "../../../api/axiosClient";

export const useEditProduct = (
    selectionModel: GridSelectionModel,
    products: IProducts,
    setTree: any
) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
        setValue,
    } = useForm<IProducts>({
        defaultValues: {
            id: products.id,
            name: products.name,
            description: products.description,
            code: products.code,
            brand: products.brand,
            sale_code: products.sale_code,
            barcode: products.barcode,
            group: products.group,
        }
    });
    const [loading, setLoading] = useState(false);

    const onSubmitUpdate = handleSubmit(async () => {

        setLoading(true);
        const body = {
            ...getValues(),
        };
        const {data} = await axiosClient.put(
            `products/${getValues('id')}`, body,
        );
        // @ts-ignore
        setTree(prev => !prev);
        setLoading(false);
    });

    return {
        register,
        onSubmitUpdate,
        loading,
        setValue,
        getValues,
    };
}
