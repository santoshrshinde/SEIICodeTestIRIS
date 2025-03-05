export interface Product {
    product_id: number;
    name: string;
    description: string;
    imagepath: string;
    price: number;
    stock_quantity: number;
}

export interface ProductResponse {
    products: Array<Product>;
    totalRecords: number
}

export interface Options {
    value: string;
    viewValue: string;
}

export interface Filter {
    start: number;
    limit: number; 
    filter: string; 
    sortorder: string; 
    sortby: string;
}

export interface CartItems {
    product_id: number;
    name: string;
    description: string;
    imagepath: string;
    price: number;
    stock_quantity: number;
    quantity: number;
}
