import { CartItem } from './cart-item';

export class OrderItem {
    imageUrl: string;
    price: number;
    quantity: number;
    productId: string;
    name: string;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.price = cartItem.price;
        this.productId = cartItem.id;
        this.name=cartItem.name;
    }
}
