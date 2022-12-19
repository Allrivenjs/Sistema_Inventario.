import {ISuppliers} from "../interfaces/InterfacesSuppliers";
import {useState} from "react";
import axiosClient from "../../../api/axiosClient";
import {useForm} from "react-hook-form";


export const useGetSuppliers = () => {
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

    const [clients, setClients] = useState<Array<ISuppliers>>();

    const [loading, setLoading] = useState(false);
    type GetSuppliersResponse = ISuppliers[];
    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const { data } = await axiosClient.get<GetSuppliersResponse>(
            `suppliers`
        );
        setClients( data );
        setLoading(false);
    });


    return {
        register,
        onSubmit,
        setClients,
        loading,
        suppliers: clients,
    };
}