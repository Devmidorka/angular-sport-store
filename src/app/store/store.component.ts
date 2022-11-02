import {Component} from "@angular/core";
import {ProductRepository} from "../model/product.repository";
import {Product} from "../model/product.model";
import {Cart} from "../model/cart.model";
import {Router} from "@angular/router";

@Component({
  selector: "store",
  moduleId: module.id,
  templateUrl: "store.component.html"
})
export class StoreComponent{
  constructor(private repository: ProductRepository, private cart: Cart, private router: Router) {}
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

  addProductToCart(product: Product){
    this.cart.addLine(product)
    this.router.navigateByUrl('/cart')
  }
}
