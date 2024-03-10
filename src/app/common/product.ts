import { AdditionalItem } from "./AdditionalItem";
import { ProductCategory } from "./product-category";

export class Product {
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  imageUrl!: string;
  active!: boolean;
  unitsInStock!: number;
  additionalItems: AdditionalItem[];
  categoryId!:number;
  selectedToppings?: string[];
  showAdditionalItems: boolean; // Add this property to control the visibility of additional items
  category!: ProductCategory;
  _links:any;
  constructor() {
    this.additionalItems = [];
    this.showAdditionalItems = false; // Initialize showAdditionalItems as false by default
  }
}

