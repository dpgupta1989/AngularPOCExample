import { Component } from '@angular/core';
import { FullscreenService } from '../fullscreen.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Item Adjustment Master';
  fullscreen$: Observable<boolean>;

  constructor(private fullscreenService: FullscreenService) {

  }

  ngOnInit() {
    this.fullscreen$ = this.fullscreenService.fullscreen$;
  }
}
