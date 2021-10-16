import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { SettingsService } from './service/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('stickyMenu') menuElement!: ElementRef;

  public title = 'deutsch';
  public sticky: boolean;
  public menuPosition: any;

  constructor(
    private settingsService: SettingsService
  ) {
    this.sticky = false;
  }

  ngAfterViewInit() {
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
    this.settingsService.init$();
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

}
