import {IProductsC} from "../../CheckIn/interfaces/InterfacesCheckIn";


export interface ICheckOut {
    id: number;
    sale_document_number: string;
    sale_at: string;
    client_id: number;
    products: Array<IProductsC>;
}


