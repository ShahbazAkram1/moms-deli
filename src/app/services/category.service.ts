import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { 

  }

  public addCategory(category:ProductCategory):Observable<ProductCategory>{
    //return this.http.post<ProductCategory>('http://localhost:8080/api/categories',category);
    return this.http.post<ProductCategory>('https://api.momsdelionline.com//api/categories',category);
  }
  
  public editCategory(category:ProductCategory):Observable<ProductCategory>{
    console.log(category);  
    return this.http.put<ProductCategory>(`https://api.momsdelionline.com/api/categories/${category.id}`,category);
  }

  public deleteCategory(category:ProductCategory){
    return  this.http.delete(`https://api.momsdelionline.com//api/categories/${category.id}`);
  }

  

  public getAll():Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>('https://api.momsdelionline.com/api/categories');
  }

}
