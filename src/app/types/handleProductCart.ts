export interface HandleProductCart {
    handleRemoveProductFromCart(price: number): unknown;
    handleAddProductToCart(price: number): unknown;
    subtotal: number;
    quantity: number;
}