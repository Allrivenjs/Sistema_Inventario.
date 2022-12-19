

export interface ICheckIn {
    id: number;
    purchase_document_number: string;
    date_of_purchase_at: string;
    supplier_id: number;
    products: Array<IProductsC>;
}


export interface IProductsC{
    product_id: number;
    price_per_unit: number;
    count: number;
}


