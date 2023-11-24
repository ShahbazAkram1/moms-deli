export class AdditionalItem {
  id!: number;
  name!: string;
  price!: number;
  selected: boolean; // Use 'selected' instead of 'isSelected'
  // isSelected!: boolean;
  imageURL!:string;

  constructor(id: number, name: string, price: number,imageURL:string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.selected = false; // Initialize 'selected' to false by default
    // this.isSelected = false;
    this.imageURL = imageURL;
  }
}
