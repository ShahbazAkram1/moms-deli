export class BreadOption {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  active: boolean;
  category: string; // Assuming you have a string representation of the category
  products: any[]; // You can adjust the type of products as needed
  selected: boolean;

  constructor(
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    active: boolean,
    category: string,
    products: any[],
    selected: boolean // Add selected as a parameter
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.active = active;
    this.category = category;
    this.products = products;
    this.selected = selected; // Initialize the selected property
  }
}
