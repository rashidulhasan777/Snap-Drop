import { Injectable } from '@angular/core';
import { IdbServiceService } from '../idbService/idb-service.service';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: boolean = false;
  private loadingMsg = '';

  private blockNavbar = false;

  private itemsInCart = 0;
  constructor(private idbService: IdbServiceService) {}

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
  setLoadingMsg(loadingMsg: string) {
    this.loadingMsg = loadingMsg;
  }

  getLoadingMsg(): string {
    return this.loadingMsg;
  }

  setBlockNavbar(block: boolean) {
    this.blockNavbar = block;
  }
  getBlockNavbar() {
    return this.blockNavbar;
  }

  getItemsInCart() {
    return this.itemsInCart;
  }

  async setItemsInCart() {
    try {
      const cart = await this.idbService.getAllForCart();
      this.itemsInCart =
        cart.galleryPictures.length + cart.passportPictures.length;
    } catch (error) {
      console.log(error);
      this.itemsInCart = 0;
    }
  }
}
