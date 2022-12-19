import {IProducts} from "../interfaces/InterfacesProducts";
import {useState} from "react";
import axiosClient from "../../../api/axiosClient";
import {useForm} from "react-hook-form";


export const useGetProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<{ number: number }>({
        defaultValues: {
            number: 10,
        },
    });

    const [clients, setClients] = useState<Array<IProducts>>();

    const [loading, setLoading] = useState(false);
    type GetProductsResponse = IProducts[];
    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const { data } = await axiosClient.get<GetProductsResponse>(
            `products`
        );
        setClients( data );
        setLoading(false);
    });


    return {
        register,
        onSubmit,
        setClients,
        loading,
        products: clients,
    };
}