interface ICart {
    menu: string;
    quantity: number;
    notes: string;
}

interface IOrder {
    id:string;
    customer_name: string;
    table_number: number;
    cart: ICart[];
    status: 'PENDING' | 'COMPLATE' | 'PROCESSING';
    total: number;

}

export type {IOrder};