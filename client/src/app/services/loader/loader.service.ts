import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loading: boolean = false;
  private loadingMsg = '';

  private blockNavbar = false;
  constructor() {}

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
}
