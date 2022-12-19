import {useState} from "react";
import axiosClient from "../../../api/axiosClient";
import {useForm} from "react-hook-form";
import {ICheckOut} from "../interfaces/InterfacesCheckOut";


export const useGetCheckOut = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ number: number }>({
        defaultValues: {
            number: 10,
        },
    });

    const [clients, setClients] = useState<Array<ICheckOut>>();

    const [loading, setLoading] = useState(false);
    type GetCheckOutResponse = ICheckOut[];
    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const { data } = await axiosClient.get<GetCheckOutResponse>(
            `check-out`
        );
        setClients( data );
        setLoading(false);
    });


    return {
        register,
        onSubmit,
        setClients,
        loading,
        CheckOut: clients,
    };
}