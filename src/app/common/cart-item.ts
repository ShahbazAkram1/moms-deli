import { Product } from './product';
import { AdditionalItem } from './AdditionalItem'; // Import AdditionalItem if not already imported

export class CartItem {

    id: string;
    name: string;
    imageUrl: string;
    price: number;

    quantity: number;
    additionalItems: AdditionalItem[];
    selectedToppings: string[];
    selectedAdditionalItems: any;
    description: string;
    // selectedDrink: string;
    

    constructor(product: Product,  selectedToppings: string[], additionalItems: AdditionalItem[] = []) {
        this.id = product.id;
        this.name = product.name;
        this.imageUrl = product.imageUrl;
        this.price = product.price;

        this.quantity = 1;
        this.additionalItems = additionalItems;
        this.selectedToppings = selectedToppings;
        this.description = product.description;
        //this.selectedDrink = 'none';
    }
}
