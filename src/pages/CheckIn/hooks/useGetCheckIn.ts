import {useState} from "react";
import axiosClient from "../../../api/axiosClient";
import {useForm} from "react-hook-form";
import {ICheckIn} from "../interfaces/InterfacesCheckIn";


export const useGetCheckIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ number: number }>({
        defaultValues: {
            number: 10,
        },
    });

    const [clients, setClients] = useState<Array<ICheckIn>>();

    const [loading, setLoading] = useState(false);
    type GetCheckInResponse = ICheckIn[];
    const onSubmit = handleSubmit(async () => {
        setLoading(true);
        const { data } = await axiosClient.get<GetCheckInResponse>(
            `check-in`
        );
        setClients( data );
        setLoading(false);
    });


    return {
        register,
        onSubmit,
        setClients,
        loading,
        CheckIn: clients,
    };
}