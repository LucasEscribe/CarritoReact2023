export interface Product {
    handleRemoveProductFromCart(price: number): unknown;
    handleAddProductToCart(price: number): unknown;
    id:number;
    title:string;
    price:number;
    description:string;
    category:{id:number, name:string, image:string};
    images:string;
}