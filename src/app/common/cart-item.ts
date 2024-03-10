import { Product } from './product';
import { AdditionalItem } from './AdditionalItem'; // Import AdditionalItem if not already imported
import { ProductCategory } from './product-category';
import { BreadOption } from './BreadOption'; // Import BreadOption if not already imported

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
  category: ProductCategory;
  specificInstruction: string = '';
  breadOptions: BreadOption[]; // Add property for bread options

  constructor(
    product: Product,
    selectedToppings: string[],
    additionalItems: AdditionalItem[] = [],
    breadOptions: BreadOption[] = [], // Include breadOptions parameter in the constructor
    category: ProductCategory
  ) {
    this.id = product.id;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.price = product.price;

    this.quantity = 1;
    this.additionalItems = additionalItems;
    this.selectedToppings = selectedToppings;
    this.description = product.description;
    this.category = category; // Assign category parameter to the class property
    this.breadOptions = breadOptions; // Initialize bread options property
  }
}
