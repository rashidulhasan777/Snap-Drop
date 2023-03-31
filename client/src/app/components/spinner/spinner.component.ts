import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {
  constructor(private loading: LoaderService) {}
  get msg() {
    return this.loading.getLoadingMsg();
  }
}
