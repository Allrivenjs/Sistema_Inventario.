import {IClients} from "../interfaces/InterfacesClients";
import {useState} from "react";
import axiosClient from "../../../api/axiosClient";
import {useForm} from "react-hook-form";


export const useGetClients = () => {
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

    const [clients, setClients] = useState<Array<IClients>>();

    const [loading, setLoading] = useState(false);
    type GetClientsResponse = IClients[];
    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const { data } = await axiosClient.get<GetClientsResponse>(
            `clients`
        );
        setClients( data );
        setLoading(false);
    });


    return {
        register,
        onSubmit,
        setClients,
        loading,
        clients,
    };
}