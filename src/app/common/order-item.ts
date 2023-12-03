import { AdditionalItem } from './AdditionalItem';
import { CartItem } from './cart-item';

export class OrderItem {
    imageUrl: string;
    price: number;
    quantity: number;
    productId: string;
    specialInstruction:string;
    additionalItem!:AdditionalItem;

    constructor(cartItem: CartItem) {
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.price = cartItem.price;
        this.productId = cartItem.id;
        this.specialInstruction = cartItem.specificInstruction;
        this.additionalItem = cartItem.selectedAdditionalItems;
    }
}
