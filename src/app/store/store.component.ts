import {Component} from "@angular/core";
import {ProductRepository} from "../model/product.repository";
import {Product} from "../model/product.model";

@Component({
  selector: "store",
  moduleId: module.id,
  templateUrl: "store.component.html"
})
export class StoreComponent{
  constructor(private repository: ProductRepository) {}
  public selectedCategory: string | null = null;
  public productsPerPage = 4;
  public selectedPage = 1;

  get products(): Product[]{
      let pageIndex = (this.selectedPage - 1) * this.productsPerPage
      return this.repository.getProducts(this.selectedCategory).slice(pageIndex, pageIndex + this.productsPerPage)
  }

  get categories():(string|undefined)[]{
    return this.repository.getCategories()
  }

  changeCategory(newCategory?: string){
    if(!newCategory) {
      this.selectedCategory = null;
      return;
    }
    this.selectedCategory = newCategory
  }

  changePage(newPage:number){
    this.selectedPage = newPage
  }

  changePageSize(newSize:number){
    this.productsPerPage= newSize
    this.changePage(1)
  }

  get pageCount():number{
    return Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)
  }

  // get pageNumbers():number[]{
  //   return Array(
  //     Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage)
  //   ).fill(0).map((x, i) => i + 1)
  // }

}
